import { useOnDraw } from "./hooks";
import { useState } from "react";
import Dropzone from "react-dropzone";

export function Canvas({ width, height }: { width: number; height: number }) {
  const { setCanvasRef, onCanvasMouseDown } = useOnDraw(onDraw);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [drawingHistory, setDrawingHistory] = useState<
    { start: { x: number; y: number }; end: { x: number; y: number } }[]
  >([]);

  function onDraw(
    ctx: CanvasRenderingContext2D,
    point: { x: number; y: number },
    prevPoint: { x: number; y: number } | null
  ) {
    drawLine(prevPoint, point, ctx, "#000000", 5);
  }

  function drawLine(
    start: { x: number; y: number } | null,
    end: { x: number; y: number },
    ctx: CanvasRenderingContext2D,
    color: string,
    width: number,
    addToHistory: boolean = true // add path to history by default
  ) {
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
  }

  function handleUndoClick() {
    // remove the last path from the drawing history
    const newDrawingHistory = drawingHistory.slice(0, -1);
    setDrawingHistory(newDrawingHistory);

    // redraw the canvas
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // draw the background image, if any
        if (backgroundImage) {
          const image = new Image();
          image.onload = () => {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

            // redraw all the paths in the drawing history
            for (const { start, end } of newDrawingHistory) {
              drawLine(start, end, ctx, "#000000", 5, false); // do not add path to history
            }
          };
          image.src = backgroundImage;
        } else {
          // redraw all the paths in the drawing history
          for (const { start, end } of newDrawingHistory) {
            drawLine(start, end, ctx, "#000000", 5, false); // do not add path to history
          }
        }
      }
    }
  }

  function handleExportClick() {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "canvas.png";
      link.href = dataUrl;

      // create a new canvas with the same dimensions as the original canvas
      const newCanvas = document.createElement("canvas");
      newCanvas.width = canvas.width;
      newCanvas.height = canvas.height;

      // get the 2D context of the new canvas
      const newCtx = newCanvas.getContext("2d");

      // draw the background image on the new canvas
      if (backgroundImage) {
        const image = new Image();
        image.onload = () => {
          newCtx?.drawImage(image, 0, 0, canvas.width, canvas.height);
          newCtx?.drawImage(canvas, 0, 0, canvas.width, canvas.height);
          link.href = newCanvas.toDataURL("image/png");
          link.click();
        };
        image.src = backgroundImage;
      } else {
        newCtx?.drawImage(canvas, 0, 0, canvas.width, canvas.height);
        link.href = newCanvas.toDataURL("image/png");
        link.click();
      }
    }
  }

  function handleDropAccepted(acceptedFiles: File[]) {
    const reader = new FileReader();
    reader.onload = () => {
      setBackgroundImage(reader.result as string);
    };
    reader.readAsDataURL(acceptedFiles[0]);
  }

  return (
    <>
      <Dropzone onDropAccepted={handleDropAccepted}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag and drop an image here or click to select a file</p>
          </div>
        )}
      </Dropzone>
      <canvas
        width={width}
        height={height}
        onMouseDown={onCanvasMouseDown}
        style={{ ...canvasStyle, backgroundImage: `url(${backgroundImage})` }}
        ref={setCanvasRef}
      />
      <button onClick={handleExportClick}>Export</button>
      <button onClick={handleUndoClick}>undo</button>
    </>
  );
}

const canvasStyle: React.CSSProperties = {
  border: "1px solid black",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
};
