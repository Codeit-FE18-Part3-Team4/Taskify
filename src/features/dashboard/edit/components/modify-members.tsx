import Typography from "@/components/typography";
import styles from "./modify-members.module.css";
import { classnames } from "@/utils/classnames";
import Button, { ButtonSize, ButtonVariant } from "@/components/button/button";
import Profile from "@/components/profile/profile";
import { ProfileSize } from "@/components/profile/profile-size";
import ChevronIcon, { Direction } from "@/components/icon/chevron-icon";
import { useState } from "react";
import { MemberInfo } from "@/types/member-info";
import UserPlusSvg from "@/components/navigationBar/user-plus-svg";

enum ButtonColorRange {
  Disabled = 500,
  Enabled = 200,
}

interface ModifyMembersProps {
  totalMembersPageCount: number;
  currentMembersPageCount: number;
  totalInvitationPageCount: number;
  currentInvitationPageCount: number;
  dashboardMembers: MemberInfo[];
  invitees?: MemberInfo[];
  createdByMe: boolean;
}

export default function ModifyMembers() {
  const [rightColorRange, setRightColorRange] = useState(
    ButtonColorRange.Disabled,
  );
  const [leftColorRange, setLeftColorRange] = useState(
    ButtonColorRange.Disabled,
  );

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
            {Array(6)
              .fill(null)
              .map((_, i) => (
                <div className={classnames(styles.usersList, styles.member)}>
                  <Profile
                    showFullName
                    size={ProfileSize.Large}
                    name="김정은"
                  />
                  <Button
                    size={ButtonSize.XSmall}
                    variant={ButtonVariant.Secondary}
                  >
                    삭제
                  </Button>
                </div>
              ))}
          </div>
        </div>

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
            {Array(6)
              .fill(null)
              .map((_, i) => (
                <div className={styles.usersList}>
                  <span>test{i + 1}@email.com</span>
                  <Button
                    size={ButtonSize.XSmall}
                    variant={ButtonVariant.Secondary}
                  >
                    취소
                  </Button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
