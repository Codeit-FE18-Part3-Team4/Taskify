import { useModal } from "./use-modal";

interface Props {
  key: string;
}

export function useDialog({ key }: Props) {
  const { isShowModal, isOpenModal, openModal, onCloseModal } = useModal({
    key,
  });

  return {
    isShowDialog: isShowModal,
    isOpenDialog: isOpenModal,
    openDialog: openModal,
    onCloseDialog: onCloseModal,
  };
}
