import Profile from "@/components/profile/profile";
import { ProfileSize, ProfileType } from "@/constants/profile/profile";
import styles from "./member-list.module.css";
import { MemberInfo } from "@/constants/profile/member-info";

interface MembersProps {
  showMembers: MemberInfo[];
  hideMembers: MemberInfo[];
}

export default function NavigationBarMemberList({
  showMembers,
  hideMembers,
}: MembersProps) {
  const iconColor = `var(--color-gray400)`;

  return (
    <>
      <div className={styles.users}>
        {showMembers.map((member, index) => (
          <Profile
            key={index}
            name={member.nickname}
            colorIndex={index}
            size={ProfileSize.XLarge}
            type={ProfileType.NavigationBar}
          />
        ))}
        {hideMembers.length > 0 && (
          <Profile
            name={`+${hideMembers.length}`}
            colorIndex={0}
            size={ProfileSize.XLarge}
            type={ProfileType.NavigationBar}
            isRemain={true}
          />
        )}
      </div>
      <div style={{ color: iconColor }}>|</div>
    </>
  );
}
