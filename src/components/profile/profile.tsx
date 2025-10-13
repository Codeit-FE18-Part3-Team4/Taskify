import styles from "./profile.module.css";
import { ProfileColorsArray, RemainProfileColor } from "@/constants/profile-random-color";
import { ProfileSize } from "@/components/profile/profile-size";
import { ProfileType } from "@/components/profile/profile-type";
import typographyStyles from "@/components/typography/typography.module.css";
import { classnames } from "@/utils/classnames";
import { useMemo } from "react";
import { getColorIndex, getVisualLength } from "@/utils/string-converter";

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
  colorIndex,
  name = "",
  isRemain = false,
}: ProfileProps) {
  const calculateColorIndex = useMemo(() => {
    if (colorIndex !== undefined) {
      return colorIndex % ProfileColorsArray.length;
    }
    return getColorIndex(name, ProfileColorsArray.length);
  }, [colorIndex, name]);

  const color = isRemain
    ? RemainProfileColor.backgroundColor
    : ProfileColorsArray[calculateColorIndex];

  const visualLength = getVisualLength(name);
  const spanClasses = visualLength >= 5 ? styles.alignStart : styles.alignCenter;

  const profileClasses = classnames(
    styles.profile,
    type === ProfileType.NavigationBar ? styles.naviType : "",
    styles[size],
    typographyStyles.xsSemiBold,
  );

  return (
    <div className={profileClasses} style={{ backgroundColor: color }}>
      <span className={spanClasses}>{name}</span>
    </div>
  );
}
