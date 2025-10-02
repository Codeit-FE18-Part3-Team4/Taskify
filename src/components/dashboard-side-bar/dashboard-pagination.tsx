import ArrowRightIcon from "@/assets/images/ic-chevorn-right.svg";
import ArrowLeftIcon from "@/assets/images/ic-chevron-left.svg";
import Typography from "@/components/typography/typography";
import Image from "next/image";
import styles from "./dashboard-side-bar.module.css";

interface DashboardPaginationProps {
  onPrev: () => void;
  onNext: () => void;
  isPrevDisabled?: boolean;
  isNextDisabled?: boolean;
  currentPage?: number;
  totalPages?: number;
}

export default function DashboardPagination({
  onPrev,
  onNext,
  isPrevDisabled = true,
  isNextDisabled = true,
}: DashboardPaginationProps) {
  const pervDisabled = isPrevDisabled ? styles.disabled : "";
  const nextDisabled = isNextDisabled ? styles.disabled : "";

  return (
    <div className={styles.dashboardPagenation}>
      <button
        onClick={onPrev}
        disabled={isPrevDisabled}
        className={`${styles.button} ${pervDisabled}`}
      >
        <Image
          src={ArrowLeftIcon}
          width={20}
          height={20}
          alt="이전 버튼 아이콘"
        />
        <span className={Typography.lgMedium}>이전</span>
      </button>
      <button
        onClick={onNext}
        disabled={isNextDisabled}
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
    </div>
  );
}
