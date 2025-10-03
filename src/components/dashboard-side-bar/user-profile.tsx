import SettingIcon from "@/assets/images/ic-setting.svg";
import Typography from "@/components/typography/typography";
import Image from "next/image";
import styles from "./dashboard-side-bar.module.css";

interface UserProfileProps {
  name: string;
  profileImageUrl: string | undefined;
}

function sliceUserName(userName: string) {
  return userName.length > 1 ? userName.substring(1) : userName;
}

export default function UserProfile({
  name,
  profileImageUrl,
}: UserProfileProps) {
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
        <p className={Typography.lgBold}>{name}</p>
      </div>
      <button className={styles.button}>
        <Image src={SettingIcon} width={20} height={20} alt="세팅 아이콘" />
      </button>
    </div>
  );
}
