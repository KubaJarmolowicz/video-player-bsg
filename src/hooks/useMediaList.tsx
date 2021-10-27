import { useState, useEffect, useContext } from "react";
import { useStateMachine } from "./useStateMachine";
import { Actions } from "assets/data/stateManagement";
import axios, { AxiosResponse } from "axios";
import { TokenContext } from "providers/TokenProvider";
import { BASE_URL, Endpoints } from "assets/data/api";
import { isUnauthorizedError } from "./usePlayInfo";

const URL = `${BASE_URL}${Endpoints.MEDIALIST}`;

export interface IImage {
  Id: number;
  MediaId: number;
  PlatformCode: string;
  ImageTypeCode: string;
  Url: string;
  Width: number;
  Height: number;
}

export interface IMediaEntity {
  Id: number;
  Guid: number;
  MediaTypeCode: string;
  MediaTypeDisplayName: string;
  MediaAgeRestrictionValueMin: number;

  MediaAgeRestrictionImageUrl: string;
  Title: string;
  Description: string;
  Year: number;
  Duration: number;
  IsTrialContentAvailable: boolean;
  AvailableFrom: string;
  Images: IImage[];

  Products: any[];
}

interface IMediaListRequest {
  MediaListId: number;
  IncludeCategories: boolean;
  IncludeImages: boolean;
  IncludeMedia: boolean;
  PageNumber: number;
  PageSize: number;
}

interface IMediaListResponse {
  CacheDataValidTo: string;
  SourceType: string;
  Entities: IMediaEntity[];
  PageSize: number;
  PageNumber: number;
  TotalCount: number;
}

export const useMediaList = (MediaListId = 3) => {
  const { token } = useContext(TokenContext);
  const { updateState, compareState } = useStateMachine();

  const [errorInfo, setErrorInfo] = useState<string>("");
  const [mediaList, setMediaList] = useState<IMediaListResponse | null>(null);

  const requestBody = {
    PageSize: 15,
    PageNumber: 1,
    MediaListId,
    IncludeCategories: false,
    IncludeMedia: false,
    IncludeImages: true,
  };

  useEffect(() => {
    updateState(Actions.SET_LOADING);
    axios
      .post<IMediaListRequest, AxiosResponse<IMediaListResponse>>(
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
        updateState(Actions.SET_SUCCESS);
      })
      .catch((e) => {
        setErrorInfo(isUnauthorizedError(e) ? "UNAUTHORIZED" : "DEFAULT");
        updateState(Actions.SET_ERROR);
      });
  }, []);

  return [mediaList, errorInfo, compareState] as const;
};
