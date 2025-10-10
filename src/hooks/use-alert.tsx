import { useModal } from "./use-modal";

interface Props {
  key: string;
}

export function useAlert({ key }: Props) {
  const { isShowModal, isOpenModal, openModal, onCloseModal } = useModal({
    key,
  });

  return {
    isShowAlert: isShowModal,
    isOpenAlert: isOpenModal,
    openAlert: openModal,
    onCloseAlert: onCloseModal,
  };
}
