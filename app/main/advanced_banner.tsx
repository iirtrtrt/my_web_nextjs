import { ParallaxBanner } from "react-scroll-parallax";
import { BannerLayer } from "react-scroll-parallax/dist/components/ParallaxBanner/types";
import Headline from "./headline";

export const AdvancedBannerTop = ({ bannerBottomRef }: any) => {
  const background: BannerLayer = {
    image: "assets/background_galaxy.png",
    translateY: [0, 50],
    opacity: [1, 0.3],
    scale: [1.05, 1, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
  };

  const foreground: BannerLayer = {
    image: "/assets/background_buildings.png",
    translateY: [0, 15],
    scale: [1, 1.1, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
    children: <Headline bannerBottomRef={bannerBottomRef} />,
  };

  const gradientOverlay: BannerLayer = {
    opacity: [0, 1, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: <div className="gradient inset" />,
  };

  return (
    <ParallaxBanner
      layers={[background, gradientOverlay, foreground]}
      className="full"
    />
  );
};
