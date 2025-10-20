import Modal from "@/components/modal";
import Typography from "@/components/typography";
import { useDialog } from "@/hooks/use-dialog";
import { useResponsive } from "@/hooks/use-responsive";
import { classnames } from "@/utils/classnames";
import { useMemo } from "react";
import Button, { ButtonSize, ButtonVariant } from "../button/button";
import styles from "./dialog.module.css";

interface Props {
  dialogKey: string;
  message: string;
  onConfirm?: () => void;
  zIndex?: boolean;
}

export default function Dialog({
  dialogKey,
  message,
  zIndex,
  onConfirm,
}: Props) {
  const { openDialog } = useDialog({ key: dialogKey });
  const { isMobile } = useResponsive();

  const messageTypography = useMemo(() => {
    return isMobile ? Typography.lgSemiBold : Typography.xlSemiBold;
  }, [isMobile]);

  const buttonSize = useMemo(() => {
    return isMobile ? ButtonSize.Medium : ButtonSize.Large;
  }, [isMobile]);

  const handleClick = () => {
    openDialog(false);
    onConfirm?.();
  };

  return (
    <Modal zIndex={zIndex} modalKey={dialogKey}>
      <div className={styles.dialog}>
        <p className={classnames(styles.message, messageTypography)}>
          {message}
        </p>
        <Button
          variant={ButtonVariant.Primary}
          size={buttonSize}
          isWidthFull
          onClick={handleClick}
        >
          확인
        </Button>
      </div>
    </Modal>
  );
}
