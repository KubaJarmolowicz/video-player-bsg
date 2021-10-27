import { useState } from "react";
import { States, Actions, transitions } from "assets/data/stateManagement";

export type AllowedState = keyof typeof States;
type AllowedAction = keyof typeof Actions;

export const useStateMachine = () => {
  const [currentState, setCurrentState] = useState<AllowedState>(States.IDLE);

  const transition = (
    currentState: AllowedState,
    action: AllowedAction = "SET_LOADING"
  ) => {
    const allowedTransitions = Object.keys(transitions[currentState]);

    if (action in allowedTransitions) {
      const nextState: AllowedState = allowedTransitions[
        allowedTransitions.indexOf(action)
      ] as AllowedState;

      return nextState;
    }

    return currentState;
  };

  const updateState = (action: AllowedAction) => {
    setCurrentState((currentState: AllowedState) =>
      transition(currentState, action)
    );
  };

  const compareState = (state: AllowedState) => state === currentState;

  return { updateState, compareState } as const;
};
