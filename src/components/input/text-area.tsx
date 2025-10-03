import styles from "./text-area.module.css";
import { ChangeEvent, FocusEvent } from "react";
import Typography from "@/components/typography/typography";

export enum TextAreaSize {
  PC = "pc",
  Mobile = "mobile",
  Auto = "auto",
}

interface TextAreaProps {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  size?: TextAreaSize;
}

export default function TextArea({
  value,
  onChange,
  onBlur,
  placeholder,
  disabled,
  className,
  size = TextAreaSize.PC,
}: TextAreaProps) {
  return (
    <textarea
      disabled={disabled}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      className={`${styles.textarea} 
                  ${Typography.lgMedium} 
                  ${styles[size]} 
                  ${className ?? ""} `}
    />
  );
}
