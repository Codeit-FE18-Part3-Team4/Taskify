import Typography from "@/components/typography/typography";
import { useDialog } from "@/hooks/use-dialog";
import { classnames } from "@/utils/classnames";
import Button, { ButtonSize, ButtonVariant } from "../button/button";
import Modal from "../modal/modal";
import styles from "./dialog.module.css";

interface Props {
  dialogKey: string;
  message: string;
}

export default function Dialog({ message, dialogKey }: Props) {
  const { openDialog } = useDialog({ key: dialogKey });

  const handleClick = () => {
    openDialog(false);
  };

  return (
    <Modal modalKey={dialogKey}>
      <div className={styles.dialog}>
        <p className={classnames(styles.message, Typography.xlSemiBold)}>
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
