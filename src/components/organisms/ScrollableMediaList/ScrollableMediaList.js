import React from "react";
import PropTypes from "prop-types";
import { ItemsTrack } from "./ScrollableMediaList.styles";
import MediaListItem from "components/molecules/MediaListItem/MediaListItem";

const getEntityTitles = ({ Title, Id, Images }, index) => (
  <MediaListItem key={index} id={Id} title={Title} images={Images} />
);

const ScrollableMediaList = ({ entities = [] }) => {
  return <ItemsTrack>{entities.map(getEntityTitles)}</ItemsTrack>;
};

ScrollableMediaList.propTypes = {};

export default ScrollableMediaList;
