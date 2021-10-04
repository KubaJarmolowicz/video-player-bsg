import React, { useEffect, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { BASE_URL } from "assets/data/consts";
import { TokenContext } from "providers/TokenProvider";

const URL = `${BASE_URL}/Media/GetMediaList`;

const requestBody = {
  PageSize: 15,
  PageNumber: 1,
  MediaListId: 2,
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

  return <div>Welcome to our Homepage!</div>;
};

Home.propTypes = {};

export default Home;
