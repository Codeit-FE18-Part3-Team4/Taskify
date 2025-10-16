import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export interface ModalState {
  [key: string]: {
    isMount: boolean;
    isOpen: boolean;
  };
}

interface ContextValue {
  modalState: ModalState | null;
  setModalState: Dispatch<SetStateAction<ModalState | null>>;
  modalStack: string[];
  setModalStack: Dispatch<SetStateAction<string[]>>;
}

export const ModalContext = createContext<ContextValue | null>(null);

interface Props {
  children: ReactNode;
}

export default function ModalProvider({ children }: Props) {
  const [modalState, setModalState] = useState<ModalState | null>(null);
  const [modalStack, setModalStack] = useState<string[]>([]);

  return (
    <ModalContext
      value={{ modalState, setModalState, modalStack, setModalStack }}
    >
      {children}
    </ModalContext>
  );
}
