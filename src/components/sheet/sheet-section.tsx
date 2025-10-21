import Typography from "@/components/typography";
import { classnames } from "@/utils/classnames";
import { ReactNode, useMemo } from "react";
import styles from "./sheet-section.module.css";
import { useSsrResponsive } from "@/hooks/use-ssr-responsive";

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
  const { isMobile } = useSsrResponsive();

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
