import { ColorFrameSize } from "@/components/chips/color-frame/color-frame-size";
import ColorPalette from "@/components/color-palette/color-palette";
import DashboardSideBar from "@/components/dashboard-side-bar/dashboard-side-bar";
import Input, { InputSize } from "@/components/input/input";
import Sheet, { SheetActionType } from "@/components/sheet";
import SheetSection from "@/components/sheet/sheet-section";
import {
  getDashboards,
  getUserInfo,
  postDashboard,
} from "@/features/my-dashboard/api/";
import { useSheet } from "@/hooks/use-sheet";
import { useSsrResponsive } from "@/hooks/use-ssr-responsive";
import { Dashboard, UserInfo } from "@/types/my-dashboard";
import { useCallback, useEffect, useState } from "react";
import MyDashboardMain from "./my-dashboard-main";
import styles from "./my-dashboard.module.css";

export default function MyDashboard() {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [allDashboards, setAllDashboards] = useState<Dashboard[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
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
        setAllDashboards((prev) => [result, ...prev]);
        setCurrentPage(1);
        setDashboardValue("");
        setColor("");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const load = useCallback(async (page: number = 1) => {
    try {
      const [dashboardsRes, allDashboardsRes, userRes] = await Promise.all([
        getDashboards({ page, size: 10 }),
        getDashboards({ page : 1, size: 1000 }),
        getUserInfo(),
      ]);

      const sortedDashboards = allDashboardsRes.dashboards.sort(
        (a: Dashboard, b: Dashboard) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setDashboards(dashboardsRes.dashboards);
      setTotalCount(dashboardsRes.totalCount);
      setAllDashboards(sortedDashboards);
      setUserInfo(userRes);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    load(currentPage);
  }, [currentPage, load]);

  const { isMobile } = useSsrResponsive();

  return (
    <div className={styles.myDashboardWrap}>
      {!isMobile && userInfo && (
        <DashboardSideBar
          onClick={() => openSheet(true)}
          dashboards={dashboards}
          user={userInfo}
          currentPage={currentPage}
          totalCount={totalCount}
          onPageChange={setCurrentPage}
        />
      )}
      <MyDashboardMain
        onClick={() => openSheet(true)}
        dashboards={allDashboards}
        reLoad={load}
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
