import { SidebarMenu } from "@/assets/images";
import SettingSvg from "@/components/icon/setting-svg";
import UserPlusSvg from "@/components/icon/user-plus-svg";
import Modal from "@/components/modal";
import Typography from "@/components/typography";
import { CommonSize } from "@/constants/common/common-size";
import { useModal } from "@/hooks/use-modal";
import { useSsrResponsive } from "@/hooks/use-ssr-responsive";
import { MemberInfo } from "@/types/member-info";
import Image from "next/image";
import Link from "next/link";
import MemberList from "./member-list";
import styles from "./navigation-bar.module.css";
import { useMembers } from "@/hooks/use-members";

const MEMBERS_SIZE = 1000;

interface NavigationBarProps {
  size?: CommonSize;
  totalCount?: number;
  dashboardId?: number | null;
  onMobileSidebarToggle?: () => void;
}

export default function NavigationBar({
  size = CommonSize.Large,
  dashboardId = null,
  onMobileSidebarToggle,
}: NavigationBarProps) {
  const { members } = useMembers({
    dashboardId,
    size: MEMBERS_SIZE,
  });
  const sizeName = CommonSize[size].toLowerCase();
  const navigationBarClasses = `${styles.navigationBar} ${styles[sizeName]}`;
  const iconSpanClasses = `${styles.iconSpan} ${Typography.lgMedium}`;
  const settingLink = `/dashboard/${dashboardId}/edit?tab=edit`;

  const MODAL_KEY_1 = "MODAL_SAMPLE_1";
  const { isShowModal: isShowModal1, openModal: openModal } = useModal({
    key: MODAL_KEY_1,
  });

  const handleUserPlus = () => {
    openModal(true);
  };

  console.log(members);

  let showMembers: MemberInfo[] = [];
  let hideMembers: MemberInfo[] = [];
  if (members) {
    if (members.length > 6) {
      showMembers = members.slice(0, 5);
      hideMembers = members.slice(5);
    } else {
      showMembers = members;
    }
  }

  const { isMobile } = useSsrResponsive();

  return (
    <div className={navigationBarClasses}>
      {isMobile && (
        <button className={styles.mobileMenu} onClick={onMobileSidebarToggle}>
          <Image src={SidebarMenu} width={20} height={20} alt="사이드바 메뉴" />
        </button>
      )}
      {dashboardId && (
        <>
          {showMembers.length > 0 && (
            <MemberList
              hideMembers={hideMembers}
              showMembers={showMembers}
            ></MemberList>
          )}
          <div className={styles.rightIcons}>
            <Link href={settingLink} className={styles.iconLink}>
              <SettingSvg className={styles.icon} />
              <span className={iconSpanClasses}>관리</span>
            </Link>
            <button onClick={() => handleUserPlus()}>
              <UserPlusSvg className={styles.icon} />
              <span className={iconSpanClasses}>공유</span>
            </button>
          </div>
        </>
      )}

      {isShowModal1 && (
        <Modal modalKey={MODAL_KEY_1}>
          <div
            style={{
              width: "600px",
              height: "600px",
              backgroundColor: "#242429",
              borderRadius: "24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2 style={{ color: "white" }}>초대하기 모달뜨는듯</h2>
            <button onClick={() => openModal(false)}>Close Modal 1</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
