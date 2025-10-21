import { SidebarMenu } from "@/assets/images";
import SettingSvg from "@/components/icon/setting-svg";
import UserPlusSvg from "@/components/icon/user-plus-svg";
import Typography from "@/components/typography";
import { CommonSize } from "@/constants/common/common-size";
import { useSsrResponsive } from "@/hooks/use-ssr-responsive";
import { MemberInfo } from "@/types/member-info";
import Image from "next/image";
import Link from "next/link";
import MemberList from "./member-list";
import styles from "./navigation-bar.module.css";
import { useMembers, useDashboardInvitees } from "@/hooks/use-members";
import UserInvitationSheet from "@/features/dashboard/edit/user-invitation-sheet";
import { useSheet } from "@/hooks/use-sheet";
import { useState } from "react";
import Dialog from "../dialog";
import { useDialog } from "@/hooks/use-dialog";
import { useDashboardById } from "@/hooks/use-dashboard";

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
  const [naviDialogMessage, setNaviDialogMessage] = useState("");
  const { dashboard } = useDashboardById(dashboardId);
  const { dashboardInvitations } = useDashboardInvitees({ dashboardId });
  const INVITATION_SHEET_NAVI_KEY = "INVITATION_FROM_NAVIGATION";
  const {
    isShowSheet: isShowInvitationModalFromNavigation,
    openSheet: openInvitationSheetFromNavigation,
  } = useSheet({
    key: INVITATION_SHEET_NAVI_KEY,
  });
  const NAVI_DIALOG_KEY = "NAVI_DIALOG";
  const { isShowDialog: isShowNaviDialog, openDialog: openNaviDialog } =
    useDialog({
      key: NAVI_DIALOG_KEY,
    });
  const sizeName = CommonSize[size].toLowerCase();
  const navigationBarClasses = `${styles.navigationBar} ${styles[sizeName]}`;
  const iconSpanClasses = `${styles.iconSpan} ${Typography.lgMedium}`;
  const settingLink = `/dashboard/${dashboardId}/edit?tab=edit`;

  const handleUserPlus = () => {
    openInvitationSheetFromNavigation(true);
  };
  const inviteeList = dashboardInvitations?.map((inv) => inv.invitee);

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
  const { inviteUser } = useDashboardInvitees({
    dashboardId: dashboardId,
    size: MEMBERS_SIZE,
  });

  const handleSubmitInvitation = async (email: string) => {
    if (!email) return;

    const result = await inviteUser(email);
    setNaviDialogMessage(result?.message ?? "사용자 초대에 실패하였습니다.");
    openNaviDialog(true);
  };
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
              {!isMobile && <span className={iconSpanClasses}>관리</span>}
            </Link>
            {dashboard && dashboard.createdByMe && (
              <button onClick={handleUserPlus}>
                <UserPlusSvg className={styles.icon} />
                {!isMobile && <span className={iconSpanClasses}>공유</span>}
              </button>
            )}
          </div>
        </>
      )}

      {isShowInvitationModalFromNavigation && (
        <UserInvitationSheet
          sheetKey={INVITATION_SHEET_NAVI_KEY}
          invitees={inviteeList}
          members={members ?? []}
          onSubmit={handleSubmitInvitation}
        />
      )}

      {isShowNaviDialog && (
        <Dialog
          dialogKey={NAVI_DIALOG_KEY}
          message={naviDialogMessage}
          onConfirm={() => openNaviDialog(false)}
        />
      )}
    </div>
  );
}
