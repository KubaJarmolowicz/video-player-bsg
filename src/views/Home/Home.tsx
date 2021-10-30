import { useContext } from "react";
import { useMediaList } from "hooks/useMediaList";
import { useAuth } from "hooks/useAuth";
import ScrollableMediaList from "components/organisms/ScrollableMediaList/ScrollableMediaList";
import Error from "components/molecules/Error/Error";

import {
  HomeWrapper,
  AppbarWrapper,
  SideNavWrapper,
  ScrollableListWrapper,
  FooterWrapper,
  ListTitle,
  StyledLink,
} from "./Home.styles";
import { States } from "assets/data/stateManagement";
import { UserContext } from "providers/UserProvider";
import { Redirect } from "react-router";
import { TokenContext } from "providers/TokenProvider";

const Home = () => {
  const [mediaList1, , compareState1] = useMediaList(2);
  const [mediaList2, , compareState2] = useMediaList(3);
  const [medialist3, , compareState3] = useMediaList(6);

  const { shouldAllowAccess } = useContext(TokenContext);
  const { fullName } = useContext(UserContext);
  const { handleLogOut } = useAuth();

  const isAnyListLoading =
    compareState1(States.LOADING) || compareState3(States.LOADING);

  const didAnyListThrowError =
    compareState1(States.ERROR) || compareState3(States.ERROR);

  const areBothListsFetched =
    compareState1(States.SUCCESS) && compareState3(States.SUCCESS);

  if (!shouldAllowAccess) return <Redirect to="/" exact />;

  return (
    <HomeWrapper>
      <AppbarWrapper>
        <div>Better Video Player</div>
        <div>Hello, {fullName}</div>
      </AppbarWrapper>
      <SideNavWrapper>
        <StyledLink to="/" onClick={handleLogOut}>
          Logout
        </StyledLink>
      </SideNavWrapper>
      <ScrollableListWrapper>
        <ListTitle>SELECTED FOR YOU</ListTitle>
        {isAnyListLoading && <div style={{ height: 225 }}></div>}
        {didAnyListThrowError && <Error messageType="LIST" />}
        {areBothListsFetched && (
          <ScrollableMediaList
            entities={[...mediaList1!.Entities, ...medialist3!.Entities]}
          />
        )}
      </ScrollableListWrapper>
      <ScrollableListWrapper>
        <ListTitle>TRENDING NOW</ListTitle>
        {compareState2(States.LOADING) && <div style={{ height: 225 }}></div>}
        {compareState2(States.ERROR) && <Error messageType="LIST" />}
        {compareState2(States.SUCCESS) && (
          <ScrollableMediaList entities={mediaList2!.Entities} />
        )}
      </ScrollableListWrapper>
      <FooterWrapper>Footer</FooterWrapper>
    </HomeWrapper>
  );
};
export default Home;
