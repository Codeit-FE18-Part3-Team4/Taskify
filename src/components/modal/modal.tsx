import { useModal } from "@/hooks/use-modal";
import { classnames } from "@/utils/classnames";
import { MouseEvent, ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";

interface Props {
  isOpen: boolean;
  children: ReactNode;
}

export default function Modal({ isOpen, children }: Props) {
  const { openModal, onClose } = useModal();

  const handleAnimationEnd = () => {
    if (isOpen) return;
    onClose();
  };

  const handleClick = () => {
    openModal(false);
  };

  const handleContentClick = (event: MouseEvent) => {
    event.stopPropagation();
  };

  const modal = (
    <div
      className={classnames(styles.modal, isOpen ? styles.open : styles.close)}
      onAnimationEnd={handleAnimationEnd}
      onClick={handleClick}
    >
      <div className={styles.content} onClick={handleContentClick}>
        {children}
      </div>
    </div>
  );

  return createPortal(modal, document.getElementById("modal-root")!);
}
