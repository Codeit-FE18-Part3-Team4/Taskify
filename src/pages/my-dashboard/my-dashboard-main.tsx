import NotInvitedImg from "@/assets/images/ic-invite.svg";
import EmptyDashboardImg from "@/assets/images/ic-my-dashboard.svg";
import PlusIcon from "@/assets/images/ic-plus-circle.svg";
import NavigationBar from "@/components/navigationBar/navigation-bar";
import Typography from "@/components/typography";
import { useResponsiveValue } from "@/hooks/use-responsive-value";
import Image from "next/image";
import styles from "./my-dashboard.module.css";

export default function MyDashboardMain() {
  const homeText = useResponsiveValue({
    desktop: Typography.xl3Bold,
    tablet: Typography.xl2Bold,
    mobile: Typography.xlBold,
  });

  const sectionTitle = useResponsiveValue({
    desktop: Typography.xlBold,
    tablet: Typography.lg2Bold,
    mobile: Typography.lgBold
  })

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
