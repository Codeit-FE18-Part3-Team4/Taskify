import { CommonSize } from "@/constants/common/common-size";
import styles from "./navigation-bar.module.css";
import SettingSvg from "./setting-svg";
import UserPlusSvg from "./user-plus-svg";
import typographyStyles from "@/components/typography";
import Link from "next/link";
import { MemberInfo } from "@/types/member-info";
import MemberList from "./member-list";
import Modal from "@/components/modal";
import { useModal } from "@/hooks/use-modal";

interface NavigationBarProps {
  size?: CommonSize;
  members?: MemberInfo[];
  dashboardId?: number;
}

export default function NavigationBar({
  size = CommonSize.Large,
  members = [],
  dashboardId,
}: NavigationBarProps) {
  const sizeName = CommonSize[size].toLowerCase();
  const navigationBarClasses = `${styles.navigationBar} ${styles[sizeName]}`;
  const iconColor = `var(--color-gray400)`;
  const iconSpanClasses = `${styles.iconSpan} ${typographyStyles["lgMedium"]}`;
  const settingLink = dashboardId ? `/dashboard/${dashboardId}/edit` : "#";

  const MODAL_KEY_1 = "MODAL_SAMPLE_1";
  const { isShowModal: isShowModal1, openModal: openModal } = useModal({
    key: MODAL_KEY_1,
  });

  const handleUserPlus = () => {
    openModal(true);
  };

  let showMembers: MemberInfo[] = [];
  let hideMembers: MemberInfo[] = [];
  if (members.length > 6) {
    showMembers = members.slice(0, 5);
    hideMembers = members.slice(5);
  } else {
    showMembers = members;
  }

  return (
    <div className={navigationBarClasses}>
      <MemberList
        hideMembers={hideMembers}
        showMembers={showMembers}
      ></MemberList>
      <div className={styles.rightIcons}>
        <Link className={styles.iconLink} href={settingLink}>
          <SettingSvg className={styles.icon} color={iconColor} />
          <span className={iconSpanClasses}>관리</span>
        </Link>
        <button onClick={() => handleUserPlus()}>
          <UserPlusSvg className={styles.icon} color={iconColor} />
          <span className={iconSpanClasses}>공유</span>
        </button>
      </div>

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
