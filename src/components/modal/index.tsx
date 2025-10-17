import { useModal } from "@/hooks/use-modal";
import { classnames } from "@/utils/classnames";
import { MouseEvent, ReactNode, useRef } from "react";
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
  const { isOpenModal, openModal, onCloseModal, modalStack } = useModal({
    key: modalKey,
  });
  const modalRef = useRef<HTMLDivElement>(null);

  const isRootModal = modalStack.length === 0 || modalStack[0] === modalKey;

  function modalClassName() {
    const base = styles.modal;

    if (!isRootModal) {
      return classnames(base, styles.transparent);
    }

    let className;
    if (isOpenModal) {
      const modalNode = modalRef.current;
      const hadNestedModal = modalNode?.className.split(" ").includes("nested");
      className = hadNestedModal ? "nested" : styles.open;
    } else {
      const hasNestedModal = modalStack.length > 1;
      className = hasNestedModal ? "nested" : styles.close;
    }

    console.log(`Root modalClassName for ${modalKey} : ${className}`);

    return classnames(base, className);
  }

  function contentClassName() {
    const base = classnames(
      styles.content,
      isFullScreen ? styles.fullscreen : ""
    );

    if (isRootModal) {
      if (isOpenModal) {
        return base;
      } else {
        return modalStack.includes(modalKey)
          ? styles.closeWithoutAnimation
          : "";
      }
    }

    return classnames(base, isOpenModal ? styles.open : styles.close);
  }

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
      className={modalClassName()}
      onAnimationEnd={handleAnimationEnd}
      onClick={handleClick}
      ref={modalRef}
    >
      <div className={contentClassName()} onClick={handleContentClick}>
        {children}
      </div>
    </div>
  );

  return createPortal(modal, document.getElementById("modal-root")!);
}
