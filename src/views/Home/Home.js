import React from "react";
import { useMediaList } from "hooks/useMediaList";
import ScrollableMediaList from "components/organisms/ScrollableMediaList/ScrollableMediaList";
import Error from "components/molecules/Error/Error";

import {
  HomeWrapper,
  AppbarWrapper,
  SideNavWrapper,
  ScrollableListWrapper,
  FooterWrapper,
  ListTitle,
} from "./Home.styles";
import { states } from "assets/data/consts";

const Home = () => {
  const [mediaList1, , compareState1] = useMediaList(2);
  const [mediaList2, , compareState2] = useMediaList(3);
  const [medialist3, , compareState3] = useMediaList(6);

  const isAnyListLoading =
    compareState1(states.loading) || compareState3(states.loading);

  const didAnyListThrowError =
    compareState1(states.error) || compareState3(states.error);

  const areBothListsFetched =
    compareState1(states.success) && compareState3(states.success);

  return (
    <HomeWrapper>
      <AppbarWrapper>Welcome to our Homepage!</AppbarWrapper>
      <SideNavWrapper>Sidebar</SideNavWrapper>
      <ScrollableListWrapper>
        <ListTitle>SELECTED FOR YOU</ListTitle>
        {isAnyListLoading && <div style={{ height: 225 }}></div>}
        {didAnyListThrowError && <Error messageType="list" />}
        {areBothListsFetched && (
          <ScrollableMediaList
            entities={[...mediaList1.Entities, ...medialist3.Entities]}
          />
        )}
      </ScrollableListWrapper>
      <ScrollableListWrapper>
        <ListTitle>TRENDING NOW</ListTitle>
        {compareState2(states.loading) && <div style={{ height: 225 }}></div>}
        {compareState2(states.error) && <Error messageType="list" />}
        {compareState2(states.success) && (
          <ScrollableMediaList entities={mediaList2.Entities} />
        )}
      </ScrollableListWrapper>
      <FooterWrapper>Footer</FooterWrapper>
    </HomeWrapper>
  );
};
export default Home;
