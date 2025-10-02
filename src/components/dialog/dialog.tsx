import Typography from "@/components/typography/typography";
import { useDialog } from "@/hooks/use-dialog";
import { classnames } from "@/utils/classnames";
import { useMediaQuery } from "@uidotdev/usehooks";
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
  const isMobile = useMediaQuery("(max-width: 375px)");

  const handleClick = () => {
    openDialog(false);
    onConfirm?.();
  };

  return (
    <Modal modalKey={dialogKey}>
      <div className={styles.dialog}>
        <p
          className={classnames(
            styles.message,
            isMobile ? Typography.lgSemiBold : Typography.xlSemiBold
          )}
        >
          {message}
        </p>
        <Button
          variant={ButtonVariant.Primary}
          size={ButtonSize.Auto}
          onClick={handleClick}
        >
          확인
        </Button>
      </div>
    </Modal>
  );
}
