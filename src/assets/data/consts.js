export const BASE_URL = "https://thebetter.bsgroup.eu";

export const PLACEHOLDER_CONTENT_URL =
  "https://d1n3vpqjhjvv6k.cloudfront.net:443/User/Videos/e320563cd39d44b38e70c1a1ec11ef10/Assets/f1163f60db2847e09e1d32f82fc160ca/adaf53616cb74ee28acbd4c43ffb9a2a/Content/adaf53616cb74ee28acbd4c43ffb9a2a.m3u8";

export const states = {
  idle: "idle",
  loading: "loading",
  error: "error",
  success: "success",
};

export const transitions = {
  [states.idle]: {
    SET_LOADING: states.loading,
    SET_ERROR: states.error,
    SET_SUCCESS: states.success,
  },

  [states.loading]: {
    SET_ERROR: states.error,
    SET_SUCCESS: states.success,
  },

  [states.error]: {
    SET_IDLE: states.idle,
  },

  [states.success]: {
    SET_IDLE: states.idle,
  },
};

export const actions = {
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  SET_SUCCESS: "SET_SUCCESS",
  SET_IDLE: "SET_IDLE",
};
