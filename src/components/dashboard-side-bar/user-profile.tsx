import { SettingIcon } from "@/assets/images";
import Profile from "@/components/profile/profile";
import { ProfileSize } from "@/components/profile/profile-size";
import { UserProfileProps } from "@/types/dashboard-side-bar";
import Image from "next/image";
import styles from "./dashboard-side-bar.module.css";

export default function UserProfile({
  name,
  profileImageUrl,
  onClick,
}: UserProfileProps) {
  return (
    <div className={styles.footer}>
      <Profile
        profileImageUrl={profileImageUrl}
        size={ProfileSize.Large}
        name={name}
        showFullName
      />
      <button onClick={onClick} className={styles.button}>
        <Image src={SettingIcon} width={20} height={20} alt="세팅 아이콘" />
      </button>
    </div>
  );
}
