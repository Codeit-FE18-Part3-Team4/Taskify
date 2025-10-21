import Typography from "@/components/typography";
import styles from "./modify-members.module.css";
import { classnames } from "@/utils/classnames";
import { useState } from "react";
import {
  useMembers,
  useDashboardInvitees,
  useDeleteDashboardMember,
  useCancelDashboardInvitation,
} from "@/hooks/use-members";
import UserList from "./user-list";
import UserListTitle from "./user-list-title";
import { useAlert } from "@/hooks/use-alert";
import Alert, { AlertActionType } from "@/components/alert";
import { Dashboard } from "@/types";
import Dialog from "@/components/dialog";
import { useDialog } from "@/hooks/use-dialog";
import { useSsrResponsive } from "@/hooks/use-ssr-responsive";

const PAGE_SIZE = 6;

export enum UserListType {
  Members = "members",
  Invitees = "invitees",
}

interface ModifyMembersProps {
  dashboard: Dashboard;
  createdByMe: boolean;
  onUpdate: (message: string, status: boolean) => void | Promise<void>;
}

export default function ModifyMembers({
  dashboard,
  createdByMe,
  onUpdate,
}: ModifyMembersProps) {
  const [page, setPage] = useState({ members: 1, invitees: 1 });
  const [alertMessage, setAlertMessage] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [confirmProps, setConfirmProps] = useState<{
    type: UserListType;
    id: number;
  }>();

  const {
    members,
    totalCount: membersTotal,
    refetch: refetchMembers,
  } = useMembers({
    dashboardId: dashboard.id,
    page: page.members,
    size: PAGE_SIZE,
  });

  const {
    dashboardInvitations,
    totalCount: inviteesTotal,
    refetch: refetchInvitees,
    inviteUser,
  } = useDashboardInvitees({
    dashboardId: dashboard.id,
    page: page.invitees,
    size: PAGE_SIZE,
  });

  const inviteeList = dashboardInvitations?.map((inv) => inv.invitee);

  const { removeMember } = useDeleteDashboardMember(refetchMembers);
  const { removeInvitation } = useCancelDashboardInvitation(refetchInvitees);

  const totalPages = {
    members: Math.ceil(membersTotal / PAGE_SIZE),
    invitees: Math.ceil(inviteesTotal / PAGE_SIZE),
  };

  const DELETE_KEY = "DELETE_CHEKCK";
  const { isShowAlert: isShowDeleteAlert, openAlert: openDeleteAlert } =
    useAlert({
      key: DELETE_KEY,
    });

  const CANCEL_KEY = "CANCEL_CHEKCK";
  const { isShowAlert: isShowCancelAlert, openAlert: openCancelAlert } =
    useAlert({
      key: CANCEL_KEY,
    });

  const INVITATION_DIALOG_KEY = "USER_INVITATION_DIALOG";
  const { isShowDialog: isShowUserInvitationDialog, openDialog } = useDialog({
    key: INVITATION_DIALOG_KEY,
  });
  const [dialogStauts, setDialogStatus] = useState(false);

  const handlePageChange = (type: UserListType, direction: "prev" | "next") => {
    setPage((prev) => {
      const current = prev[type];
      const max = totalPages[type];
      const next =
        direction === "next"
          ? Math.min(current + 1, max)
          : Math.max(current - 1, 1);
      return { ...prev, [type]: next };
    });
  };

  const handleUserListButtonClick = async (
    type: UserListType,
    id: number,
    nickName: string,
    email?: string,
  ) => {
    setConfirmProps({ type: type, id: id });
    if (type === UserListType.Members) {
      setAlertMessage(
        `'${nickName}'님을 대시보드 멤버 목록에서 삭제하시겠습니까?`,
      );
      openDeleteAlert(true);
    } else {
      setAlertMessage(`'${email}'에 보낸 초대를 삭제하시겠습니까?`);
      openCancelAlert(true);
    }
  };

  const hadleConfirmClick = async () => {
    if (!confirmProps) return;

    if (confirmProps.type === UserListType.Members) {
      const result = await removeMember(confirmProps.id);
      if (result) {
        onUpdate(result.message ?? "멤버 삭제 실패", result?.success ?? false);
      }
    } else {
      const result = await removeInvitation({
        dashboardId: dashboard.id,
        invitationId: confirmProps.id,
      });
      if (result) {
        onUpdate(result.message ?? "초대 취소 실패", result?.success ?? false);
      }
    }
  };

  const handleInviteUser = async (email: string) => {
    if (!email) return;

    const result = await inviteUser(email);
    setDialogMessage(result?.message ?? "사용자 초대에 실패하였습니다.");
    setDialogStatus(true);
    openDialog(true);
  };

  const handleDialogConfirm = () => {
    openDialog(false);
    setDialogStatus(false);
    setDialogMessage("");
  };

  const { isDesktop, isTablet } = useSsrResponsive();

  return (
    <div className={styles.topContainer}>
      <div className={styles.contents}>
        <h3
          className={classnames(
            isDesktop
              ? Typography.xl3Bold
              : isTablet
                ? Typography.xl2Bold
                : Typography.xlBold,
            styles.title,
          )}
        >
          멤버 관리
        </h3>

        <div className={styles.list}>
          <UserListTitle
            type={UserListType.Members}
            currentPage={page.members}
            totalPage={totalPages.members}
            onPageChange={handlePageChange}
            showInviteButton={false}
          />
          <div className={styles.usersContainer}>
            <UserList
              dashboard={dashboard}
              members={members ?? []}
              invitations={[]}
              onClickButton={handleUserListButtonClick}
              createdByMe={createdByMe}
            />
          </div>
        </div>

        {createdByMe && (
          <div className={styles.list}>
            <UserListTitle
              type={UserListType.Invitees}
              currentPage={page.invitees}
              totalPage={totalPages.invitees}
              onPageChange={handlePageChange}
              showInviteButton
              invitees={inviteeList ?? []}
              members={members ?? []}
              onClickConfirm={handleInviteUser}
            />
            <div className={styles.usersContainer}>
              <UserList
                createdByMe={createdByMe}
                dashboard={dashboard}
                members={[]}
                invitations={dashboardInvitations ?? []}
                onClickButton={handleUserListButtonClick}
              />
            </div>
          </div>
        )}
      </div>

      {(isShowCancelAlert || isShowDeleteAlert) && (
        <Alert
          alertKey={isShowCancelAlert ? CANCEL_KEY : DELETE_KEY}
          title="알림"
          message={alertMessage}
          actionType={AlertActionType.Delete}
          onCancel={() => {}}
          onAction={hadleConfirmClick}
        />
      )}

      {isShowUserInvitationDialog && dialogStauts && (
        <Dialog
          dialogKey={INVITATION_DIALOG_KEY}
          message={dialogMessage}
          onConfirm={handleDialogConfirm}
        />
      )}
    </div>
  );
}
