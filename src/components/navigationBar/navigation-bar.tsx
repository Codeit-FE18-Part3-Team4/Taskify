import Modal from "@/components/modal";
import Typography from "@/components/typography";
import { CommonSize } from "@/constants/common/common-size";
import { useModal } from "@/hooks/use-modal";
import { MemberInfo } from "@/types/member-info";
import MemberList from "./member-list";
import styles from "./navigation-bar.module.css";
import SettingSvg from "@/components/icon/setting-svg";
import UserPlusSvg from "@/components/icon/user-plus-svg";
import Link from "next/link";

interface NavigationBarProps {
  size?: CommonSize;
  members?: MemberInfo[];
  dashboardId?: number | null;
}

export default function NavigationBar({
  size = CommonSize.Large,
  members = [],
  dashboardId = null,
}: NavigationBarProps) {
  const sizeName = CommonSize[size].toLowerCase();
  const navigationBarClasses = `${styles.navigationBar} ${styles[sizeName]}`;
  const iconSpanClasses = `${styles.iconSpan} ${Typography.lgMedium}`;
  const settingLink = dashboardId
    ? `/dashboard/${dashboardId}/edit?tab=edit`
    : "#";

  const MODAL_KEY_1 = "MODAL_SAMPLE_1";
  const { isShowModal: isShowModal1, openModal: openModal } = useModal({
    key: MODAL_KEY_1,
  });
  const handleUserPlus = () => {
    openModal(true);
  };

  const handleAccountSetting = () => {
    openAccountSettingModal(true);
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
      {showMembers.length > 0 && (
        <MemberList
          hideMembers={hideMembers}
          showMembers={showMembers}
        ></MemberList>
      )}
      <div className={styles.rightIcons}>
        <button onClick={handleAccountSetting} className={styles.iconLink}>
          <SettingSvg className={styles.icon} />
          <span className={iconSpanClasses}>관리</span>
        </button>
        <button onClick={() => handleUserPlus()}>
          <UserPlusSvg className={styles.icon} />
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
      {isShowAccountSettingModal && (
        <AccountSettingModal modalKey={ACCOUNT_SETTING_MODAL_KEY} />
      )}
    </div>
  );
}
