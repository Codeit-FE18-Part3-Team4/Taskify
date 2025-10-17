import axios from "axios";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

class Auth {
  constructor(private _token: string | null = null) {}

  get token() {
    return this._token;
  }

  set token(value: string | null) {
    this._token = value;
  }
}

export const auth = new Auth();

interface AuthContextValue {
  isLoadingToken: boolean;
}

const AuthContext = createContext<AuthContextValue>({ isLoadingToken: true });

export function useAuth() {
  const { isLoadingToken } = useContext(AuthContext);
  return { isLoadingToken };
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoadingToken, setIsLoadingToken] = useState(true);

  useEffect(() => {
    async function load() {
      const response = await axios.get("/api/auth");
      const { accessToken } = response.data;
      if (accessToken) {
        auth.token = accessToken;
      }

      setIsLoadingToken(false);
    }
    load();
  }, []);

  return <AuthContext value={{ isLoadingToken }}>{children}</AuthContext>;
}
