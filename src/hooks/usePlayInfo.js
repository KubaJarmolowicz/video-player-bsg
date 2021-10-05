import { BASE_URL } from "assets/data/consts";
import axios from "axios";
import { TokenContext } from "providers/TokenProvider";
import { useState, useEffect, useContext } from "react";
import { useStateMachine } from "./useStateMachine";
import { PLACEHOLDER_CONTENT_URL } from "assets/data/consts";
import { actions } from "assets/data/consts";

const URL = `${BASE_URL}/Media/GetMediaPlayInfo`;

export const usePlayInfo = ({ mediaId, streamType = "TRIAL" }) => {
  const requestBody = {
    MediaId: mediaId,
    StreamType: streamType,
  };

  const { token } = useContext(TokenContext);
  const { updateState, compareState } = useStateMachine();

  const [errorInfo, setErrorInfo] = useState(null);
  const [contentURL, setContentURL] = useState(null);

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
        updateState(actions.SET_SUCCESS);
        setContentURL(data.ContentUrl ?? PLACEHOLDER_CONTENT_URL);
      })
      .catch((e) => {
        updateState(actions.SET_ERROR);
        setErrorInfo(e);
      });
  }, []);

  return { errorInfo, contentURL, compareState };
};
