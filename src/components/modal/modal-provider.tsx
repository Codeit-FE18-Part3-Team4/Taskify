import { createContext, ReactNode, useState } from "react";

interface ModalState {
  isMount: boolean;
  isOpen: boolean;
  openModal: (isOpen: boolean) => void;
  onClose: () => void;
}

const INITIAL_STATE: ModalState = {
  isMount: false,
  isOpen: false,
  openModal: () => {},
  onClose: () => {},
};

export const ModalContext = createContext<ModalState>(INITIAL_STATE);

interface Props {
  children: ReactNode;
}

export default function ModalProvider({ children }: Props) {
  const [isMount, setMount] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const openModal = (isOpen: boolean) => {
    if (isOpen) {
      setMount(true);
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const onClose = () => {
    setMount(false);
  };

  return (
    <ModalContext value={{ isMount, isOpen, openModal, onClose }}>
      {children}
    </ModalContext>
  );
}
