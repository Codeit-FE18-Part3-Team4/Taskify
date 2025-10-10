import { PropsWithChildren, ReactNode } from "react";
import styles from "./sheet-section-group.module.css";

interface Props {
  zIndex?: number;
  children: ReactNode[];
}

export default function SheetSectionGroup({
  zIndex = 0,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className={styles.sheetSectionGroup} style={{ zIndex }}>
      {children.map((child, index) => (
        <div key={index} className={styles.sheetSectionGroupItem}>
          {child}
        </div>
      ))}
    </div>
  );
}
