import React, { Dispatch, FC, SetStateAction, useState } from "react";

interface ITokenContext {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  shouldAllowAccess: boolean;
  setShouldAllowAccess: Dispatch<SetStateAction<boolean>>;
}

export const TokenContext = React.createContext<ITokenContext>({
  token: "",
  setToken: () => {
    return;
  },
  shouldAllowAccess: false,
  setShouldAllowAccess: () => {
    return;
  },
});

const TokenProvider: FC = ({ children }) => {
  const [token, setToken] = useState<string>("");
  const [shouldAllowAccess, setShouldAllowAccess] = useState<boolean>(false);

  return (
    <TokenContext.Provider
      value={{ token, setToken, shouldAllowAccess, setShouldAllowAccess }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export default TokenProvider;
