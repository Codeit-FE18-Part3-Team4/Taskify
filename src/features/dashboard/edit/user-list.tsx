import Button, { ButtonSize, ButtonVariant } from "@/components/button/button";
import Profile from "@/components/profile/profile";
import { ProfileSize } from "@/components/profile/profile-size";
import { classnames } from "@/utils/classnames";
import styles from "./user-list.module.css";
import { MemberInfo } from "@/types";
import { useEffect, useState } from "react";
import Typography from "@/components/typography";

enum ProfileType {
  Members,
  Invitiees,
  NoUsers,
}

interface UserListProps {
  members: MemberInfo[];
  invitees: MemberInfo[];
}

export default function UserList({ members, invitees }: UserListProps) {
  const [profileType, setProfileType] = useState<ProfileType | null>(null);

  useEffect(() => {
    if (members.length) {
      setProfileType(ProfileType.Members);
    } else if (invitees.length) {
      setProfileType(ProfileType.Invitiees);
    } else {
      setProfileType(ProfileType.NoUsers);
    }
  }, [members, invitees]);

  if (profileType === ProfileType.NoUsers) {
    return (
      <h3 className={classnames(Typography.smMedium, styles.exceptionText)}>
        유저 정보가 없습니다
      </h3>
    );
  }

  console.log(members);

  return (
    <>
      {profileType === ProfileType.Members ? (
        <>
          {members?.map((member, index) => (
            <div
              key={index}
              className={classnames(styles.userList, styles.member)}
            >
              <Profile
                showFullName
                size={ProfileSize.Large}
                name={member.nickname}
              />
              <Button
                size={ButtonSize.XSmall}
                variant={ButtonVariant.Secondary}
              >
                삭제
              </Button>
            </div>
          ))}
        </>
      ) : (
        <>
          {invitees?.map((invitee, index) => (
            <div key={index} className={styles.userList}>
              <Profile
                showFullName
                size={ProfileSize.Large}
                name={invitee.nickname}
              />
              <Button
                size={ButtonSize.XSmall}
                variant={ButtonVariant.Secondary}
              >
                취소
              </Button>
            </div>
          ))}
        </>
      )}
    </>
  );
}
