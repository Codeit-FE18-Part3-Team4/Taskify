import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import styles from "./icon-button.module.css";

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    PropsWithChildren {
  size?: number;
}

export default function IconButton({ size = 24, children, ...props }: Props) {
  return (
    <button
      className={styles.button}
      style={{ width: size, height: size }}
      {...props}
    >
      {children}
    </button>
  );
}
