import React from "react";
import PropTypes from "prop-types";
import { ItemsTrack } from "./ScrollableMediaList.styles";
import MediaListItem from "molecules/MediaListItem/MediaListItem";

const getEntityTitles = ({ Title, Id, Images }) => (
  <MediaListItem key={Id} title={Title} images={Images} />
);

const ScrollableMediaList = ({ entities = [] }) => {
  return <ItemsTrack>{entities.map(getEntityTitles)}</ItemsTrack>;
};

ScrollableMediaList.propTypes = {};

export default ScrollableMediaList;
