import React, { createContext, useEffect, useState } from "react";

interface childrenInterface {
  children: React.ReactNode;
}

interface stateInterface{
  email:string;
  token:string;
}

interface userInterface{
  user:stateInterface | null;
  setUser:React.Dispatch<React.SetStateAction<stateInterface | null>>
}

const initialUserInterface = {
  user: null,
  setUser: () => {}
}
export const AuthContext = createContext<userInterface>(initialUserInterface);

export const AuthContextProvider = ({ children }: childrenInterface) => {

  const [user, setUser] = useState<stateInterface |null>(null);
  useEffect(()=>{
    let accountIsPresent = localStorage.getItem('user');
    if(accountIsPresent){
      let json = JSON.parse(accountIsPresent);
      setUser(json);
    }
  }, []);
  return (
    <AuthContext.Provider value={{user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
};
