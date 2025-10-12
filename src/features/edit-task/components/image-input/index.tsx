import ImageIcon from "@/assets/images/ic-image.svg";
import CloseImage from "@/assets/images/ic-x-circle-gray.svg";
import Typography from "@/components/typography";
import { useFileDragAndDrop } from "@/hooks/use-file-drag-and-drop";
import { useResponsive } from "@/hooks/use-responsive";
import { classnames } from "@/utils/classnames";
import Image from "next/image";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import styles from "./image-input.module.css";

type FileChangeHandler = (file: File) => void;

function Input({ onChange }: { onChange: FileChangeHandler }) {
  const { isMobile } = useResponsive();
  const { targetRef, isDraggingOnTarget } =
    useFileDragAndDrop<HTMLLabelElement>({
      fileType: "image/",
      onDrop: (file) => {
        console.log("Drop File in ImageInput: ", file);
        onChange(file);
      },
    });

  const typography = useMemo(() => {
    return isMobile ? Typography.mdBold : Typography.lgBold;
  }, [isMobile]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log("Change File in ImageInput: ", file);
    if (!file) return;
    onChange(file);
  };

  return (
    <label
      htmlFor="image-input"
      className={classnames(
        styles.imageInput,
        isDraggingOnTarget ? styles.dragging : ""
      )}
      ref={targetRef}
    >
      <Image src={ImageIcon} alt="이미지" width={32} height={32} />
      <span className={typography}>+ image upload</span>
      <input
        id="image-input"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
    </label>
  );
}

function Preview({
  imageUrl,
  onRemove,
}: {
  imageUrl: string;
  onRemove: () => void;
}) {
  return (
    <div className={styles.previewContainer}>
      <div className={styles.imagePreview}>
        <Image
          src={imageUrl}
          alt="미리보기"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <button className={styles.previewDeleteButton} onClick={onRemove}>
        <Image src={CloseImage} alt="닫기" />
      </button>
    </div>
  );
}

interface Props {
  imageUrl?: string;
  onChange?: FileChangeHandler;
}

export default function ImageInput({ imageUrl, onChange }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(imageUrl || null);
  const { isMobile } = useResponsive();

  const handleChange = (file: File) => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onChange?.(file);
  };

  const handleRemove = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return previewUrl ? (
    <Preview imageUrl={previewUrl} onRemove={handleRemove} />
  ) : (
    <Input onChange={handleChange} />
  );
}
