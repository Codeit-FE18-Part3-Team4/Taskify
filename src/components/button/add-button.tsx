import Image from "next/image";
import styles from "./add-button.module.css";

type AddButtonProps = {
  children?: string;
  rightIcon?: string;
  variant?: "nomal" | "dashboard" | "delete";
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

/**
 * 컬럼, 투두, 대시보드 추가 / 삭제 버튼
 */
export default function AddButton({
  children,
  rightIcon,
  variant = "nomal",
  onClick,
}: AddButtonProps) {
  const columnButton = children ? "" : styles.TodoButton;

  return (
    <button
      className={`${styles.button} ${columnButton} ${styles[variant]}`}
      onClick={onClick}
    >
      {children && <span className={styles.span}>{children}</span>}
      {rightIcon && (
        <div className={ styles.iconBtn }>
          <Image
            src={rightIcon}
            width={20}
            height={20}
            alt="button icon"
            className={styles.icon}
          />
        </div>
      )}
    </button>
  );
}
