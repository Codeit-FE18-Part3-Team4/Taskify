import Modal from "@/components/modal";
import Typography from "@/components/typography";
import { ModalZIndex } from "@/constants/modal-z-index";
import { useDialog } from "@/hooks/use-dialog";
import { classnames } from "@/utils/classnames";
import { useMemo } from "react";
import Button, { ButtonSize, ButtonVariant } from "../button/button";
import styles from "./dialog.module.css";
import { useSsrResponsive } from "@/hooks/use-ssr-responsive";

interface Props {
  dialogKey: string;
  message: string;
  onConfirm?: () => void;
  zIndex?: boolean;
}

export default function Dialog({ dialogKey, message, onConfirm }: Props) {
  const { openDialog } = useDialog({ key: dialogKey });
  const { isMobile } = useSsrResponsive();

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
    <Modal modalKey={dialogKey} zIndex={ModalZIndex.Over}>
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
