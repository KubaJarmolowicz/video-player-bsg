import React from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";
import { FixedRatioWrapper } from "./ResponsivePlayer.styles";

const ResponsivePlayer = ({ light, url, playing }) => {
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

ResponsivePlayer.propTypes = {
  light: PropTypes.string,
  url: PropTypes.string,
};

export default ResponsivePlayer;
