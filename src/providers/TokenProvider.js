import React, { useState } from "react";
import PropTypes from "prop-types";

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

TokenProvider.propTypes = {};

export default TokenProvider;
