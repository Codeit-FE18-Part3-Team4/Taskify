import { useDashboardForm } from "@/hooks/use-dashboard-form";
import { useSheet } from "@/hooks/use-sheet";
import { useDashboardContext } from "@/pages/my-dashboard/dashboard-provider";
import { ColorFrameSize } from "../chips/color-frame/color-frame-size";
import ColorPalette from "../color-palette/color-palette";
import Input, { InputSize } from "../input/input";
import Sheet, { SheetActionType } from "../sheet";
import SheetSection from "../sheet/sheet-section";

const SHEET_KEY = "SHEET_DASHBOARD_ADD";

export default function CreateDashboardSheet() {
  const {
    dashboardValue,
    setDashboardValue,
    color,
    setColor,
    submitDashboard,
  } = useDashboardForm();
  const { refreshSidebar, refreshMainDashboards } = useDashboardContext();

  const { isShowSheet, openSheet } = useSheet({
    key: SHEET_KEY,
  });

  const handleSubmit = async () => {
    const result = await submitDashboard();
    if (result) {
      refreshSidebar();
      refreshMainDashboards();
    }
    openSheet(false);
  };

  return (
    <>
      {isShowSheet && (
        <Sheet
          sheetKey={SHEET_KEY}
          title="새 대시보드 생성"
          actionType={SheetActionType.Create}
          onCancel={() => {}}
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
    </>
  );
}
