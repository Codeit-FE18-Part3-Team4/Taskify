import Modal from "@/components/modal";
import Typography from "@/components/typography";
import { ModalZIndex } from "@/constants/modal-z-index";
import { useAlert } from "@/hooks/use-alert";
import { useResponsive } from "@/hooks/use-responsive";
import { classnames } from "@/utils/classnames";
import { MouseEventHandler, useMemo } from "react";
import Button, { ButtonSize, ButtonVariant } from "../button/button";
import styles from "./alert.module.css";

export enum AlertActionType {
  Cancel = "취소",
  Delete = "삭제",
}

interface AlertActionProps {
  type: AlertActionType;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

function AlertAction({ type, onClick }: AlertActionProps) {
  const { isMobile } = useResponsive();

  const buttonVariant = useMemo(() => {
    return {
      [AlertActionType.Cancel]: ButtonVariant.Secondary,
      [AlertActionType.Delete]: ButtonVariant.Delete,
    }[type];
  }, [type]);

  const buttonSize = useMemo(() => {
    return isMobile ? ButtonSize.Medium : ButtonSize.Large;
  }, [isMobile]);

  return (
    <Button
      variant={buttonVariant}
      size={buttonSize}
      isWidthFull
      onClick={onClick}
    >
      {type}
    </Button>
  );
}

interface Props {
  title: string;
  alertKey: string;
  message: string;
  actionType: AlertActionType;
  onCancel?: () => void;
  onAction?: () => void;
}

export default function Alert({
  alertKey,
  title,
  message,
  actionType,
  onCancel,
  onAction,
}: Props) {
  const { openAlert } = useAlert({ key: alertKey });
  const { isMobile } = useResponsive();

  const titleTypography = useMemo(() => {
    return isMobile ? Typography.lg2SemiBold : Typography.xl2SemiBold;
  }, [isMobile]);

  const messageTypography = useMemo(() => {
    return isMobile ? Typography.lgMedium : Typography.xlMedium;
  }, [isMobile]);

  const handleCancelClick = () => {
    openAlert(false);
    onCancel?.();
  };

  const handleActionClick = () => {
    openAlert(false);
    onAction?.();
  };

  return (
    <Modal modalKey={alertKey} zIndex={ModalZIndex.Over}>
      <div className={styles.alert}>
        <div className={styles.header}>
          <h2 className={classnames(styles.title, titleTypography)}>{title}</h2>
          <p className={classnames(styles.message, messageTypography)}>
            {message}
          </p>
        </div>
        <div className={styles.action}>
          <AlertAction
            type={AlertActionType.Cancel}
            onClick={handleCancelClick}
          />
          <AlertAction type={actionType} onClick={handleActionClick} />
        </div>
      </div>
    </Modal>
  );
}
