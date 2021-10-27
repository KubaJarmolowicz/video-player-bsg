import React, { Dispatch, FC, SetStateAction, useState } from "react";

interface IUserContext {
  isRegistered: boolean;
  setIsRegistered: Dispatch<SetStateAction<boolean>>;
  fullName: string;
  setFullname: Dispatch<SetStateAction<string>>;
}

export const UserContext = React.createContext<IUserContext>({
  isRegistered: false,
  setIsRegistered: () => {
    return;
  },
  fullName: "",
  setFullname: () => {
    return;
  },
});

const UserProvider: FC = ({ children }) => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [fullName, setFullname] = useState<string>("Guest");

  return (
    <UserContext.Provider
      value={{ isRegistered, setIsRegistered, fullName, setFullname }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
