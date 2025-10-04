import styles from "./textarea.module.css";
import { TextareaHTMLAttributes } from "react";
import Typography from "@/components/typography/typography";

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
