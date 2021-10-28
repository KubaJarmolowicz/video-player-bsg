export type Idle = "IDLE";
export type Loading = "LOADING";
export type Error = "ERROR";
export type Success = "SUCCESS";

export type State = Idle | Loading | Error | Success;

export type SET_LOADING = "SET_LOADING";
export type SET_ERROR = "SET_ERROR";
export type SET_SUCCESS = "SET_SUCCESS";
export type SET_IDLE = "SET_IDLE";

export type Action = SET_LOADING | SET_ERROR | SET_SUCCESS | SET_IDLE;

interface ITransition {
  from: State;
  to: State;
  action: Action;
}

type TState = { [type in State]: State };
type TAction = { [type in Action]: Action };

export const States: TState = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
};

export const Actions: TAction = {
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  SET_SUCCESS: "SET_SUCCESS",
  SET_IDLE: "SET_IDLE",
};

export const transitions: ITransition[] = [
  { from: "IDLE", to: "LOADING", action: "SET_LOADING" },
  { from: "IDLE", to: "ERROR", action: "SET_ERROR" },
  { from: "LOADING", to: "ERROR", action: "SET_ERROR" },
  { from: "LOADING", to: "SUCCESS", action: "SET_SUCCESS" },
  { from: "ERROR", to: "IDLE", action: "SET_IDLE" },
  { from: "SUCCESS", to: "IDLE", action: "SET_IDLE" },
];
