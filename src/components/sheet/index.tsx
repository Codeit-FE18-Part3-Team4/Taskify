import Button, { ButtonSize, ButtonVariant } from "@/components/button/button";
import XmarkIcon from "@/components/icon/xmark-icon";
import Modal from "@/components/modal";
import Typography from "@/components/typography";
import { useResponsive } from "@/hooks/use-responsive";
import { useSheet } from "@/hooks/use-sheet";
import { classnames } from "@/utils/classnames";
import { MouseEventHandler, ReactNode, useMemo } from "react";
import styles from "./sheet.module.css";

export enum SheetActionType {
  Cancel = "취소",
  Create = "생성",
  Done = "완료",
  Update = "변경",
  Share = "공유",
}

interface SheetActionProps {
  type: SheetActionType;
  disabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

function SheetAction({ type, onClick, disabled }: SheetActionProps) {
  const { isMobile } = useResponsive();

  const buttonVariant = useMemo(() => {
    return {
      [SheetActionType.Cancel]: ButtonVariant.Secondary,
      [SheetActionType.Create]: ButtonVariant.Primary,
      [SheetActionType.Done]: ButtonVariant.Primary,
      [SheetActionType.Update]: ButtonVariant.Primary,
      [SheetActionType.Share]: ButtonVariant.Primary,
    }[type];
  }, [type]);

  const buttonSize = useMemo(() => {
    return isMobile ? ButtonSize.Medium : ButtonSize.Large;
  }, [isMobile]);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    onClick(event);
  };

  return (
    <Button
      variant={buttonVariant}
      size={buttonSize}
      isWidthFull
      onClick={handleClick}
      disabled={disabled}
    >
      {type}
    </Button>
  );
}

interface Props {
  sheetKey: string;
  title: string;
  actionType: SheetActionType;
  canSubmit?: boolean;
  children: ReactNode;
  onCancel?: () => void;
  onAction?: () => void;
  zIndex?: boolean;
}

export default function Sheet({
  sheetKey,
  title,
  actionType,
  canSubmit = true,
  children,
  onCancel,
  onAction,
  zIndex,
}: Props) {
  const { openSheet } = useSheet({ key: sheetKey });
  const { isMobile } = useResponsive();

  const titleTypography = useMemo(() => {
    return isMobile ? Typography.lg2SemiBold : Typography.xl2SemiBold;
  }, [isMobile]);

  const handleCancelClick = () => {
    openSheet(false);
    onCancel?.();
  };

  const handleActionClick = () => {
    onAction?.();
  };

  const handleCloseClick = () => {
    openSheet(false);
  };

  return (
    <Modal modalKey={sheetKey} zIndex={zIndex}>
      <div className={styles.sheet}>
        <div className={styles.header}>
          <h2 className={classnames(styles.title, titleTypography)}>{title}</h2>
          <button className={styles.closeButton} onClick={handleCloseClick}>
            <XmarkIcon />
          </button>
        </div>
        <form className={styles.form}>
          {children}
          <div className={styles.actions}>
            <SheetAction
              type={SheetActionType.Cancel}
              onClick={handleCancelClick}
            />
            <SheetAction
              type={actionType}
              onClick={handleActionClick}
              disabled={!canSubmit}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
}
