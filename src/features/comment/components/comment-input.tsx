import Button, { ButtonSize, ButtonVariant } from "@/components/button/button";
import Profile from "@/components/profile/profile";
import { ProfileSize } from "@/components/profile/profile-size";
import Typography from "@/components/typography";
import { useBackdropClick } from "@/hooks/use-backdrop-unmount";
import { classnames } from "@/utils/classnames";
import { ChangeEvent, MouseEvent, useRef, useState } from "react";
import styles from "./comment-input.module.css";

interface Props {
  authorName: string;
  onSubmit?: (value: string) => void;
}

export default function CommentInput({ authorName, onSubmit }: Props) {
  const [isEditing, setEditing] = useState(false);
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const reset = () => {
    setValue("");
    setEditing(false);
    textareaRef.current!.style.height = "auto";
  };

  const targetRef = useBackdropClick<HTMLDivElement>({
    callback: reset,
  });

  const handleClick = () => {
    textareaRef.current?.focus();
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current!;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
    setValue(event.target.value);
  };

  const handleFocus = () => {
    setEditing(true);
  };

  const handleCancelClick = (event: MouseEvent) => {
    event.stopPropagation();
    reset();
  };

  const handleSubmitClick = (event: MouseEvent) => {
    event.stopPropagation();
    onSubmit?.(value);
    reset();
  };

  return (
    <div className={styles.container} ref={targetRef}>
      {isEditing || (
        <Profile size={ProfileSize.Large} name={authorName.slice(1)} />
      )}
      <div
        className={classnames(styles.input, isEditing ? styles.editing : "")}
        onClick={handleClick}
      >
        <textarea
          className={classnames(styles.textarea, Typography.lgMedium)}
          placeholder="댓글을 남겨보세요"
          value={value}
          rows={1}
          onChange={handleChange}
          onFocus={handleFocus}
          ref={textareaRef}
        />
        {isEditing && (
          <div className={styles.actions}>
            <Button
              variant={ButtonVariant.Secondary}
              size={ButtonSize.Small}
              onClick={handleCancelClick}
            >
              취소
            </Button>
            <Button
              size={ButtonSize.Small}
              disabled={value.length === 0}
              onClick={handleSubmitClick}
            >
              등록
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
