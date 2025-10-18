import { InputHTMLAttributes } from "react";
import styles from "./checkbox.module.css";

export default function Checkbox({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      type="checkbox"
      className={`${styles.checkbox}  ${className ?? ""}`}
    />
  );
}
