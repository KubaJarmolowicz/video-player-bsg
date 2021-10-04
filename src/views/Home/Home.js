import React, { useEffect } from "react";
import { useMediaList } from "hooks/useMediaList";
import PropTypes from "prop-types";
import ScrollableMediaList from "organisms/ScrollableMediaList/ScrollableMediaList";

import {
  HomeWrapper,
  AppbarWrapper,
  SideNavWrapper,
  ScrollableListWrapper,
  FooterWrapper,
  ListTitle,
} from "./Home.styles";

const Home = () => {
  const [mediaList1, error1] = useMediaList(2);
  const [mediaList2, error2] = useMediaList(3);

  //   useEffect(() => {
  //     if (mediaList2) {
  //       console.log(mediaList2);
  //     }
  //   }, [mediaList2]);

  return (
    <HomeWrapper>
      <AppbarWrapper>Welcome to our Homepage!</AppbarWrapper>
      <SideNavWrapper>Sidebar</SideNavWrapper>
      <ScrollableListWrapper>
        <ListTitle>SELECTED FOR YOU</ListTitle>
        {error1 ? (
          "Sorry, we couldnt load your movie. Please try again later"
        ) : (
          <ScrollableMediaList entities={mediaList1?.Entities} />
        )}
      </ScrollableListWrapper>
      <ScrollableListWrapper>
        <ListTitle>TRENDING NOW</ListTitle>
        {error2 ? (
          "Sorry, we couldnt load your movie. Please try again later"
        ) : (
          <ScrollableMediaList entities={mediaList2?.Entities} />
        )}
      </ScrollableListWrapper>
      <FooterWrapper>Footer</FooterWrapper>
    </HomeWrapper>
  );
};

Home.propTypes = {};

export default Home;
