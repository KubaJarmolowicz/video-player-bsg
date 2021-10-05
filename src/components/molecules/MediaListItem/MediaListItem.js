import React, { useContext } from "react";
import { usePlayInfo } from "hooks/usePlayInfo";
import { StyledItem, StyledMovieTitle } from "./MediaListItem.styles";
import ResponsivePlayer from "components/organisms/ResponsivePlayer/ResponsivePlayer";
import { states } from "assets/data/consts";
import Loader from "components/atoms/Loader/Loader";
import { LoaderCenteringContainer } from "components/atoms/Loader/Loader.styles";
import { UserContext } from "providers/UserProvider";
import Error from "components/molecules/Error/Error";

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
      {compareState(states.error) && errorInfo && (
        <Error messageType={errorInfo.response.status} />
      )}
    </StyledItem>
  );
};

export default MediaListItem;
