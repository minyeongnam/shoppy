import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { UserType } from "../type/user";
import { login, logout, onUserStateChange } from "../api/firebase";
import { UserCredential } from "firebase/auth";

interface AuthContextProps {
  user: UserType | null;
  login: () => Promise<void | UserCredential>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export function AuthContextProvider({ children }: { children: ReactNode }) {
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
  const state = useContext(AuthContext);
  if (!state) throw new Error("Provider not found");
  return state;
}
