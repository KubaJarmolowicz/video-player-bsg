import React, { useEffect } from "react";
import { usePlayInfo } from "hooks/usePlayInfo";
import PropTypes from "prop-types";
import { StyledItem, StyledMovieTitle } from "./MediaListItem.styles";
import ResponsivePlayer from "organisms/ResponsivePlayer/ResponsivePlayer";
import { states } from "assets/data/consts";
import Loader from "atoms/Loader/Loader";
import { LoaderCenteringContainer } from "atoms/Loader/Loader.styles";

const getImageSRC = (images) => {
  if (images.length === 0) return "/placeholder.webp";

  const matchingImage = images.find(
    ({ ImageTypeCode }) => ImageTypeCode === "FRAME"
  );

  return matchingImage ? matchingImage.Url : "/placeholder.webp";
};

const MediaListItem = ({ id, title, images = [] }) => {
  const { errorInfo, contentURL, compareState } = usePlayInfo({
    mediaId: id,
    streamType: "TRIAL",
  });

  // useEffect(() => {
  //   if (contentURL) console.log(contentURL);
  // }, [contentURL]);

  return (
    <StyledItem>
      <StyledMovieTitle>{title}</StyledMovieTitle>
      {compareState(states.loading) && (
        <LoaderCenteringContainer>
          <Loader />
        </LoaderCenteringContainer>
      )}
      {compareState(states.success) && (
        <ResponsivePlayer
          playing
          light={getImageSRC(images)}
          url={contentURL}
        />
      )}
      {compareState(states.error) && (
        <div>"Sorry, we couldnt load your movie. Please try again later"</div>
      )}
    </StyledItem>
  );
};

MediaListItem.propTypes = {};

export default MediaListItem;
