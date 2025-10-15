import SettingIcon from "@/assets/images/ic-setting.svg";
import Typography from "@/components/typography";
import { useResponsiveValue } from "@/hooks/use-responsive-value";
import Image from "next/image";
import styles from "./dashboard-side-bar.module.css";

interface UserProfileProps {
  name?: string;
  profileImageUrl: string | undefined;
}

function sliceUserName(userName: string | undefined): string {
  if (!userName || userName.length <= 1) {
    return userName || '';
  }
  return userName.substring(1);
}

export default function UserProfile({
  name,
  profileImageUrl,
}: UserProfileProps) {
  const userName = useResponsiveValue({
    desktop: Typography.lgBold,
    tablet: Typography.mdBold,
    mobile: Typography.mdBold
  })

  return (
    <div className={styles.footer}>
      <div className={styles.userBox}>
        <div className={`${styles.userProfile} ${Typography.xsSemiBold}`}>
          {profileImageUrl ? (
            <Image
              src={profileImageUrl}
              width={30}
              height={30}
              alt="유저 프로필"
            />
          ) : (
            <span>{sliceUserName(name)}</span>
          )}
        </div>
        <p className={userName}>{name}</p>
      </div>
      <button className={styles.button}>
        <Image src={SettingIcon} width={20} height={20} alt="세팅 아이콘" />
      </button>
    </div>
  );
}
