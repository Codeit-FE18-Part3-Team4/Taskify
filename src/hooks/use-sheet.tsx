import { useModal } from "./use-modal";

interface Props {
  key: string;
}

export function useSheet({ key }: Props) {
  const { isShowModal, isOpenModal, openModal, onCloseModal } = useModal({
    key,
  });

  return {
    isShowSheet: isShowModal,
    isOpenSheet: isOpenModal,
    openSheet: openModal,
    onCloseSheet: onCloseModal,
  };
}
