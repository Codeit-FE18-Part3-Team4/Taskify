import { useBackdropClick } from "@/hooks/use-backdrop-unmount";
import { classnames } from "@/utils/classnames";
import { PropsWithChildren, ReactNode, useState } from "react";
import styles from "./menu.module.css";

export enum Direction {
  Left = "directionLeft",
  Right = "directionRight",
}

interface Props extends PropsWithChildren {
  items: ReactNode[];
  direction?: Direction;
}

export function Menu({ items, children, direction = Direction.Left }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const targetRef = useBackdropClick<HTMLDivElement>({
    callback: () => setIsOpen(false),
  });

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleItemClick = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.container} ref={targetRef}>
      <button className={styles.anchor} onClick={handleClick}>
        {children}
      </button>
      {isOpen && (
        <div
          className={classnames(styles.menu, styles[direction])}
          onClick={handleItemClick}
        >
          {items}
        </div>
      )}
    </div>
  );
}
