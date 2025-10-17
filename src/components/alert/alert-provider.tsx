import { createContext, ReactNode, useContext, useState } from "react";

export type AlertType = "success" | "error" | "info";

export interface AlertItem {
  key: string;
  message: string;
  type: AlertType;
}

interface AlertContextValue {
  alerts: AlertItem[];
  showAlert: (message: string, type?: AlertType) => void;
  removeAlert: (key: string) => void;
}

export const AlertContext = createContext<AlertContextValue | null>(null);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  const showAlert = (message: string, type: AlertType = "info") => {
    const key = `${Date.now()}-${Math.random()}`;
    setAlerts((prev) => [...prev, { key, message, type }]);
  };

  const removeAlert = (key: string) => {
    setAlerts((prev) => prev.filter((a) => a.key !== key));
  };

  return (
    <AlertContext.Provider value={{ alerts, showAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

export const useAlert = () => {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error("useAlert must be used within <AlertProvider>");
  return ctx;
};
