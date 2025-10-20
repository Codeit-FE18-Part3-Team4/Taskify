import { useDashboardContext } from "@/features/my-dashboard/dashboard-provider";
import { useDashboardForm } from "@/hooks/use-dashboard-form";
import { useDialog } from "@/hooks/use-dialog";
import { useSheet } from "@/hooks/use-sheet";
import { useEffect, useState } from "react";
import { ColorFrameSize } from "../chips/color-frame/color-frame-size";
import ColorPalette from "../color-palette/color-palette";
import Dialog from "../dialog";
import Input, { InputSize } from "../input/input";
import Sheet, { SheetActionType } from "../sheet";
import SheetSection from "../sheet/sheet-section";

const SHEET_KEY = "SHEET_DASHBOARD_ADD";
const DIALOG_KEY = "MY_DASHBOARD_DIALOG";

export default function CreateDashboardSheet({ zIndex }: { zIndex?: boolean }) {
  const {
    dashboardValue,
    setDashboardValue,
    color,
    setColor,
    submitDashboard,
  } = useDashboardForm();
  const { refreshSidebar, refreshMainDashboards } = useDashboardContext();
  const [dialogMessage, setDialogMessage] = useState<string>("");
  const [isSubmitEnabled, setIsSubmitEnabled] = useState<boolean>(false);

  const { isShowSheet, openSheet } = useSheet({
    key: SHEET_KEY,
  });
  const { isShowDialog, openDialog } = useDialog({
    key: DIALOG_KEY,
  });

  useEffect(() => {
    if (dashboardValue !== "" && color !== "") {
      setIsSubmitEnabled(true);
    } else {
      setIsSubmitEnabled(false);
    }
  }, [dashboardValue, color]);

  const handleSubmit = async () => {
    try {
      const result = await submitDashboard();
      if (result) {
        refreshSidebar();
        refreshMainDashboards();
        openSheet(false);
      }
    } catch (e) {
      console.error(e);
      setDialogMessage("대시보드 생성 중 오류가 발생했습니다");
      openDialog(true);
    }
  };

  const handleCancelSubmit = () => {
    setColor("");
    setDashboardValue("");
  };

  return (
    <>
      {isShowSheet && (
        <Sheet
          sheetKey={SHEET_KEY}
          title="새 대시보드 생성"
          actionType={SheetActionType.Create}
          onCancel={handleCancelSubmit}
          onAction={handleSubmit}
          zIndex={zIndex}
          canSubmit={isSubmitEnabled}
        >
          <SheetSection title="대시보드 이름">
            <Input
              value={dashboardValue}
              onChange={(e) => setDashboardValue(e.target.value)}
              $size={InputSize.Auto}
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
      {isShowDialog && (
        <Dialog dialogKey={DIALOG_KEY} message={dialogMessage} />
      )}
    </>
  );
}
