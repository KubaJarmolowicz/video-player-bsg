import React, { useState } from "react";

export const UserContext = React.createContext({
  isRegistered: false,
  setIsRegistered: () => {},
});

const UserProvider = ({ children }) => {
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <UserContext.Provider value={{ isRegistered, setIsRegistered }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
