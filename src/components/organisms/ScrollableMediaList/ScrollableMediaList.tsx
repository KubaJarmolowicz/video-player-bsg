import React, { FC } from "react";
import { ItemsTrack } from "./ScrollableMediaList.styles";
import MediaListItem from "components/molecules/MediaListItem/MediaListItem";
import { IImage } from "hooks/useMediaList";
import { IMediaEntity } from "hooks/useMediaList";

interface IScrollableMediaListProps {
  entities: IMediaEntity[];
}

const getEntityTitles = (
  { Title, Id, Images }: { Title: string; Id: number; Images: IImage[] },
  index: number
) => <MediaListItem key={index} id={Id} title={Title} images={Images} />;

const ScrollableMediaList: FC<IScrollableMediaListProps> = ({
  entities = [],
}) => {
  return <ItemsTrack>{entities.map(getEntityTitles)}</ItemsTrack>;
};

export default ScrollableMediaList;
