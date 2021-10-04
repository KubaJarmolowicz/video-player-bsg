import React, { useEffect } from "react";
import { usePlayInfo } from "hooks/usePlayInfo";
import PropTypes from "prop-types";
import { ImgWrapper, StyledItem } from "./MediaListItem.styles";
import ReactPlayer from "react-player";
import { PLACEHOLDER_CONTENT_URL } from "assets/data/consts";

const getImageSRC = (images) => {
  if (images.length === 0) return "/placeholder.webp";

  const matchingImage = images.find(
    ({ ImageTypeCode }) => ImageTypeCode === "FRAME"
  );

  return matchingImage ? matchingImage.Url : "/placeholder.webp";
};

const MediaListItem = ({ id, title, images = [] }) => {
  const { error, contentURL } = usePlayInfo({
    mediaId: id,
    streamType: "TRIAL",
  });

  useEffect(() => {
    if (contentURL) console.log(contentURL);
  }, [contentURL]);

  return (
    <StyledItem>
      {title}
      {error ? (
        <div>"Sorry, we couldnt load your movie. Please try again later"</div>
      ) : (
        <ReactPlayer
          light={getImageSRC(images)}
          url={contentURL ?? PLACEHOLDER_CONTENT_URL}
          controls
          style={{
            display: "block",
            maxWidth: "100%",
            aspectRatio: "16 / 9",
          }}
        />
      )}
    </StyledItem>
  );
};

MediaListItem.propTypes = {};

export default MediaListItem;
