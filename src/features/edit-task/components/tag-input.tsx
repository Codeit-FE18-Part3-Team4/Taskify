import Badge from "@/components/chips/badge";
import Typography from "@/components/typography";
import { useBackdropClick } from "@/hooks/use-backdrop-unmount";
import { classnames } from "@/utils/classnames";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import styles from "./tag-input.module.css";

function TagList({ tags }: { tags: string[] }) {
  return (
    <div className={styles.tagList}>
      {tags?.map((tag, index) => (
        <Badge key={tag} title={tag} colorIndex={index} />
      ))}
    </div>
  );
}

function Combobox({
  tags,
  inputValue = "",
}: {
  tags: string[];
  inputValue?: string;
}) {
  const hasTags = tags.length > 0;
  const hasContent = hasTags || inputValue;

  return (
    <div
      className={classnames(
        styles.combobox,
        hasContent ? styles.hasContent : ""
      )}
    >
      <header className={Typography.xsSemiBold}>옵션 선택 또는 생성</header>
      {tags.length > 0 && (
        <ul className={styles.options}>
          {tags.map((tag, index) => (
            <li key={tag}>
              <Badge title={tag} colorIndex={index} />
            </li>
          ))}
        </ul>
      )}
      {inputValue && (
        <div
          className={classnames(styles.create, hasTags ? styles.hasTags : "")}
        >
          <span className={Typography.smSemiBold}>생성</span>
          <Badge title={inputValue} />
        </div>
      )}
    </div>
  );
}

interface Props {
  tags?: string[];
}

export default function TagInput({ tags = [] }: Props) {
  const [inputValue, setInputValue] = useState<string>("");
  const [isEditing, setEditing] = useState(false);
  const tagInputRef = useBackdropClick<HTMLDivElement>({
    callback: () => {
      if (!isEditing) return;
      setEditing(false);
      setInputValue("");
    },
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const showsBadgeList = useMemo(() => {
    return tags.length > 0 && !isEditing;
  }, [tags, isEditing]);

  const handleClick = () => {
    setEditing(true);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
    }
  }, [isEditing]);

  return (
    <div className={styles.container} ref={tagInputRef}>
      <div
        className={classnames(
          styles.tagInput,
          showsBadgeList ? styles.pointerCursor : ""
        )}
        onClick={handleClick}
      >
        {showsBadgeList ? (
          <TagList tags={tags} />
        ) : (
          <input
            value={inputValue}
            className={Typography.lgMedium}
            placeholder="태그를 입력해주세요."
            onChange={handleInputChange}
            ref={inputRef}
          />
        )}
      </div>
      {isEditing && <Combobox tags={tags} inputValue={inputValue} />}
    </div>
  );
}
