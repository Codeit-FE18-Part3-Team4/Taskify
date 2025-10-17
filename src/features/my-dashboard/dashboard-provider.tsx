import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

interface DashboardContextValue {
  refreshSidebar: () => void;
  registerRefresh: (callback: () => void) => void;
  refreshMainDashboards: () => void;
  registerMainRefresh: (callback: () => void) => void;
  currentDashboardPage: number;
  setCurrentDashboardPage: (page: number) => void;
  currentSidebarPage: number;
  setCurrentSidebarPage: (page: number) => void;
}

interface DashboardProviderProps {
  children: ReactNode;
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

export default function DashboardProvider({
  children,
}: DashboardProviderProps) {
  const sidebarRefreshRef = useRef<(() => void) | null>(null);
  const mainRefreshRef = useRef<(() => void) | null>(null);

  const [currentDashboardPage, setCurrentDashboardPage] = useState<number>(0);

  const [currentSidebarPage, setCurrentSidebarPage] = useState<number>(1);

  const registerRefresh = useCallback((callback: () => void) => {
    sidebarRefreshRef.current = callback;
  }, []);

  const refreshSidebar = useCallback(() => {
    sidebarRefreshRef.current?.();
  }, []);

  const registerMainRefresh = useCallback((callback: () => void) => {
    mainRefreshRef.current = callback;
  }, []);

  const refreshMainDashboards = useCallback(() => {
    mainRefreshRef.current?.();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        refreshSidebar,
        registerRefresh,
        refreshMainDashboards,
        registerMainRefresh,
        currentDashboardPage,
        setCurrentDashboardPage,
        currentSidebarPage,
        setCurrentSidebarPage,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      "useDashboardContext must be used within DashboardProvider"
    );
  }
  return context;
}
