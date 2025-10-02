import { ModalContext } from "@/components/modal/modal-provider";
import { useContext } from "react";

const INITIAL_MODAL_STATE = { isMount: false, isOpen: false };

interface Props {
  key: string;
}

export function useModal({ key }: Props) {
  const contextValue = useContext(ModalContext);
  if (!contextValue) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  const { modalState, setModalState } = contextValue;

  const { isMount, isOpen } = modalState
    ? modalState[key] || INITIAL_MODAL_STATE
    : INITIAL_MODAL_STATE;

  const openModal = (isOpen: boolean) => {
    if (isOpen) {
      setModalState((prev) => ({
        ...prev,
        [key]: {
          isMount: true,
          isOpen: true,
        },
      }));
    } else {
      setModalState((prev) => ({
        ...prev,
        [key]: {
          isMount: true,
          isOpen: false,
        },
      }));
    }
  };

  const onClose = () => {
    setModalState((prev) => ({
      ...prev,
      [key]: {
        isMount: false,
        isOpen: false,
      },
    }));
  };

  return {
    isShowModal: isMount,
    isOpenModal: isOpen,
    openModal,
    onCloseModal: onClose,
  };
}
