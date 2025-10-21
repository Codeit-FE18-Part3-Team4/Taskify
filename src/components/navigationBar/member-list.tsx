import Profile from "@/components/profile/profile";
import { ProfileSize } from "@/components/profile/profile-size";
import { ProfileType } from "@/components/profile/profile-type";
import { useSsrResponsive } from "@/hooks/use-ssr-responsive";
import { MemberInfo } from "@/types/member-info";
import styles from "./member-list.module.css";

interface MembersProps {
  showMembers: MemberInfo[];
  hideMembers: MemberInfo[];
}

export default function NavigationBarMemberList({
  showMembers,
  hideMembers,
}: MembersProps) {
  const iconColor = `var(--color-gray400)`;

  const { isDesktop, isTablet } = useSsrResponsive();
  const profileSize = isDesktop
    ? ProfileSize.XLarge
    : isTablet
      ? ProfileSize.Medium
      : ProfileSize.Small;

  return (
    <>
      <div className={styles.users}>
        {showMembers.map((member, index) => (
          <Profile
            key={index}
            name={member.nickname}
            colorIndex={index}
            size={profileSize}
            type={ProfileType.NavigationBar}
          />
        ))}
        {hideMembers.length > 0 && (
          <Profile
            name={`+${hideMembers.length}`}
            colorIndex={0}
            size={profileSize}
            type={ProfileType.NavigationBar}
            isRemain={true}
          />
        )}
      </div>
      <div style={{ color: iconColor }}>|</div>
    </>
  );
}
