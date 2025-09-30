import styles from "./chips.module.css";
import {
  PROGRESS_STATUS,
  StatusType,
} from "../../constants/chips/chip-progress-status";

interface ProgressChipsProps {
  size?: "small" | "large";
  status?: StatusType;
}

export default function ProgressChips({
  size = "small",
  status = PROGRESS_STATUS.TODO,
}: ProgressChipsProps) {
  const chipClasses = `${styles["progress"]} ${styles[`pg_${size}`]}`;

  return (
    <span className={chipClasses}>
      <span className={styles["dot"]}></span>
      <span className={styles["pg_label"]}>{status}</span>
    </span>
  );
}
