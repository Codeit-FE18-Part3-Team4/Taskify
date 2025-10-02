import { useState } from "react";

export function useModal() {
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

  return { isMount, isOpen, openModal, onClose };
}
