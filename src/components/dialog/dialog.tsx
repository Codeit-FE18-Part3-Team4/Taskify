import Typography from "@/components/typography/typography";
import { useResponsive } from "@/hooks/ues-responsive";
import { useDialog } from "@/hooks/use-dialog";
import { classnames } from "@/utils/classnames";
import { useMemo } from "react";
import Button, { ButtonSize, ButtonVariant } from "../button/button";
import Modal from "../modal/modal";
import styles from "./dialog.module.css";

interface Props {
  dialogKey: string;
  message: string;
  onConfirm?: () => void;
}

export default function Dialog({ dialogKey, message, onConfirm }: Props) {
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
    <Modal modalKey={dialogKey}>
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
