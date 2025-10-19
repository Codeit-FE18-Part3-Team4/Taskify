import Badge from "@/components/chips/badge/badge";
import Typography from "@/components/typography";
import { useBackdropClick } from "@/hooks/use-backdrop-unmount";
import { classnames } from "@/utils/classnames";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import styles from "./tag-input.module.css";
import { useTagsHistory } from "./tags-provider";

function TagList({ tags }: { tags: string[] }) {
  return (
    <div className={styles.tagList}>
      {tags?.map((tag) => (
        <Badge key={tag} title={tag} />
      ))}
    </div>
  );
}

function Combobox({
  tags,
  tagsHistory,
  inputValue = "",
  onSelect,
  onCreate,
}: {
  tags: string[];
  tagsHistory: string[];
  inputValue?: string;
  onSelect?: (tag: string) => void;
  onCreate?: (value: string) => void;
}) {
  const hasTags = tags.length > 0;
  const hasContent = hasTags || inputValue;

  const handleTagClick = (tag: string) => {
    onSelect?.(tag);
  };

  const handleCreateClick = () => {
    onCreate?.(inputValue);
  };

  return (
    <div
      className={classnames(
        styles.combobox,
        hasContent ? styles.hasContent : ""
      )}
    >
      <header className={Typography.xsSemiBold}>옵션 선택 또는 생성</header>
      {tagsHistory.length > 0 && (
        <ul className={styles.options}>
          {tagsHistory.map((tag) => (
            <li key={tag} onClick={() => handleTagClick(tag)}>
              <Badge title={tag} />
              {tags.includes(tag) && <div className={styles.usedTag} />}
            </li>
          ))}
        </ul>
      )}
      {inputValue && (
        <div
          className={classnames(styles.create, hasTags ? styles.hasTags : "")}
          onClick={handleCreateClick}
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
  onChange?: (tag: string[]) => void;
}

export default function TagInput({ tags = [], onChange }: Props) {
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
  const { tagsHistory, addTagsHistory } = useTagsHistory();

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

  const handleTagSelect = (tag: string) => {
    if (tags.includes(tag)) {
      onChange?.(tags.filter((t) => t !== tag));
    } else {
      onChange?.([...tags, tag]);
    }

    setInputValue("");
    setEditing(false);
  };

  const handleTagCreate = (value: string) => {
    if (tags.includes(value)) {
      handleTagSelect(value);
      return;
    }

    onChange?.([...tags, value]);
    addTagsHistory(value);
    setInputValue("");
    setEditing(false);
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
    }
  }, [isEditing]);

  useEffect(() => {
    addTagsHistory(tags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  return (
    <div className={styles.container} ref={tagInputRef}>
      <div
        className={classnames(
          styles.tagInput,
          showsBadgeList ? styles.pointerCursor : "",
          isEditing ? styles.editing : ""
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
      {isEditing && (
        <Combobox
          tags={tags}
          tagsHistory={tagsHistory}
          inputValue={inputValue}
          onSelect={handleTagSelect}
          onCreate={handleTagCreate}
        />
      )}
    </div>
  );
}
