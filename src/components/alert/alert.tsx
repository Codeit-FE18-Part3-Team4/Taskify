import { useAlert } from "@/hooks/use-alert";
import { classnames } from "@/utils/classnames";
import { useMediaQuery } from "@uidotdev/usehooks";
import Button, { ButtonSize, ButtonVariant } from "../button/button";
import Modal from "../modal/modal";
import Typography from "../typography/typography";
import styles from "./alert.module.css";

interface Props {
  title: string;
  alertKey: string;
  message: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}

export default function Alert({
  alertKey,
  title,
  message,
  onCancel,
  onConfirm,
}: Props) {
  const { openAlert } = useAlert({ key: alertKey });
  const isMobile = useMediaQuery("(max-width: 375px)");

  const handleCancelClick = () => {
    openAlert(false);
    onCancel?.();
  };

  const handleConfirmClick = () => {
    openAlert(false);
    onConfirm?.();
  };

  return (
    <Modal modalKey={alertKey}>
      <div className={styles.alert}>
        <div className={styles.header}>
          <h2
            className={classnames(
              styles.title,
              isMobile ? Typography.lg2SemiBold : Typography.xl2SemiBold
            )}
          >
            {title}
          </h2>
          <p
            className={classnames(
              styles.message,
              isMobile ? Typography.lgMedium : Typography.xlMedium
            )}
          >
            {message}
          </p>
        </div>
        <div className={styles.action}>
          <Button
            variant={ButtonVariant.Secondary}
            size={ButtonSize.Auto}
            onClick={handleCancelClick}
          >
            취소
          </Button>
          <Button
            variant={ButtonVariant.Delete}
            size={ButtonSize.Auto}
            onClick={handleConfirmClick}
          >
            확인
          </Button>
        </div>
      </div>
    </Modal>
  );
}
