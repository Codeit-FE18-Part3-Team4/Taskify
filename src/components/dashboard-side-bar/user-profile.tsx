import SettingIcon from "@/assets/images/ic-setting.svg";
import Typography from "@/components/typography";
import { useResponsiveValue } from "@/hooks/use-responsive-value";
import Image from "next/image";
import styles from "./dashboard-side-bar.module.css";
import Profile from "../profile/profile";
import { ProfileSize } from "../profile/profile-size";

interface UserProfileProps {
  name?: string;
  profileImageUrl: string | undefined;
}

export function sliceUserName(userName: string | undefined): string {
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
    mobile: Typography.mdBold,
  });

  const handleMyPageUrlClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState(null, '', '/mypage');
  };

  return (
    <div className={styles.footer}>
      <Profile size={ProfileSize.Large} name={name} showFullName />
      <button onClick={handleMyPageUrlClick} className={styles.button}>
        <Image src={SettingIcon} width={20} height={20} alt="세팅 아이콘" />
      </button>
    </div>
  );
}
