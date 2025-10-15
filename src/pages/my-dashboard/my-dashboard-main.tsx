import ArrowRight from "@/assets/images/ic-chevorn-right.svg";
import ArrowLeft from "@/assets/images/ic-chevron-left.svg";
import NotInvitedImg from "@/assets/images/ic-invite.svg";
import EmptyDashboardImg from "@/assets/images/ic-my-dashboard.svg";
import PlusIcon from "@/assets/images/ic-plus-circle.svg";
import PlusSquareIcon from "@/assets/images/ic-plus-square.svg";
import Button, { ButtonSize, ButtonVariant } from "@/components/button/button";
import ColorChip from "@/components/chips/chip-color/chips-color";
import Input, { InputVariant } from "@/components/input/input";
import NavigationBar from "@/components/navigationBar/navigation-bar";
import Typography from "@/components/typography";
import { CommonSize } from "@/constants/common/common-size";
import { useResponsiveValue } from "@/hooks/use-responsive-value";
import { classnames } from "@/utils/classnames";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import styles from "./my-dashboard.module.css";

interface MyDashboardMainProps {
  dashboards: any[];
  invitations: any[];
  onClick: () => void;
}

function sliceUserName(userName: string) {
  return userName.length > 1 ? userName.substring(1) : userName;
}

export default function MyDashboardMain({
  dashboards,
  invitations,
  onClick,
}: MyDashboardMainProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const myDashboards = dashboards.filter((item) => item.createdByMe);
  const responsivePageSize = useResponsiveValue({
    desktop: 3,
    tablet: 1,
    mobile: 1,
  });

  const PAGE_SIZE = responsivePageSize;

  const totalPages = useMemo(() => {
    return Math.ceil(myDashboards.length / PAGE_SIZE);
  }, [myDashboards]);

  const isLastPages = totalPages - 1;

  const currentDashboards = useMemo(() => {
    const start = currentPage * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return myDashboards.slice(start, end);
  }, [myDashboards, currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage((prev) => prev + 1);
  };

  const filteredInvitations = invitations.filter((item) =>
    item.dashboard.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const nextActiveButton =
    currentPage === isLastPages ? "" : styles.active;
  const prevActiveButton = currentPage !== 0 ? styles.active : "";

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

  const dashboardIdPage = (id: number) => {
    router.push(`dashboard/${id}`);
  };

  return (
    <div className={styles.myDashboardMainWrap}>
      {/* <NavigationBar /> */}
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
                <button onClick={onClick} className={styles.myDashboardAddButton}>
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
                  <span className={Typography.lgSemiBold}>
                    {currentPage + 1} of {totalPages}
                  </span>
                </div>
                <div className={styles.myDashboardPaginationButton}>
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 0}
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
                    disabled={currentPage === isLastPages}
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
                  <p className={Typography.lg2Bold}>{item.dashboard.title}</p>
                  <div>
                    <div
                      className={styles.invitationsDashboardSectionMainProfile}
                    >
                      <div className={styles.userBox}>
                        <div
                          className={classnames(
                            styles.userProfile,
                            Typography.xsSemiBold
                          )}
                        >
                          <span>{sliceUserName(item.invitee.nickname)}</span>
                        </div>
                        <p
                          className={classnames(
                            styles.userName,
                            Typography.lg2Bold
                          )}
                        >
                          {item.invitee.nickname}
                        </p>
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
                      >
                        거절
                      </Button>
                      <Button isWidthFull size={ButtonSize.XSmall}>
                        수락
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
