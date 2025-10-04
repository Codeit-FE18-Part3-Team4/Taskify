import Typography from "@/components/typography";
import { TextareaHTMLAttributes } from "react";
import styles from "./text-area.module.css";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export default function TextArea({ className, ...props }: TextAreaProps) {
  return (
    <textarea
      {...props}
      className={`${styles.textarea} 
                  ${Typography.lgMedium} 
                  ${className ?? ""} `}
    />
  );
}
