import { ModalContext } from "@/components/modal/modal-provider";
import { useContext } from "react";

export function useModal() {
  return useContext(ModalContext);
}
