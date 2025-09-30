import styles from "./chips.module.css";
import React, { MouseEvent } from "react";

interface AddChipsProps {
  size?: "small" | "large";
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function AddChips({ size = "small", onClick }: AddChipsProps) {
  const chipClasses = `${styles["add"]} ${styles[`ad_${size}`]}`;

  return (
    <button className={chipClasses} onClick={onClick}>
      +
    </button>
  );
}
