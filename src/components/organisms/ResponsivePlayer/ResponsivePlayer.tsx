import { FC } from "react";
import ReactPlayer from "react-player";
import { FixedRatioWrapper } from "./ResponsivePlayer.styles";

interface IResponsivePlayerProps {
  light: string;
  url: string;
}

const ResponsivePlayer: FC<IResponsivePlayerProps> = ({ light, url }) => {
  return (
    <FixedRatioWrapper>
      <ReactPlayer
        playing
        light={light}
        url={url}
        controls
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
    </FixedRatioWrapper>
  );
};

export default ResponsivePlayer;
