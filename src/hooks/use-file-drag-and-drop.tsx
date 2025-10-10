import { useEffect, useRef, useState } from "react";

interface Props {
  fileType: string;
  onDrop?: (file: File) => void;
}

export function useFileDragAndDrop({ fileType, onDrop }: Props) {
  const [isDraggingOnTarget, setDraggingOnTarget] = useState(false);
  const targetRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (target === null) return;

    function handleWindowDrop(event: DragEvent) {
      const items = event.dataTransfer?.items;
      if (!items) return;

      if ([...items].some((item) => item.kind === "file")) {
        event.preventDefault();
      }
    }

    function handleWindowDragOver(event: DragEvent) {
      const items = event.dataTransfer?.items;
      if (!items) return;

      if ([...items].some((item) => item.kind === "file")) {
        event.preventDefault();

        if (!target?.contains(event.target as Node)) {
          event.dataTransfer!.dropEffect = "none";
        }
      }
    }

    function handleTargetDrop(event: DragEvent) {
      const items = event.dataTransfer?.items;
      if (!items) return;

      event.preventDefault();
      const files = [...event.dataTransfer?.items]
        .map((item) => item.getAsFile())
        .filter((item) => item);

      const file = files[0];
      if (!file) return;
      onDrop?.(file);
    }

    function handleTargetDragOver(event: DragEvent) {
      const items = event.dataTransfer?.items;
      if (!items) return;

      const fileItems = [...items].filter((item) => item.kind === "file");

      if (fileItems.length > 0) {
        event.preventDefault();

        if (fileItems.some((item) => item.type.startsWith(fileType))) {
          event.dataTransfer!.dropEffect = "copy";
        } else {
          event.dataTransfer!.dropEffect = "none";
        }
      }
    }

    function handleTargetDragEnter() {
      setDraggingOnTarget(true);
    }

    function handleTargetDragLeave() {
      setDraggingOnTarget(false);
    }

    window.addEventListener("drop", handleWindowDrop);
    window.addEventListener("dragover", handleWindowDragOver);
    target.addEventListener("drop", handleTargetDrop);
    target.addEventListener("dragover", handleTargetDragOver);
    target.addEventListener("dragenter", handleTargetDragEnter);
    target.addEventListener("dragleave", handleTargetDragLeave);

    return () => {
      window.removeEventListener("drop", handleWindowDrop);
      window.removeEventListener("dragover", handleWindowDragOver);
      target.removeEventListener("drop", handleTargetDrop);
      target.removeEventListener("dragover", handleTargetDragOver);
      target.removeEventListener("dragenter", handleTargetDragOver);
      target.removeEventListener("dragleave", handleTargetDragOver);
    };
  }, [targetRef.current, fileType]);

  return { targetRef, isDraggingOnTarget };
}
