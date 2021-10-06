import { useState, useEffect, useContext } from "react";
import { useStateMachine } from "./useStateMachine";
import { actions } from "assets/data/stateManagement";
import axios from "axios";
import { TokenContext } from "providers/TokenProvider";
import { BASE_URL, endpoints } from "assets/data/api";

const URL = `${BASE_URL}${endpoints.mediaList}`;

export const useMediaList = (MediaListId = 3) => {
  const { token } = useContext(TokenContext);
  const { updateState, compareState } = useStateMachine();

  const [errorInfo, setErrorInfo] = useState(null);
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
    updateState(actions.SET_LOADING);
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
      .then(({ data }) => {
        setMediaList(data);
        updateState(actions.SET_SUCCESS);
      })
      .catch((e) => {
        setErrorInfo(e.response.status);
        updateState(actions.SET_ERROR);
      });
  }, []);

  return [mediaList, errorInfo, compareState];
};
