import React, { useEffect } from "react";
import { usePlayInfo } from "hooks/usePlayInfo";
import PropTypes from "prop-types";
import { StyledItem, StyledMovieTitle } from "./MediaListItem.styles";
import ResponsivePlayer from "organisms/ResponsivePlayer/ResponsivePlayer";

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
      <StyledMovieTitle> {title}</StyledMovieTitle>

      {error ? (
        <div>"Sorry, we couldnt load your movie. Please try again later"</div>
      ) : (
        <ResponsivePlayer light={getImageSRC(images)} url={contentURL} />
      )}
    </StyledItem>
  );
};

MediaListItem.propTypes = {};

export default MediaListItem;
