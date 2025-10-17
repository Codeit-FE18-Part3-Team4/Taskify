import axios from "axios";
import {
  createContext,
  DependencyList,
  EffectCallback,
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

const AuthContext = createContext<boolean>(true);

export function useEffectAuth(effect: EffectCallback, deps?: DependencyList) {
  const isLoadingAuth = useContext(AuthContext);

  useEffect(() => {
    if (isLoadingAuth) return;
    return effect();
  }, [isLoadingAuth, ...(deps ?? [])]);
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    async function load() {
      const response = await axios.get("/api/auth");
      const { accessToken } = response.data;
      if (accessToken) {
        auth.token = accessToken;
      }

      setIsLoadingAuth(false);
    }
    load();
  }, []);

  return <AuthContext value={isLoadingAuth}>{children}</AuthContext>;
}
