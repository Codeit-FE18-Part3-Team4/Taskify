import { postDashboard } from "@/features/my-dashboard/api/";
import { Dashboard } from "@/types/my-dashboard";
import { useCallback, useState } from "react";

export function useDashboardForm() {
  const [dashboardValue, setDashboardValue] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const resetForm = useCallback(() => {
    setDashboardValue("");
    setColor("");
  }, []);

  const submitDashboard = useCallback(async (): Promise<Dashboard | null> => {
    if (!dashboardValue.trim()) {
      return null;
    }

    setIsSubmitting(true);
    try {
      const result = await postDashboard({
        title: dashboardValue,
        color: color,
      });

      if (result) {
        resetForm();
        return result;
      }
      return null;
    } catch (error) {
      console.error("Failed to create dashboard:", error);
      return null;
    } finally {
      setIsSubmitting(false);
    }
  }, [dashboardValue, color, resetForm]);

  return {
    dashboardValue,
    setDashboardValue,
    color,
    setColor,
    isSubmitting,
    submitDashboard,
    resetForm,
  };
}