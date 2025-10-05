import styles from "./profile.module.css";
import { ProfileColors } from "@/constants/profile/profile-colors";
import { ProfileSize, ProfileType } from "@/constants/profile/profile";
import typographyStyles from "@/components/typography/typography.module.css";

interface ProfileProps {
  size?: ProfileSize;
  type?: ProfileType;
  colorIndex?: number;
  name?: string;
}

export default function Profile({
  size = ProfileSize.XSmall,
  type = ProfileType.Normal,
  colorIndex = 0,
  name = "",
}: ProfileProps) {
  const calculateColorIndex = colorIndex % 7;
  const color = ProfileColors[calculateColorIndex];
  const NavigationBarClasses = `${styles.profile} ${type === ProfileType.NavigationBar ? styles.naviType : ""} ${styles[size]} ${typographyStyles.xsSemiBold}`;

  return (
    <div className={NavigationBarClasses} style={{ backgroundColor: color }}>
      <span>{name}</span>
    </div>
  );
}
