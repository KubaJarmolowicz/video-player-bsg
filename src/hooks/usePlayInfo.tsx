import axios, { AxiosError, AxiosResponse } from "axios";
import { TokenContext } from "providers/TokenProvider";
import { useState, useEffect, useContext } from "react";
import { useStateMachine } from "./useStateMachine";
import { Actions } from "assets/data/stateManagement";
import { BASE_URL, Endpoints, PLACEHOLDER_CONTENT_URL } from "assets/data/api";
import { ErrorMsgTypes } from "assets/data/errorMessages";

interface IPlayInfoParams {
  MediaId: number;
  StreamType: string;
}

type IPlayInfoRequest = IPlayInfoParams;

interface IPlayInfoResponse {
  MediaId: 15;
  Title: string;
  Description: string;
  MediaTypeCode: string;
  MediaTypeDisplayName: string;
  StreamId: number;
  Provider: string;
  ContentUrl: string;
}

export const isUnauthorizedError = (e: AxiosError) =>
  e.response?.status === 403 || e.response?.status === 401;

const URL = `${BASE_URL}${Endpoints.PLAYINFO}`;

export const usePlayInfo = ({
  MediaId,
  StreamType = "TRIAL",
}: IPlayInfoParams) => {
  const requestBody = {
    MediaId,
    StreamType,
  };

  const { token } = useContext(TokenContext);
  const { updateState, compareState } = useStateMachine();

  const [errorInfo, setErrorInfo] = useState<
    keyof typeof ErrorMsgTypes | undefined
  >(undefined);
  const [contentURL, setContentURL] = useState<string>("");

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  useEffect(() => {
    updateState(Actions.SET_LOADING);
    axios
      .post<IPlayInfoRequest, AxiosResponse<IPlayInfoResponse>>(
        URL,
        { ...requestBody },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          cancelToken: source.token,
        }
      )
      .then(({ data }) => {
        updateState(Actions.SET_SUCCESS);
        setContentURL(data.ContentUrl ?? PLACEHOLDER_CONTENT_URL);
      })
      .catch((e: AxiosError) => {
        updateState(Actions.SET_ERROR);
        setErrorInfo(isUnauthorizedError(e) ? "UNAUTHORIZED" : "DEFAULT");
      });

    return () => {
      updateState(Actions.SET_IDLE);
      source.cancel("Playinfo request cancelled.");
    };
  }, []);

  return { errorInfo, contentURL, compareState } as const;
};
