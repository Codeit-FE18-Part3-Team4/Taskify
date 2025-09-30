import styles from "./base-button.module.css";

/**
 * nomal = 기본 버튼
 * cancel = 취소 버튼
 * action = 거절, 삭제, 입력 버튼
 */

type ButtonProps = {
  children: string;
  disabled?: boolean;
  width?: string | number;
  height?: string | number;
  textColor?: string;
  variant?: "nomal" | "cancel" | "action";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function BaseButton({
  children,
  disabled,
  onClick,
  width,
  height,
  textColor,
  variant = "nomal",
}: ButtonProps) {
  const disabledButton = disabled === false ? styles.disabled : "";

  return (
    <button
      className={`${styles.button} ${disabledButton} ${styles[variant]}`}
      disabled={disabled}
      onClick={onClick}
      style={{ width, height, color: textColor }}
    >
      {children}
    </button>
  );
}
