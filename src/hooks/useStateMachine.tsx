import { useState } from "react";
import {
  State,
  Action,
  States,
  transitions,
} from "assets/data/stateManagement";

export const useStateMachine = () => {
  const [currentState, setCurrentState] = useState<State>(States.IDLE);

  const transition = (currentState: State, requestedAction: Action) => {
    const nextState: State =
      transitions.find(
        ({ from, action }) =>
          from === currentState && action === requestedAction
      )?.to || currentState;

    return nextState;
  };

  const updateState = (action: Action) => {
    setCurrentState((currentState: State) => transition(currentState, action));
  };

  const compareState = (state: State) => state === currentState;

  return { updateState, compareState } as const;
};
