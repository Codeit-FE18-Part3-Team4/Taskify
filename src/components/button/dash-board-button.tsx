import Image from "next/image";
import styles from "./dash-board-button.module.css";

type DashBoardButton = {
  children: string;
  rightIcon?: string;
  crown?: boolean;
  dotColor?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

/**
 * 대시보드 카드 버튼
 */
export default function DashBoardButton({
  children,
  rightIcon,
  crown,
  dotColor,
  onClick,
}: DashBoardButton) {
  return (
    <button className={styles.button} onClick={onClick}>
      <div style={{ backgroundColor: dotColor }} className={styles.dot}></div>
      <span>
        {children}
        {crown && (
          <Image
            src={"/"}
            width={20}
            height={16}
            alt="crown icon"
            className={styles.crown_icon}
          />
        )}
      </span>
      {rightIcon && (
        <Image
          src={rightIcon}
          width={18}
          height={18}
          alt="button icon"
          className={styles.icon}
        />
      )}
    </button>
  );
}
