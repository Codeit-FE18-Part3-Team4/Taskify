import { Ref, useEffect, useRef } from "react";

export function useBackdropClick<Element extends HTMLElement>({
  callback,
}: {
  callback: () => void;
}): Ref<Element> {
  const targetRef = useRef<Element>(null);

  useEffect(() => {
    function handleMouseUp(event: MouseEvent) {
      if (
        targetRef.current &&
        !targetRef.current.contains(event.target as Node)
      ) {
        callback();
      }
    }

    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [targetRef.current, callback]);

  return targetRef;
}
