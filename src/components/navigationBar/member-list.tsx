import Profile from "@/components/profile/profile";
import { ProfileSize } from "@/components/profile/profile-size";
import { ProfileType } from "@/components/profile/profile-type";
import styles from "./member-list.module.css";
import { MemberInfo } from "@/types/member-info";
import { useSsrResponsive } from "@/hooks/use-ssr-responsive";

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
