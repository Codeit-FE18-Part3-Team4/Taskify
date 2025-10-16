import { useModal } from "@/hooks/use-modal";
import { classnames } from "@/utils/classnames";
import { MouseEvent, ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";

interface Props {
  modalKey: string;
  isFullScreen?: boolean;
  children: ReactNode;
}

export default function Modal({
  modalKey,
  isFullScreen = false,
  children,
}: Props) {
  const { isOpenModal, openModal, onCloseModal } = useModal({ key: modalKey });

  const handleAnimationEnd = () => {
    if (isOpenModal) return;
    onCloseModal();
  };

  const handleClick = () => {
    openModal(false);
  };

  const handleContentClick = (event: MouseEvent) => {
    event.stopPropagation();
  };

  const modal = (
    <div
      className={classnames(
        styles.modal,
        isOpenModal ? styles.open : styles.close
      )}
      onAnimationEnd={handleAnimationEnd}
      onClick={handleClick}
    >
      <div
        className={classnames(
          styles.content,
          isFullScreen ? styles.fullscreen : ""
        )}
        onClick={handleContentClick}
      >
        {children}
      </div>
    </div>
  );

  return createPortal(modal, document.getElementById("modal-root")!);
}
