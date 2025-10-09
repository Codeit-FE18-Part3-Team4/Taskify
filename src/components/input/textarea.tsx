import Typography from "@/components/typography";
import { TextareaHTMLAttributes } from "react";
import styles from "./textarea.module.css";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export default function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      className={`${styles.textarea} 
                  ${Typography.lgMedium} 
                  ${className ?? ""} `}
    />
  );
}
