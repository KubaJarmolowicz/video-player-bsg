import React, { useState } from "react";

export const UserContext = React.createContext({
  isRegistered: false,
  setIsRegistered: () => {},
  fullName: "",
  setFullname: () => {},
});

const UserProvider = ({ children }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [fullName, setFullname] = useState("Guest");

  return (
    <UserContext.Provider
      value={{ isRegistered, setIsRegistered, fullName, setFullname }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
