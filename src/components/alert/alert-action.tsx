import { useResponsive } from "@/hooks/ues-responsive";
import { MouseEventHandler, useMemo } from "react";
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
  const { isMobile } = useResponsive();

  const buttonSize = useMemo(() => {
    return isMobile ? ButtonSize.Medium : ButtonSize.Large;
  }, [isMobile]);

  return (
    <Button
      variant={VARIENT[type]}
      size={buttonSize}
      isWidthFull
      onClick={onClick}
    >
      {type}
    </Button>
  );
}
