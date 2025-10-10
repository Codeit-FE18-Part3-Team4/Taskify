import ImageIcon from "@/assets/images/ic-image.svg";
import Typography from "@/components/typography";
import { useFileDragAndDrop } from "@/hooks/use-file-drag-and-drop";
import { useResponsive } from "@/hooks/use-responsive";
import { classnames } from "@/utils/classnames";
import Image from "next/image";
import { ChangeEvent, useMemo } from "react";
import styles from "./sheet-image-input.module.css";

export default function ImageInput() {
  const { isMobile } = useResponsive();
  const { targetRef, isDraggingOnTarget } =
    useFileDragAndDrop<HTMLLabelElement>({
      fileType: "image/",
      onDrop: (file) => {
        console.log(file);
      },
    });

  const typography = useMemo(() => {
    return isMobile ? Typography.mdBold : Typography.lgBold;
  }, [isMobile]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    console.log(file);
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
