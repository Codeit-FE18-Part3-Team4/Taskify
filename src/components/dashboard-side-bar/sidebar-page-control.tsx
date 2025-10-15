import ArrowRightIcon from "@/assets/images/ic-chevorn-right.svg";
import ArrowLeftIcon from "@/assets/images/ic-chevron-left.svg";
import Typography from "@/components/typography";
import Image from "next/image";
import styles from "./dashboard-side-bar.module.css";

interface SidebarPageControlProps {
  onPrev: () => void;
  onNext: () => void;
  currentPage: number;
  totalPages: number;
}

export default function SidebarPageControl({
  onPrev,
  onNext,
  currentPage,
  totalPages,
}: SidebarPageControlProps) {
  const isLAstPage = totalPages - 1;
  const prevDisabled = currentPage === 0 ? styles.disabled : "";
  const nextDisabled = currentPage === isLAstPage ? styles.disabled : "";

  return (
    <div className={styles.dashboardPagenation}>
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
      <button
        onClick={onNext}
        disabled={currentPage === isLAstPage}
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
