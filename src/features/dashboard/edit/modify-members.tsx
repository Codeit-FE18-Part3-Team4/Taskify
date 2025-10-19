import Button, { ButtonSize, ButtonVariant } from "@/components/button/button";
import ChevronIcon, { Direction } from "@/components/icon/chevron-icon";
import UserPlusSvg from "@/components/icon/user-plus-svg";
import Profile from "@/components/profile/profile";
import { ProfileSize } from "@/components/profile/profile-size";
import Typography from "@/components/typography";
import { MemberInfo } from "@/types/member-info";
import UserPlusSvg from "@/components/icon/user-plus-svg";
import { useMembers } from "@/hooks/use-members";
import UserList from "./user-list";

const MEMBERS_SIZE = 6;
const INVITEES_SIZE = 6;

enum ButtonColorRange {
  Disabled = 500,
  Enabled = 200,
}

type ButtonType = { Member: [`Delete`]; Invitee: [`Delete`] };

interface ModifyMembersProps {
  // membersCurrentPage: number;
  // membersPageCount: number;
  // currentInvitationPageCount: number;
  // dashboardMembers: MemberInfo[];
  // invitees?: MemberInfo[];
  dashboardId: number;
  createdByMe: boolean;
  // onClick: () => void;
}

export default function ModifyMembers({
  dashboardId,
  createdByMe,
}: ModifyMembersProps) {
  const [rightColorRange, setRightColorRange] = useState(
    ButtonColorRange.Disabled
  );
  const [leftColorRange, setLeftColorRange] = useState(
    ButtonColorRange.Disabled
  );
  const [membersCurrentPage, setMembersCurrentPage] = useState(1);

  const { members, totalCount } = useMembers({
    dashboardId,
    page: membersCurrentPage,
    size: MEMBERS_SIZE,
  });

  const membersTotalPage = Math.ceil(totalCount / MEMBERS_SIZE);

  return (
    <div className={styles.topContainer}>
      <div className={styles.contents}>
        <h3 className={classnames(Typography.xl3Bold, styles.title)}>
          멤버 관리
        </h3>
        <div className={styles.list}>
          <div className={styles.memberListTitle}>
            <span className={Typography.xlBold}>구성원</span>
            <div className={styles.countAndButtons}>
              <span>{`${membersCurrentPage} of ${membersTotalPage}`}</span>
              <div className={styles.arrowButtonWrapper}>
                <button>
                  <ChevronIcon
                    direction={Direction.Left}
                    color={`var(--color-gray${rightColorRange})`}
                  />
                </button>
                <button>
                  <ChevronIcon
                    direction={Direction.Right}
                    color={`var(--color-gray${leftColorRange})`}
                  />
                </button>
              </div>
            </div>
          </div>
          <div className={styles.usersContainer}>
            {members && <UserList members={members} invitees={[]} />}
          </div>
        </div>

        {createdByMe && (
          <div className={styles.list}>
            <div className={styles.memberListTitle}>
              <div className={styles.titleAndButton}>
                <span className={Typography.xlBold}>초대내역</span>
                <Button size={ButtonSize.XSmall}>
                  <span>초대</span>
                  <UserPlusSvg className={styles.icon} />
                </Button>
              </div>
              <div className={styles.countAndButtons}>
                <span>1 of 3</span>
                <div className={styles.arrowButtonWrapper}>
                  <button>
                    <ChevronIcon
                      direction={Direction.Left}
                      color={`var(--color-gray${rightColorRange})`}
                    />
                  </button>
                  <button>
                    <ChevronIcon
                      direction={Direction.Right}
                      color={`var(--color-gray${leftColorRange})`}
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.usersContainer}>
              {/* {invitees && <UserList members={members} invitees={[]} />} */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
