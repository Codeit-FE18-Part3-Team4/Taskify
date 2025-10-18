import Typography from "@/components/typography";
import { TextareaHTMLAttributes } from "react";
import styles from "./textarea.module.css";

export enum TextareaSize {
  Large = "lg",
  Medium = "md",
  Auto = "auto",
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: TextareaSize;
}

export default function Textarea({
  size = TextareaSize.Auto,
  className,
  ...props
}: TextareaProps) {
  return (
    <textarea
      {...props}
      className={`${styles.textarea}
                  ${styles[size]} 
                  ${Typography.lgMedium160} 
                  ${className ?? ""} `}
    />
  );
}
