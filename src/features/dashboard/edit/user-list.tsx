import Button, { ButtonSize, ButtonVariant } from "@/components/button/button";
import Profile from "@/components/profile/profile";
import { ProfileSize } from "@/components/profile/profile-size";
import { classnames } from "@/utils/classnames";
import styles from "./user-list.module.css";
import { Dashboard, MemberInfo } from "@/types";
import { useEffect, useState } from "react";
import { Invitations } from "@/types/dashboard-invitations";
import { UserListType } from "./modify-members";
import { getUserInfo } from "@/features/my-dashboard/api";
import { useAuthEffect } from "@/features/auth/components/auth-provider";
import CrownIcon from "@/assets/images/ic-crown.svg";
import Image from "next/image";

enum ProfileType {
  Members,
  Invitees,
  NoUsers,
}

interface UserListProps {
  members: MemberInfo[];
  invitations: Invitations[];
  onClickButton: (
    type: UserListType,
    id: number,
    nickName: string,
    email?: string,
  ) => void;
  createdByMe: boolean;
  dashboard: Dashboard;
}

interface IsCreator extends MemberInfo {
  creator?: boolean;
}

export default function UserList({
  members,
  invitations,
  onClickButton,
  createdByMe = false,
  dashboard,
}: UserListProps) {
  const [myId, setMyId] = useState<number | null>(null);
  const [orderedMembers, setOrderedMembers] = useState<IsCreator[]>([]);
  const [profileType, setProfileType] = useState<ProfileType | null>(null);

  useAuthEffect(() => {
    (async () => {
      const { id } = await getUserInfo();
      setMyId(id);
    })();
  });

  useEffect(() => {
    let creatorId;
    if (createdByMe) {
      creatorId = myId;
    } else {
      creatorId = dashboard.userId;
    }
    const updated = members.map((member) =>
      member.userId === creatorId ? { ...member, creator: true } : member,
    );
    setOrderedMembers(updated);
  }, [createdByMe, dashboard.userId, members, myId]);

  useEffect(() => {
    if (members.length) {
      setProfileType(ProfileType.Members);
    } else if (invitations.length) {
      setProfileType(ProfileType.Invitees);
    } else {
      setProfileType(ProfileType.NoUsers);
    }
  }, [members, invitations]);

  if (profileType === ProfileType.NoUsers) {
    return <span className={styles.exception}>유저 정보가 없습니다</span>;
  }

  return (
    <div className={styles.topContainer}>
      {profileType === ProfileType.Members ? (
        <>
          {orderedMembers?.map((member, index) => (
            <div
              key={index}
              className={classnames(styles.userList, styles.member)}
            >
              <Profile
                showFullName
                size={ProfileSize.Large}
                name={member.nickname}
              />
              {member.creator ? (
                <div className={styles.iconWrapper}>
                  <Image
                    className={styles.crownIcon}
                    src={CrownIcon}
                    width={20}
                    height={20}
                    alt="내 대시보드 아이콘"
                  />
                </div>
              ) : (
                <>
                  {createdByMe && (
                    <Button
                      size={ButtonSize.XSmall}
                      variant={ButtonVariant.Secondary}
                      onClick={() =>
                        onClickButton(
                          UserListType.Members,
                          member.id,
                          member.nickname,
                        )
                      }
                    >
                      삭제
                    </Button>
                  )}
                </>
              )}
            </div>
          ))}
        </>
      ) : (
        <>
          {invitations?.map((invitation, index) => (
            <div key={index} className={styles.userList}>
              <span>{invitation.invitee.email}</span>
              <Button
                size={ButtonSize.XSmall}
                variant={ButtonVariant.Secondary}
                onClick={() =>
                  onClickButton(
                    UserListType.Invitees,
                    invitation.id,
                    invitation.invitee.nickname,
                    invitation.invitee.email,
                  )
                }
              >
                취소
              </Button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
