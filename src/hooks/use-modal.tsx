import { ModalContext, ModalState } from "@/components/modal/modal-provider";
import { useContext, useEffect } from "react";

const INITIAL_MODAL_STATE = { isMount: false, isOpen: false };

interface Props {
  key: string;
}

interface UseModalReturn {
  isShowModal: boolean;
  isOpenModal: boolean;
  openModal: (isOpen: boolean) => void;
  onCloseModal: () => void;
  modalStack: string[];
}

export function useModal({ key }: Props): UseModalReturn {
  const contextValue = useContext(ModalContext);
  if (!contextValue) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  const { modalState, setModalState, modalStack, setModalStack } = contextValue;

  const { isMount, isOpen } = modalState
    ? modalState[key] || INITIAL_MODAL_STATE
    : INITIAL_MODAL_STATE;

  const openModal = (isOpen: boolean) => {
    if (isOpen) {
      modalStack.push(key);
      setModalStack([...modalStack]);
      setModalState((prev) => {
        const newState: ModalState = {
          ...prev,
          [key]: {
            isMount: true,
            isOpen: true,
          },
        };

        if (modalStack.length > 1) {
          const prevStackKey = modalStack[modalStack.length - 2];
          newState[prevStackKey] = {
            isMount: true,
            isOpen: false,
          };
        }

        return newState;
      });
    } else {
      modalStack.pop();
      setModalStack([...modalStack]);
      setModalState((prev) => {
        const newState: ModalState = {
          ...prev,
          [key]: {
            isMount: true,
            isOpen: false,
          },
        };

        if (modalStack.length > 0) {
          const prevStackKey = modalStack[modalStack.length - 1];
          newState[prevStackKey] = {
            isMount: true,
            isOpen: true,
          };
        }

        return newState;
      });
    }
  };

  const onClose = () => {
    if (modalStack.includes(key)) {
      return;
    }

    setModalState((prev) => ({
      ...prev,
      [key]: {
        isMount: false,
        isOpen: false,
      },
    }));
  };

  useEffect(() => {
    document.body.style.overflow = isMount ? "hidden" : "auto";
  }, [isMount]);

  return {
    isShowModal: isMount,
    isOpenModal: isOpen,
    openModal,
    onCloseModal: onClose,
    modalStack,
  };
}
