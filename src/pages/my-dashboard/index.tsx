import { ColorFrameSize } from "@/components/chips/color-frame/color-frame-size";
import ColorPalette from "@/components/color-palette/color-palette";
import DashboardSideBar from "@/components/dashboard-side-bar/dashboard-side-bar";
import Input, { InputSize } from "@/components/input/input";
import Sheet, { SheetActionType } from "@/components/sheet";
import SheetSection from "@/components/sheet/sheet-section";
import { getDashboards } from "@/features/my-dashboard/api/get-dashboards";
import { getUserInfo } from "@/features/my-dashboard/api/get-user-info";
import { postDashboard } from "@/features/my-dashboard/api/post-dashboard";
import { useSheet } from "@/hooks/use-sheet";
import { useSsrResponsive } from "@/hooks/use-ssr-responsive";
import { useCallback, useEffect, useState } from "react";
import MyDashboardMain from "./my-dashboard-main";
import styles from "./my-dashboard.module.css";

export default function MyDashboard() {
  const [dashboards, setDashboards] = useState<any[]>([]);
  const [userInfo, setUserInfo] = useState<any[]>([]);
  const [dashboardValue, setDashboardValue] = useState<string>("");
  const [color, setColor] = useState<string>("");

  const SHEET_KEY = "SHEET_DASHBOARD_ADD";
  const { isShowSheet, openSheet } = useSheet({
    key: SHEET_KEY,
  });

  const handleSubmit = async () => {
    try {
      const result = await postDashboard({
        title: dashboardValue,
        color: color,
      });

      if (result) {
        setDashboards((prev) => [result, ...prev]);
        setDashboardValue("");
        setColor("");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const loadDashboards = useCallback(async () => {
    try {
      const { dashboards } = await getDashboards();
      const sortedDashboards = dashboards.sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setDashboards(sortedDashboards);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const loadUserInfo = useCallback(async () => {
    try {
      const user = await getUserInfo();
      setUserInfo(user);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    loadDashboards();
    loadUserInfo();
  }, [loadDashboards, loadUserInfo]);

  const { isMobile } = useSsrResponsive();

  return (
    <div className={styles.myDashboardWrap}>
      {!isMobile && (
        <DashboardSideBar
          onClick={() => openSheet(true)}
          dashboards={dashboards}
          user={userInfo}
        />
      )}
      <MyDashboardMain
        onClick={() => openSheet(true)}
        dashboards={dashboards}
        reDashboards={loadDashboards}
      />
      {isShowSheet && (
        <Sheet
          sheetKey={SHEET_KEY}
          title="새 대시보드 생성"
          actionType={SheetActionType.Create}
          onCancel={() => console.log("Sheet cancelled")}
          onAction={handleSubmit}
        >
          <SheetSection title="대시보드 이름">
            <Input
              value={dashboardValue}
              onChange={(e) => setDashboardValue(e.target.value)}
              size={InputSize.Auto}
              placeholder="새로운 대시보드"
            />
          </SheetSection>
          <SheetSection title="색상">
            <ColorPalette
              selectedColor={color}
              onSelect={setColor}
              size={ColorFrameSize.XSmall}
            />
          </SheetSection>
        </Sheet>
      )}
    </div>
  );
}
