"use client";

import { createContext, useContext, useState } from "react";
import { Users } from "@/lib/users";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(Users[0]);

  const switchUser = () => {
    const currentIndex = Users.findIndex(
      (u) => u.username === currentUser.username
    );
    const nextUser = Users[(currentIndex + 1) % Users.length];
    setCurrentUser(nextUser);
  };

  return (
    <UserContext.Provider value={{ currentUser, switchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
