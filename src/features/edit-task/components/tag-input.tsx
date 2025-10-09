import Badge from "@/components/chips/badge";
import Typography from "@/components/typography";
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
  return (
    <div className={styles.combobox}>
      <header className={Typography.xsSemiBold}>옵션 선택 또는 생성</header>
      {tags.length > 0 && (
        <div className={styles.options}>
          {tags.map((tag, index) => (
            <Badge key={tag} title={tag} colorIndex={index} />
          ))}
        </div>
      )}
      {inputValue && (
        <div className={styles.create}>
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
  const inputRef = useRef<HTMLInputElement>(null);

  const showsBadgeList = useMemo(() => {
    return tags.length > 0 && !isEditing;
  }, [tags, isEditing]);

  const handleClick = () => {
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
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
    <div className={styles.container}>
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
            onBlur={handleBlur}
            ref={inputRef}
          />
        )}
      </div>
      {isEditing && <Combobox tags={tags} inputValue={inputValue} />}
    </div>
  );
}
