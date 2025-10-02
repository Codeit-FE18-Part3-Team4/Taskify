import { MouseEventHandler } from "react";
import Button, { ButtonSize, ButtonVariant } from "../button/button";

export enum AlertActionType {
  Cancel = "취소",
  Delete = "삭제",
}

const VARIENT = {
  [AlertActionType.Cancel]: ButtonVariant.Secondary,
  [AlertActionType.Delete]: ButtonVariant.Delete,
};

interface Props {
  type: AlertActionType;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function AlertAction({ type, onClick }: Props) {
  return (
    <Button variant={VARIENT[type]} size={ButtonSize.Auto} onClick={onClick}>
      {type}
    </Button>
  );
}
