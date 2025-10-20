import { useSsrResponsive } from "@/hooks/use-ssr-responsive";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./dashboard-side-bar.module.css";

const skeletonBaseColor = "var(--color-black700)";
const skeletonHighlightColor = "var(--color-black600)";

export default function DashboardButtonSkeleton() {
  const { isTablet } = useSsrResponsive();

  const leftSize = isTablet ? 20 : 24;
  const MainWidth = isTablet ? 120 : 190;

  return (
    <div className={`${styles.button} ${styles.dashboardButton}`}>
      <Skeleton
        width={leftSize}
        height={leftSize}
        baseColor={skeletonBaseColor}
        highlightColor={skeletonHighlightColor}
      />
      <Skeleton
        width={MainWidth}
        height={leftSize}
        baseColor={skeletonBaseColor}
        highlightColor={skeletonHighlightColor}
      />
      <Skeleton
        width={20}
        height={20}
        baseColor={skeletonBaseColor}
        highlightColor={skeletonHighlightColor}
      />
    </div>
  );
}
