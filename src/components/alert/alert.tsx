import { useAlert } from "@/hooks/use-alert";
import { classnames } from "@/utils/classnames";
import { useMediaQuery } from "@uidotdev/usehooks";
import Modal from "../modal/modal";
import Typography from "../typography/typography";
import AlertAction, { AlertActionType } from "./alert-action";
import styles from "./alert.module.css";

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
  const isMobile = useMediaQuery("(max-width: 375px)");

  const handleCancelClick = () => {
    openAlert(false);
    onCancel?.();
  };

  const handleActionClick = () => {
    openAlert(false);
    onAction?.();
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
