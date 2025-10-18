import ArrowRightIcon from "@/assets/images/ic-chevorn-right.svg";
import ArrowLeftIcon from "@/assets/images/ic-chevron-left.svg";
import Typography from "@/components/typography";
import { SidebarPageControlProps } from "@/types/dashboard-side-bar";
import Image from "next/image";
import styles from "./dashboard-side-bar.module.css";

export default function SidebarPageControl({
  onPrev,
  onNext,
  currentPage,
  totalPages,
}: SidebarPageControlProps) {
  const isLastPage = totalPages;
  const prevDisabled = currentPage === 1 ? styles.disabled : "";
  const nextDisabled = currentPage === isLastPage ? styles.disabled : "";

  return (
    <div className={styles.dashboardPagenation}>
      {!prevDisabled && (
        <button
          onClick={onPrev}
          disabled={currentPage === 0}
          className={`${styles.button} ${prevDisabled}`}
        >
          <Image
            src={ArrowLeftIcon}
            width={20}
            height={20}
            alt="이전 버튼 아이콘"
          />
          <span className={Typography.lgMedium}>이전</span>
        </button>
      )}
      <div></div>
      {!nextDisabled && (
        <button
          onClick={onNext}
          disabled={currentPage === isLastPage}
          className={`${styles.button} ${nextDisabled}`}
        >
          <span className={Typography.lgMedium}>다음</span>
          <Image
            src={ArrowRightIcon}
            width={20}
            height={20}
            alt="다음 버튼 아이콘"
          />
        </button>
      )}
    </div>
  );
}
