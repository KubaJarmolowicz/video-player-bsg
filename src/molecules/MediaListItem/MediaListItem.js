import React from "react";
import PropTypes from "prop-types";
import { ImgWrapper, StyledItem } from "./MediaListItem.styles";

const getImageSRC = (images) => {
  if (images.length === 0) return "/placeholder.webp";

  const matchingImage = images.find(
    ({ ImageTypeCode }) => ImageTypeCode === "FRAME"
  );

  return matchingImage ? matchingImage.Url : "/placeholder.webp";
};

const MediaListItem = ({ id, title, images = [] }) => {
  return (
    <StyledItem>
      {title}
      <ImgWrapper>
        <img src={getImageSRC(images)} alt="placeholder" />
      </ImgWrapper>
    </StyledItem>
  );
};

MediaListItem.propTypes = {};

export default MediaListItem;
