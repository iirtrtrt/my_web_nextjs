import React, { useState, useRef, useEffect } from "react";
import DropZone from "./drop_zone";
import Slider from "./slider";
import { useElementSize } from "usehooks-ts";
import { DEFAULT_OPTIONS } from "@/app/components";
import FeatureBtn from "./feature_btn";
import { useOnDraw } from "@/hooks/useOnDraw";

export default function ImageEditor() {
  const onDraw = (
    ctx: CanvasRenderingContext2D,
    point: { x: number; y: number },
    prevPoint: { x: number; y: number } | null
  ) => {
    drawLine(prevPoint, point, ctx, "#000000", 5);
  };

  const { setCanvasRef, onCanvasMouseDown } = useOnDraw(onDraw);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<{
    width: number;
    height: number;
  }>();
  const [canvasSize, setCanvasSize] = useState<{
    width: number;
    height: number;
  }>();
  const [drawingHistory, setDrawingHistory] = useState<
    { start: { x: number; y: number }; end: { x: number; y: number } }[]
  >([]);

  const drawLine = (
    start: { x: number; y: number } | null,
    end: { x: number; y: number },
    ctx: CanvasRenderingContext2D,
    color: string,
    width: number,
    addToHistory: boolean = true
  ) => {
    start = start ?? end;
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);
    ctx.fill();

    if (addToHistory) {
      setDrawingHistory([...drawingHistory, { start, end }]);
    }
  };

  const handleUndoClick = () => {
    const newDrawingHistory = drawingHistory.slice(0, -1);
    setDrawingHistory(newDrawingHistory);

    const canvas = document.querySelector("canvas");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (backgroundImage) {
          const image = new Image();
          image.onload = () => {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

            for (const { start, end } of newDrawingHistory) {
              drawLine(start, end, ctx, "#000000", 5, false);
            }
          };
          image.src = backgroundImage;
        } else {
          for (const { start, end } of newDrawingHistory) {
            drawLine(start, end, ctx, "#000000", 5, false);
          }
        }
      }
    }
  };

  const handleExportClick = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "canvas.png";
      link.href = dataUrl;

      if (backgroundImage) {
        const newCanvas = document.createElement("canvas");
        newCanvas.width = canvasSize!.width;
        newCanvas.height = canvasSize!.height;

        const newCtx = newCanvas.getContext("2d");
        const image = new Image();
        image.onload = () => {
          newCtx!.filter = getImageStyle().filter;
          newCtx?.drawImage(image, 0, 0, canvasSize!.width, canvasSize!.height);
          newCtx?.drawImage(
            canvas,
            0,
            0,
            canvasSize!.width,
            canvasSize!.height
          );
          link.href = newCanvas.toDataURL("image/png");
          link.click();
        };
        image.src = backgroundImage;
      } else {
        const newCanvas = document.createElement("canvas");
        newCanvas.width = canvas.width;
        newCanvas.height = canvas.height;

        const newCtx = newCanvas.getContext("2d");
        newCtx!.filter = getImageStyle().filter;
        newCtx?.drawImage(canvas, 0, 0, canvas.width, canvas.height);
        link.href = newCanvas.toDataURL("image/png");
        link.click();
      }
    }
  };

  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(0);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const selectedOption = options[selectedOptionIndex];

  const handleSliderChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setOptions((prevOptions) => {
      return prevOptions.map((option, index) => {
        if (index !== selectedOptionIndex) {
          return option;
        }
        return { ...option, value: parseInt(target.value) };
      });
    });
  };

  const getImageStyle = () => {
    const filters: string[] = options.map((option) => {
      return `${option.property}(${option.value}${option.unit})`;
    });

    return { filter: filters.join(" ") };
  };

  const [squareRef, { width }] = useElementSize();
  useEffect(() => {
    if (backgroundImage) {
      if (width >= imageSize!.width) {
        const ratio = width / imageSize!.width;
        setCanvasSize({
          width: imageSize!.width * ratio,
          height: imageSize!.height * ratio,
        });
      } else {
        const ratio = imageSize!.width / width;
        setCanvasSize({
          width: imageSize!.width / ratio,
          height: imageSize!.height / ratio,
        });
      }
    }
  }, [backgroundImage, width]);

  return (
    <div
      className={`flex flex-1 flex-col bg-stone-900 rounded-2xl text-white p-4`}
    >
      <div className={`flex flex-col lg:flex-row`}>
        <div ref={squareRef} className={`lg:w-[76%]`}>
          <DropZone
            setBackgroundImage={setBackgroundImage}
            setImageSize={setImageSize}
          />
          <canvas
            ref={setCanvasRef}
            width={backgroundImage ? canvasSize?.width : width}
            height={backgroundImage ? canvasSize?.height : width}
            onMouseDown={onCanvasMouseDown}
            style={{
              ...getImageStyle(),
              ...(backgroundImage
                ? { backgroundImage: `url(${backgroundImage})` }
                : {}),
            }}
            className={`bg-no-repeat bg-contain bg-center border-black border-2 w-[${
              backgroundImage ? canvasSize?.width : width
            }px] h-[${
              backgroundImage ? imageSize!.height ?? width : width
            }px] max-w-full my-2`}
          />
          <Slider
            min={selectedOption.range.min}
            max={selectedOption.range.max}
            value={selectedOption.value}
            handleChange={handleSliderChange}
          />
        </div>
        <div className={`flex lg:flex-1 flex-col lg:ml-4`}>
          <div className="flex lg:flex-col lg:mb-auto flex-wrap">
            {options.map((option, index) => {
              return (
                <FeatureBtn
                  key={index}
                  name={option.name}
                  active={index === selectedOptionIndex}
                  handleClick={() => setSelectedOptionIndex(index)}
                />
              );
            })}
          </div>
          <div className="flex lg:flex-col flex-row-reverse">
            <FeatureBtn
              name={"Undo"}
              active={false}
              handleClick={() => handleUndoClick()}
              isUndoBtn={true}
            />
            <FeatureBtn
              name={"Export"}
              active={false}
              handleClick={() => handleExportClick()}
              isExportBtn={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
