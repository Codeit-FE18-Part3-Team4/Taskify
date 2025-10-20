import styles from "./user-list-title.module.css";
import ChevronIcon, { Direction } from "@/components/icon/chevron-icon";
import { UserListType } from "./modify-members";
import Typography from "@/components/typography";
import Button, { ButtonSize } from "@/components/button/button";
import UserPlusSvg from "@/components/icon/user-plus-svg";
import UserInvitationSheet from "./user-invitation-sheet";
import { useSheet } from "@/hooks/use-sheet";
import { MemberInfo } from "@/types";

export type Invitee = {
  email: string;
  id: number;
  nickname: string;
};

interface UserListTitleProps {
  invitees?: Invitee[];
  members?: MemberInfo[];
  type: UserListType;
  totalPage: number;
  currentPage: number;
  showInviteButton?: boolean;
  onPageChange: (type: UserListType, direction: "prev" | "next") => void;
  onClickConfirm?: (email: string) => void;
}

export default function UserListTitle({
  invitees,
  members,
  type,
  totalPage,
  currentPage,
  showInviteButton = false,
  onPageChange,
  onClickConfirm,
}: UserListTitleProps) {
  const USER_INVITATION_KEY = "USER_INVITATION";
  const { isShowSheet, openSheet } = useSheet({ key: USER_INVITATION_KEY });
  const title = type === UserListType.Members ? "구성원" : "초대내역";

  const handleClick = (dir: "prev" | "next") => {
    onPageChange(type, dir);
  };

  const handleEmailInput = (email: string) => {
    onClickConfirm?.(email);
  };

  return (
    <div className={styles.memberListTitle}>
      <div className={styles.titleAndButton}>
        <span className={Typography.xlBold}>{title}</span>
        {showInviteButton && (
          <Button size={ButtonSize.XSmall} onClick={() => openSheet(true)}>
            <span>초대</span>
            <UserPlusSvg className={styles.icon} />
          </Button>
        )}
      </div>

      {totalPage > 1 && (
        <div className={styles.countAndButtons}>
          <div className={styles.pageCountWrapper}>
            <span>{currentPage}</span>
            <span>of</span>
            <span>{totalPage}</span>
          </div>
          <div className={styles.arrowButtonWrapper}>
            <button
              onClick={() => handleClick("prev")}
              disabled={currentPage === 1}
            >
              <ChevronIcon
                direction={Direction.Left}
                color={`var(--color-gray${currentPage === 1 ? 500 : 200})`}
              />
            </button>
            <button
              onClick={() => handleClick("next")}
              disabled={currentPage === totalPage}
            >
              <ChevronIcon
                direction={Direction.Right}
                color={`var(--color-gray${currentPage === totalPage ? 500 : 200})`}
              />
            </button>
          </div>
        </div>
      )}

      {isShowSheet && (
        <UserInvitationSheet
          sheetKey={USER_INVITATION_KEY}
          members={members}
          invitees={invitees}
          onSubmit={handleEmailInput}
        />
      )}
    </div>
  );
}
