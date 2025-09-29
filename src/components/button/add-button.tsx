import Image from "next/image";
import styles from "./add-button.module.css";

type AddButtonProps = {
  children?: string;
  icon?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

// 컬럼 추가, 투두 추가 버튼
export default function AddButton({ children, icon, onClick }: AddButtonProps) {
  const columnButton = children ? "" : styles.TodoButton;

  return (
    <button className={`${styles.button} ${columnButton}`} onClick={onClick}>
      {children && <span className={styles.span}>{children}</span>}
      {icon && (
        <Image
          src={icon}
          width={20}
          height={20}
          alt="button icon"
          className={styles.icon}
        />
      )}
    </button>
  );
}
