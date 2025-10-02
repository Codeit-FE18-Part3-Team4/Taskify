import { ModalContext } from "@/components/modal/modal-provider";
import { useContext } from "react";

export function useModal() {
  const { isMount, isOpen, openModal, onClose } = useContext(ModalContext);
  return { isShowModal: isMount, isOpen, openModal, onClose };
}
