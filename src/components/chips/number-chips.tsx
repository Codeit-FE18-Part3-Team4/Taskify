import styles from "./chips.module.css";

interface NumberChipsProps {
  number?: number;
}

export default function NumberChips({ number = 0 }: NumberChipsProps) {
  const chipClasses = `${styles["number"]}`;

  return <span className={chipClasses}>{number}</span>;
}
