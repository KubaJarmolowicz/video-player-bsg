import React from "react";
import { ItemsTrack } from "./ScrollableMediaList.styles";
import MediaListItem from "components/molecules/MediaListItem/MediaListItem";

const getEntityTitles = ({ Title, Id, Images }, index) => (
  <MediaListItem key={index} id={Id} title={Title} images={Images} />
);

const ScrollableMediaList = ({ entities = [] }) => {
  return <ItemsTrack>{entities.map(getEntityTitles)}</ItemsTrack>;
};

export default ScrollableMediaList;
