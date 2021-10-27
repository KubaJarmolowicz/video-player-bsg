import React, { FC, useContext } from "react";
import { usePlayInfo } from "hooks/usePlayInfo";
import { StyledItem, StyledMovieTitle } from "./MediaListItem.styles";
import ResponsivePlayer from "components/organisms/ResponsivePlayer/ResponsivePlayer";
import { States } from "assets/data/stateManagement";
import Loader from "components/atoms/Loader/Loader";
import { LoaderCenteringContainer } from "components/atoms/Loader/Loader.styles";
import { UserContext } from "providers/UserProvider";
import Error from "components/molecules/Error/Error";

interface IImage {
  Id: number;
  MediaId: number;
  PlatformCode: string;
  ImageTypeCode: string;
  Url: string;
  Width: number;
  Height: number;
}

interface IMediaListProps {
  id: number;
  title: string;
  images: IImage[];
}

const getImageSRC = (images: IImage[]): string => {
  if (images.length === 0) return "/placeholder.webp";

  const matchingImage = images.find(
    ({ ImageTypeCode }) => ImageTypeCode === "FRAME"
  );

  return matchingImage ? matchingImage.Url : "/placeholder.webp";
};

const MediaListItem: FC<IMediaListProps> = ({ id, title, images = [] }) => {
  const { isRegistered } = useContext(UserContext);

  const { errorInfo, contentURL, compareState } = usePlayInfo({
    MediaId: id,
    StreamType: isRegistered ? "MAIN" : "TRIAL",
  });

  return (
    <StyledItem>
      <StyledMovieTitle>{title}</StyledMovieTitle>
      {compareState(States.LOADING) && (
        <LoaderCenteringContainer>
          <Loader />
        </LoaderCenteringContainer>
      )}
      {compareState(States.SUCCESS) && (
        <ResponsivePlayer light={getImageSRC(images)} url={contentURL} />
      )}
      {compareState(States.ERROR) && errorInfo && (
        <Error messageType={errorInfo} />
      )}
    </StyledItem>
  );
};

export default MediaListItem;
