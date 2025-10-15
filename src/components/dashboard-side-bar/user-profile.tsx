import SettingIcon from "@/assets/images/ic-setting.svg";
import Typography from "@/components/typography";
import { useResponsiveValue } from "@/hooks/use-responsive-value";
import Image from "next/image";
import Profile from "../profile/profile";
import { ProfileSize } from "../profile/profile-size";
import styles from "./dashboard-side-bar.module.css";

interface UserProfileProps {
  name?: string;
  profileImageUrl: string | undefined;
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
