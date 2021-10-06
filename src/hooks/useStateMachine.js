import { useState } from "react";
import { states, transitions } from "assets/data/stateManagement";

export const useStateMachine = () => {
  const [currentState, setCurrentState] = useState(states.idle);

  const transition = (currentState, action) => {
    const nextState = transitions[currentState][action];

    return nextState || currentState;
  };

  const updateState = (action) => {
    setCurrentState((currentState) => transition(currentState, action));
  };

  const compareState = (state) => state === currentState;

  return { updateState, compareState };
};
