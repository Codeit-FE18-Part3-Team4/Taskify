import styles from "./profile.module.css";
import {
  ProfileColors,
  RemainProfileColor,
} from "@/constants/profile/profile-colors";
import { ProfileSize } from "@/constants/profile/profile-size";
import { ProfileType } from "@/constants/profile/profile-type";
import typographyStyles from "@/components/typography/typography.module.css";

interface ProfileProps {
  size?: ProfileSize;
  type?: ProfileType;
  colorIndex?: number;
  name?: string;
  isRemain?: boolean;
}

export default function Profile({
  size = ProfileSize.XSmall,
  type = ProfileType.Normal,
  colorIndex = 0,
  name = "",
  isRemain = false,
}: ProfileProps) {
  const calculateColorIndex = colorIndex % 7;
  const color = isRemain
    ? RemainProfileColor.Blue
    : ProfileColors[calculateColorIndex];
  const NavigationBarClasses = `${styles.profile} ${type === ProfileType.NavigationBar ? styles.naviType : ""} ${styles[size]} ${typographyStyles.xsSemiBold}`;
  const spanClasses = name.length >= 3 ? styles.alignStart : styles.alignCenter;

  return (
    <div
      className={NavigationBarClasses}
      style={{ backgroundColor: color, marginLeft: "-12px" }}
    >
      <span className={spanClasses}>{name}</span>
    </div>
  );
}
