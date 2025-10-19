import Button, { ButtonSize } from "@/components/button/button";
import styles from "./edit.module.css";
import { classnames } from "@/utils/classnames";
import Typography from "@/components/typography";
import ColorPalette from "@/components/color-palette/color-palette";
import { Dashboard } from "@/types/dashboard";
import { useState } from "react";
import Input from "@/components/input/input";
import { updateDashboard } from "@/features/my-dashboard/api";
import { ColorFrameSize } from "@/components/chips/color-frame/color-frame-size";
import Dialog from "@/components/dialog";
import { useDialog } from "@/hooks/use-dialog";

interface EditProps {
  dashboard: Dashboard;
  onUpdate: (message: string, status: boolean) => void | Promise<void>;
}

export default function Edit({ dashboard, onUpdate }: EditProps) {
  const [selectedColor, setSelectedColor] = useState(dashboard.color);
  const [dashboardTitle, setDashboardTitle] = useState(dashboard.title);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const UPDATE_BEFORE_CHECK = "UPDATE_BEFORE_CHECK";
  const { isShowDialog, openDialog } = useDialog({
    key: UPDATE_BEFORE_CHECK,
  });

  const handleSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDashboardTitle(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      dashboardTitle === dashboard.title &&
      selectedColor === dashboard.color
    ) {
      onUpdate("변경된 내용이 없습니다.", false);
      return;
    }

    setDialogMessage("변경사항을 저장하시겠습니까?");
    openDialog(true);
  };

  const confirmDialog = async () => {
    setIsSubmitting(true);

    try {
      await updateDashboard({
        dashboardId: dashboard.id,
        title: dashboardTitle,
        color: selectedColor,
      });

      await onUpdate("수정되었습니다.", true);
    } catch (e) {
      console.error("수정 실패:", e);
      onUpdate("수정에 실패했습니다.", false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.topContainer}>
      <form className={styles.formContents} onSubmit={handleSubmit}>
        <h3 className={classnames(Typography.xl3Bold, styles.title)}>
          대시보드 편집
        </h3>
        <div className={styles.inputWrapper}>
          <span className={Typography.lgSemiBold}>이름</span>
          <Input
            className={styles.textInput}
            value={dashboardTitle}
            onChange={handleTitleChange}
          />
        </div>
        <div className={styles.inputWrapper}>
          <span className={Typography.lgSemiBold}>색상</span>
          <ColorPalette
            onSelect={(color) => handleSelect(color)}
            selectedColor={selectedColor}
            size={ColorFrameSize.Large}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <Button size={ButtonSize.Large} disabled={isSubmitting}>
            변경
          </Button>
        </div>
      </form>

      {isShowDialog && (
        <Dialog
          dialogKey={UPDATE_BEFORE_CHECK}
          message={dialogMessage}
          onConfirm={confirmDialog}
        />
      )}
    </div>
  );
}
