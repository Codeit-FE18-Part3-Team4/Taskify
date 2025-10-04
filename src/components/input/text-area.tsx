import styles from "./text-area.module.css";
import { ChangeEvent, FocusEvent } from "react";
import Typography from "@/components/typography/typography";

interface TextAreaProps {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export default function TextArea({
  value,
  onChange,
  onBlur,
  placeholder,
  disabled,
  className,
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
                  ${className ?? ""} `}
    />
  );
}
