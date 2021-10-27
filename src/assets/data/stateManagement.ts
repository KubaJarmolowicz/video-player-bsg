export enum States {
  IDLE = "IDLE",
  LOADING = "LOADING",
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
}

export enum Actions {
  SET_LOADING = "SET_LOADING",
  SET_ERROR = "SET_ERROR",
  SET_SUCCESS = "SET_SUCCESS",
  SET_IDLE = "SET_IDLE",
}

export const transitions = {
  [States.IDLE]: {
    [Actions.SET_LOADING]: States.LOADING,
    [Actions.SET_ERROR]: States.ERROR,
    [Actions.SET_SUCCESS]: States.SUCCESS,
  },

  [States.LOADING]: {
    [Actions.SET_ERROR]: States.ERROR,
    [Actions.SET_SUCCESS]: States.SUCCESS,
  },

  [States.ERROR]: {
    [Actions.SET_IDLE]: States.IDLE,
  },

  [States.SUCCESS]: {
    [Actions.SET_IDLE]: States.IDLE,
  },
};
