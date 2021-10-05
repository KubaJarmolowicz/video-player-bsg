import React, { useEffect, useContext } from "react";
import { usePlayInfo } from "hooks/usePlayInfo";
import PropTypes from "prop-types";
import { StyledItem, StyledMovieTitle } from "./MediaListItem.styles";
import ResponsivePlayer from "components/organisms/ResponsivePlayer/ResponsivePlayer";
import { states } from "assets/data/consts";
import Loader from "components/atoms/Loader/Loader";
import { LoaderCenteringContainer } from "components/atoms/Loader/Loader.styles";
import { UserContext } from "providers/UserProvider";

const getImageSRC = (images) => {
  if (images.length === 0) return "/placeholder.webp";

  const matchingImage = images.find(
    ({ ImageTypeCode }) => ImageTypeCode === "FRAME"
  );

  return matchingImage ? matchingImage.Url : "/placeholder.webp";
};

const MediaListItem = ({ id, title, images = [] }) => {
  const { isRegistered } = useContext(UserContext);

  const { errorInfo, contentURL, compareState } = usePlayInfo({
    mediaId: id,
    streamType: isRegistered ? "MAIN" : "TRIAL",
  });

  useEffect(() => {
    console.log("isRegistered from MediaListItem: ", isRegistered);
  }, []);

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
