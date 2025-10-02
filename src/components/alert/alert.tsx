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
}

export default function Alert({ title, message, alertKey }: Props) {
  const { openAlert } = useAlert({ key: alertKey });
  const isMobile = useMediaQuery("(max-width: 375px)");

  const handleClick = () => {
    openAlert(false);
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
            onClick={handleClick}
          >
            취소
          </Button>
          <Button
            variant={ButtonVariant.Delete}
            size={ButtonSize.Auto}
            onClick={handleClick}
          >
            확인
          </Button>
        </div>
      </div>
    </Modal>
  );
}
