import { ColorFrameSize } from "@/components/chips/color-frame/color-frame-size";
import ColorPalette from "@/components/color-palette/color-palette";
import DashboardSideBar from "@/components/dashboard-side-bar/dashboard-side-bar";
import Input, { InputSize } from "@/components/input/input";
import Sheet, { SheetActionType } from "@/components/sheet";
import SheetSection from "@/components/sheet/sheet-section";
import { useAllDashboards } from "@/hooks/use-all-dashboards";
import { useDashboardForm } from "@/hooks/use-dashboard-form";
import { useSheet } from "@/hooks/use-sheet";
import { useSsrResponsive } from "@/hooks/use-ssr-responsive";
import { useDashboardContext } from "./dashboard-provider";
import MyDashboardMain from "./my-dashboard-main";
import styles from "./my-dashboard.module.css";

export default function MyDashboard() {
  const { allDashboards, addDashboard, refreshDashboards } = useAllDashboards();
  const {
    dashboardValue,
    setDashboardValue,
    color,
    setColor,
    submitDashboard,
  } = useDashboardForm();
  const { refreshSidebar } = useDashboardContext();

  const SHEET_KEY = "SHEET_DASHBOARD_ADD";
  const { isShowSheet, openSheet } = useSheet({
    key: SHEET_KEY,
  });

  const handleSubmit = async () => {
    const result = await submitDashboard();
    if (result) {
      addDashboard(result);
      refreshSidebar();
      refreshDashboards();
    }
  };

  const { isMobile } = useSsrResponsive();

  return (
    <div className={styles.myDashboardWrap}>
      {!isMobile && <DashboardSideBar onClick={() => openSheet(true)} />}
      <MyDashboardMain
        onClick={() => openSheet(true)}
        dashboards={allDashboards}
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
