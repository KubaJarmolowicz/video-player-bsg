import React, { useState } from "react";

export const TokenContext = React.createContext({
  token: "",
  setToken: () => {},
});

const TokenProvider = ({ children }) => {
  const [token, setToken] = useState("");

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenProvider;
