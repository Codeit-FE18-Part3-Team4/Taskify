import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./card.module.css";

const skeletonBaseColor = "var(--color-black500)";
const skeletonHighlightColor = "var(--color-black300)";

export default function CardSkeleton() {
  return (
    <article className={styles.cardContainer}>
      <div className={styles.cardImage}>
        <Skeleton
          height={160}
          borderRadius={8}
          baseColor={skeletonBaseColor}
          highlightColor={skeletonHighlightColor}
        />
      </div>

      <Skeleton
        height={24}
        width="80%"
        borderRadius={6}
        baseColor={skeletonBaseColor}
        highlightColor={skeletonHighlightColor}
        style={{ marginBottom: 8 }}
      />

      <div className={styles.badge}>
        <Skeleton
          width={60}
          height={22}
          borderRadius={11}
          style={{ marginRight: 6 }}
          baseColor={skeletonBaseColor}
          highlightColor={skeletonHighlightColor}
        />
        <Skeleton
          width={50}
          height={22}
          borderRadius={11}
          baseColor={skeletonBaseColor}
          highlightColor={skeletonHighlightColor}
        />
      </div>

      <Skeleton
        width={100}
        height={18}
        borderRadius={4}
        style={{ marginBottom: 8 }}
        baseColor={skeletonBaseColor}
        highlightColor={skeletonHighlightColor}
      />

      <div className={styles.assignee}>
        <Skeleton
          circle
          width={26}
          height={26}
          style={{ marginRight: 8 }}
          baseColor={skeletonBaseColor}
          highlightColor={skeletonHighlightColor}
        />
        <Skeleton
          width={80}
          height={18}
          borderRadius={4}
          baseColor={skeletonBaseColor}
          highlightColor={skeletonHighlightColor}
        />
      </div>
    </article>
  );
}
