import React, { useEffect, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { BASE_URL } from "assets/data/consts";
import { TokenContext } from "providers/TokenProvider";
import {
  HomeWrapper,
  AppbarWrapper,
  SideNavWrapper,
  ScrollableListWrapper,
  FooterWrapper,
} from "./Home.styles";

const URL = `${BASE_URL}/Media/GetMediaList`;

const requestBody = {
  PageSize: 15,
  PageNumber: 1,
  MediaListId: 7,
  IncludeCategories: false,
  IncludeMedia: false,
  IncludeImages: true,
};

const Home = () => {
  const { token } = useContext(TokenContext);

  useEffect(() => {
    axios
      .post(
        URL,
        { ...requestBody },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(({ data }) => console.log(data))
      .catch((e) => console.error(e));
  }, []);

  return (
    <HomeWrapper>
      <AppbarWrapper>Welcome to our Homepage!</AppbarWrapper>
      <SideNavWrapper>Sidebar</SideNavWrapper>
      <ScrollableListWrapper>MediaList 1</ScrollableListWrapper>
      <ScrollableListWrapper>MediaList 2</ScrollableListWrapper>
      <FooterWrapper>Footer</FooterWrapper>
    </HomeWrapper>
  );
};

Home.propTypes = {};

export default Home;
