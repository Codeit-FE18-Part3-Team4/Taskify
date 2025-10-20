import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./column.module.css";

const skeletonBaseColor = "var(--color-black500)";
const skeletonHighlightColor = "var(--color-black300)";

export default function ColumnTitleSkeleton() {
  return (
    <div className={styles.columnTitleWrapper}>
      <div className={styles.columnTitle}>
        <Skeleton
          width={110}
          height={24}
          borderRadius={8}
          baseColor={skeletonBaseColor}
          highlightColor={skeletonHighlightColor}
        />
        <Skeleton
          width={20}
          height={24}
          borderRadius={8}
          baseColor={skeletonBaseColor}
          highlightColor={skeletonHighlightColor}
        />
      </div>
      <div className={styles.buttonWrapper}>
        <Skeleton
          width={24}
          height={24}
          borderRadius={8}
          baseColor={skeletonBaseColor}
          highlightColor={skeletonHighlightColor}
        />
        <Skeleton
          width={24}
          height={24}
          borderRadius={8}
          baseColor={skeletonBaseColor}
          highlightColor={skeletonHighlightColor}
        />
      </div>
    </div>
  );
}
