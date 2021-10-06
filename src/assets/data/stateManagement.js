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
