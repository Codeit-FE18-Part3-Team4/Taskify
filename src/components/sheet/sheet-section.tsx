import Typography from "@/components/typography";
import { useResponsive } from "@/hooks/use-responsive";
import { classnames } from "@/utils/classnames";
import { ReactNode, useMemo } from "react";
import styles from "./sheet-section.module.css";

interface Props {
  title?: string;
  required?: boolean;
  zIndex?: number;
  children: ReactNode;
}

export default function SheetSection({
  title,
  required = false,
  zIndex = 0,
  children,
}: Props) {
  const { isMobile } = useResponsive();

  const typography = useMemo(() => {
    return isMobile ? Typography.mdSemiBold : Typography.lgSemiBold;
  }, [isMobile]);

  return (
    <section className={styles.sheetSection} style={{ zIndex }}>
      <h3 className={classnames(styles.title, typography)}>
        {title}
        {required && (
          <span className={classnames(styles.required, typography)}>*</span>
        )}
      </h3>
      {children}
    </section>
  );
}
