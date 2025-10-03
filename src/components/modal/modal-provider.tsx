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
}

export const ModalContext = createContext<ContextValue | null>(null);

interface Props {
  children: ReactNode;
}

export default function ModalProvider({ children }: Props) {
  const [modalState, setModalState] = useState<ModalState | null>(null);

  return (
    <ModalContext value={{ modalState, setModalState }}>
      {children}
    </ModalContext>
  );
}
