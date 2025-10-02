import { useModal } from "@/hooks/use-modal";
import { classnames } from "@/utils/classnames";
import { ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";

interface Props {
  isOpen: boolean;
  children: ReactNode;
}

export default function Modal({ isOpen, children }: Props) {
  const { onClose } = useModal();

  const handleAnimationEnd = () => {
    if (isOpen) return;
    onClose();
  };

  const modal = (
    <div
      className={classnames(styles.modal, isOpen ? styles.open : styles.close)}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className={styles.content}>{children}</div>
    </div>
  );

  return createPortal(modal, document.getElementById("modal-root")!);
}
