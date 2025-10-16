import { createContext, ReactNode, useCallback, useContext, useState } from "react";

interface DashboardContextType {
  refreshSidebar: () => void;
  registerRefresh: (fn: () => void) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [refreshFn, setRefreshFn] = useState<(() => void) | null>(null);

  const registerRefresh = useCallback((fn: () => void) => {
    setRefreshFn(() => fn);
  }, []);

  const refreshSidebar = useCallback(() => {
    if (refreshFn) {
      refreshFn();
    }
  }, [refreshFn]);

  return (
    <DashboardContext.Provider value={{ refreshSidebar, registerRefresh }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboardContext must be used within DashboardProvider");
  }
  return context;
}