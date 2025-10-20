import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./dashboard-side-bar.module.css";
import { useSsrResponsive } from "@/hooks/use-ssr-responsive";

export default function DashboardButtonSkeleton() {
  const { isTablet } = useSsrResponsive();

  const leftSize = isTablet ? 20 : 24;
  const MainWidth = isTablet ? 120 : 190;

  return (
    <div className={`${styles.button} ${styles.dashboardButton}`}>
      <Skeleton
        width={leftSize}
        height={leftSize}
        baseColor="var(--color-black700)"
        highlightColor="var(--color-black600)"
      />
      <Skeleton
        width={MainWidth}
        height={leftSize}
        baseColor="var(--color-black700)"
        highlightColor="var(--color-black600)"
      />
      <Skeleton
        width={20}
        height={20}
        baseColor="var(--color-black700)"
        highlightColor="var(--color-black600)"
      />
    </div>
  );
}
