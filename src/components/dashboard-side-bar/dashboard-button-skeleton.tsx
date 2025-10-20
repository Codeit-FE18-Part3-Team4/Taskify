import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./dashboard-side-bar.module.css";

export default function DashboardButtonSkeleton() {
  return (
    <div className={`${styles.button} ${styles.dashboardButton}`}>
      <Skeleton
        width={24}
        height={24}
        baseColor="var(--color-black700)"
        highlightColor="var(--color-black600)"
      />
      <Skeleton
        width={190}
        height={24}
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
