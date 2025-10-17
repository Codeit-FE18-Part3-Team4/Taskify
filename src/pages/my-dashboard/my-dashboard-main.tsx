import {
  ArrowLeft,
  ArrowRight,
  EmptyDashboardImg,
  NotInvitedImg,
  PlusIcon,
  PlusSquareIcon,
} from "@/assets/images";
import Button, { ButtonSize, ButtonVariant } from "@/components/button/button";
import ColorChip from "@/components/chips/chip-color/chips-color";
import Input, { InputSize, InputVariant } from "@/components/input/input";
import NavigationBar from "@/components/navigationBar/navigation-bar";
import Profile from "@/components/profile/profile";
import { ProfileSize } from "@/components/profile/profile-size";
import Typography from "@/components/typography";
import { CommonSize } from "@/constants/common/common-size";
import { useDashboardPagination } from "@/hooks/use-dashboard-pagination";
import { useInvitationSearch } from "@/hooks/use-invitation-search";
import { useInvitations } from "@/hooks/use-invitations";
import { useResponsiveValue } from "@/hooks/use-responsive-value";
import { MyDashboardMainProps } from "@/types/my-dashboard";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDashboardContext } from "./dashboard-provider";
import styles from "./my-dashboard.module.css";

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default function MyDashboardMain({
  dashboards,
  onClick,
}: MyDashboardMainProps) {
  const router = useRouter();
  const { refreshSidebar } = useDashboardContext();

  const {
    currentPage,
    totalPages,
    currentDashboards,
    handlePrevPage,
    handleNextPage,
    isFirstPage,
    isLastPage,
  } = useDashboardPagination(dashboards);

  const {
    invitations,
    hasMore,
    loadMoreRef,
    handleInvitationAccept: acceptInvitation,
  } = useInvitations();

  const { searchValue, setSearchValue, filteredInvitations } =
    useInvitationSearch(invitations);

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

  const inputSize = useResponsiveValue({
    desktop: InputSize.Medium,
    tablet: InputSize.Auto,
    mobile: InputSize.Auto,
  });

  const invitationTitle = useResponsiveValue({
    desktop: Typography.lg2Bold,
    tablet: Typography.lgBold,
    mobile: Typography.lgSemiBold,
  });

  const dashboardIdPage = (id: number) => {
    router.push(`dashboard/${id}`);
  };

  const handleInvitationAction = async (id: number, action: boolean) => {
    const success = await acceptInvitation(id, action);
    if (success) {
      refreshSidebar();
    }
  };

  const nextActiveButton = isLastPage ? "" : styles.active;
  const prevActiveButton = !isFirstPage ? styles.active : "";

  return (
    <div className={styles.myDashboardMainWrap}>
      <NavigationBar />
      <div className={styles.myDashboardMain}>
        <h1 className={homeText}>홈</h1>
        <div className={styles.dashboardSection}>
          <h2 className={sectionTitle}>내 대시보드</h2>
          {dashboards.length === 0 ? (
            <div className={styles.emptyDashboard}>
              <Image
                src={EmptyDashboardImg}
                width={100}
                height={100}
                alt="대시보드가 없다"
              />
              <p className={emptyText}>대시보드가 없습니다.</p>
              <button onClick={onClick}>
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
                <button
                  onClick={onClick}
                  className={styles.myDashboardAddButton}
                >
                  <span className={Typography.lg2SemiBold}>
                    새로운 대시보드
                  </span>
                  <Image
                    src={PlusSquareIcon}
                    width={18}
                    height={18}
                    alt="새로운 대시보드"
                  />
                </button>
                {currentDashboards.map((item) => (
                  <button
                    className={styles.myDashboardButton}
                    key={item.id}
                    onClick={() => dashboardIdPage(item.id)}
                  >
                    <ColorChip color={item.color} size={CommonSize.Medium} />
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
                  <span className={Typography.lgSemiBold}>
                    {currentPage + 1} of {totalPages}
                  </span>
                </div>
                <div className={styles.myDashboardPaginationButton}>
                  <button
                    onClick={handlePrevPage}
                    disabled={isFirstPage}
                    className={prevActiveButton}
                  >
                    <Image
                      src={ArrowLeft}
                      width={24}
                      height={24}
                      alt="왼쪽 활살표"
                    />
                  </button>
                  <button
                    onClick={handleNextPage}
                    disabled={isLastPage}
                    className={nextActiveButton}
                  >
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
          <div className={styles.invitationsDashboardTop}>
            <h2 className={sectionTitle}>초대 받은 대시보드</h2>
            {invitations.length !== 0 && (
              <Input
                placeholder="검색"
                variant={InputVariant.Search}
                $size={inputSize}
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
              />
            )}
          </div>
          {invitations.length === 0 ? (
            <div className={styles.emptyDashboard}>
              <Image
                src={NotInvitedImg}
                width={100}
                height={100}
                alt="초대 받은 대시보드가 없다"
              />
              <p className={emptyText}>아직 초대받은 대시보드가 없습니다.</p>
            </div>
          ) : (
            <div className={styles.invitationsDashboardSection}>
              <div className={styles.invitationsDashboardSectionTop}>
                <p className={Typography.lgSemiBold}>이름</p>
                <div>
                  <p className={Typography.lgSemiBold}>초대자</p>
                  <p className={Typography.lgSemiBold}>수락여부</p>
                </div>
              </div>
              {filteredInvitations.map((item) => (
                <div
                  key={item.id}
                  className={styles.invitationsDashboardSectionMain}
                >
                  <p className={invitationTitle}>{item.dashboard.title}</p>
                  <div>
                    <div
                      className={styles.invitationsDashboardSectionMainProfile}
                    >
                      <div className={styles.userBox}>
                        <Profile
                          size={ProfileSize.Medium}
                          name={item.inviter.nickname}
                          showFullName
                        />
                      </div>
                    </div>
                    <div
                      className={
                        styles.invitationsDashboardSectionMainButtonBox
                      }
                    >
                      <Button
                        isWidthFull
                        variant={ButtonVariant.Secondary}
                        size={ButtonSize.XSmall}
                        onClick={() => handleInvitationAction(item.id, false)}
                      >
                        거절
                      </Button>
                      <Button
                        isWidthFull
                        size={ButtonSize.XSmall}
                        onClick={() => handleInvitationAction(item.id, true)}
                      >
                        수락
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              {hasMore && (
                <div className={styles.infinityTrigger} ref={loadMoreRef}></div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
