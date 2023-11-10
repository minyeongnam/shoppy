// https://fathory.tistory.com/150

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserType } from "../type/user";
import { onUserStateChange } from "../api/firebase";

interface AuthContextProps {
  user: UserType | null;
  login: () => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextProps | null>(null);

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
