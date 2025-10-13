import ArrowRight from "@/assets/images/ic-chevorn-right.svg";
import ArrowLeft from "@/assets/images/ic-chevron-left.svg";
import NotInvitedImg from "@/assets/images/ic-invite.svg";
import EmptyDashboardImg from "@/assets/images/ic-my-dashboard.svg";
import PlusIcon from "@/assets/images/ic-plus-circle.svg";
import PlusSquareIcon from "@/assets/images/ic-plus-square.svg";
import ColorChip from "@/components/chips/chip-color/chips-color";
import NavigationBar from "@/components/navigationBar/navigation-bar";
import Typography from "@/components/typography";
import { CommonSize } from "@/constants/common/common-size";
import { useResponsiveValue } from "@/hooks/use-responsive-value";
import Image from "next/image";
import styles from "./my-dashboard.module.css";

interface MyDashboardMainProps {
  dashboards: any[];
}

export default function MyDashboardMain({ dashboards }: MyDashboardMainProps) {
  const myDashboards = dashboards.filter((item) => item.createdByMe);
  console.log(myDashboards);

  const activeButton = myDashboards.length > 4 ? styles.active : "";

  const homeText = useResponsiveValue({
    desktop: Typography.xl3Bold,
    tablet: Typography.xl2Bold,
    mobile: Typography.xlBold,
  });

  const sectionTitle = useResponsiveValue({
    desktop: Typography.xlBold,
    tablet: Typography.lg2Bold,
    mobile: Typography.lgBold,
  });

  const emptyText = useResponsiveValue({
    desktop: Typography.lg2Bold,
    tablet: Typography.lgBold,
    mobile: Typography.mdBold,
  });

  return (
    <div className={styles.myDashboardMainWrap}>
      <NavigationBar />
      <div className={styles.myDashboardMain}>
        <h1 className={homeText}>홈</h1>
        <div className={styles.dashboardSection}>
          <h2 className={sectionTitle}>내 대시보드</h2>
          {myDashboards.length === 0 ? (
            <div className={styles.emptyDashboard}>
              <Image
                src={EmptyDashboardImg}
                width={100}
                height={100}
                alt="대시보드가 없다"
              />
              <p className={emptyText}>대시보드가 없습니다.</p>
              <button>
                <span className={Typography.lgBold}>생성하기</span>
                <Image
                  src={PlusIcon}
                  width={16}
                  height={16}
                  alt="대시보드 생성"
                />
              </button>
            </div>
          ) : (
            <div className={styles.myDashboard}>
              <div className={styles.myDashboardBox}>
                <button className={styles.myDashboardAddButton}>
                  <span className={Typography.lg2SemiBold}>새로운 대시보드</span>
                  <Image
                    src={PlusSquareIcon}
                    width={18}
                    height={18}
                    alt="새로운 대시보드"
                  />
                </button>
                {myDashboards.slice(0, 3).map((item) => (
                  <button className={styles.myDashboardButton} key={item.id}>
                    <ColorChip size={CommonSize.Large} />
                    <span className={Typography.lg2SemiBold}>{item.title}</span>
                    <Image
                      src={ArrowRight}
                      width={24}
                      height={24}
                      alt="오른쪽 화살표"
                    />
                  </button>
                ))}
              </div>
              <div className={styles.myDashboardPagination}>
                <div className={styles.myDashboardPaginationCount}>
                  <span className={Typography.lgSemiBold}>1 of 3</span>
                </div>
                <div className={styles.myDashboardPaginationButton}>
                  <button>
                    <Image
                      src={ArrowLeft}
                      width={24}
                      height={24}
                      alt="왼쪽 활살표"
                    />
                  </button>
                  <button className={activeButton}>
                    <Image
                      src={ArrowRight}
                      width={24}
                      height={24}
                      alt="오른쪽 화살표"
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={styles.dashboardSection}>
          <h2 className={sectionTitle}>초대 받은 대시보드</h2>
          <div className={styles.emptyDashboard}>
            <Image
              src={NotInvitedImg}
              width={100}
              height={100}
              alt="초대 받은 대시보드가 없다"
            />
            <p className={emptyText}>아직 초대받은 대시보드가 없습니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
