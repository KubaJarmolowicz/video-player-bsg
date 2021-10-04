import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { TokenContext } from "providers/TokenProvider";
import { BASE_URL } from "assets/data/consts";

const URL = `${BASE_URL}/Media/GetMediaList`;

export const useMediaList = (MediaListId = 3) => {
  const { token } = useContext(TokenContext);

  const [error, setError] = useState(null);
  const [mediaList, setMediaList] = useState(null);

  const requestBody = {
    PageSize: 15,
    PageNumber: 1,
    MediaListId,
    IncludeCategories: false,
    IncludeMedia: false,
    IncludeImages: true,
  };

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
      .then(({ data }) => setMediaList(data))
      .catch((e) => setError(e));
  }, []);

  return [mediaList, error];
};
