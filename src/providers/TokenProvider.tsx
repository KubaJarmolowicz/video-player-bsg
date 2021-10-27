import React, { Dispatch, FC, SetStateAction, useState } from "react";

interface ITokenContext {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
}

export const TokenContext = React.createContext<ITokenContext>({
  token: "",
  setToken: () => {
    return;
  },
});

const TokenProvider: FC = ({ children }) => {
  const [token, setToken] = useState<string>("");

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenProvider;
