import styles from "./profile.module.css";
import {
  ProfileColorsArray,
  RemainProfileColor,
} from "@/constants/profile-random-color";
import { ProfileSize } from "@/components/profile/profile-size";
import { ProfileType } from "@/components/profile/profile-type";
import typographyStyles from "@/components/typography/typography.module.css";
import { classnames } from "@/utils/classnames";
import { useMemo } from "react";
import { colorFromString, localeLengthKR } from "@/utils/string-hashing";

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
  const backgroundColor = useMemo(() => {
    if (isRemain) {
      return RemainProfileColor.backgroundColor;
    }

    if (colorIndex !== undefined) {
      return ProfileColorsArray[colorIndex % ProfileColorsArray.length];
    }

    return colorFromString(name, ProfileColorsArray);
  }, [colorIndex, name, isRemain]);

  const visualLength = localeLengthKR(name);
  const spanClasses =
    visualLength >= 5 ? styles.alignStart : styles.alignCenter;

  const profileClasses = classnames(
    styles.profile,
    type === ProfileType.NavigationBar ? styles.naviType : "",
    styles[size],
    typographyStyles.xsSemiBold,
  );

  return (
    <div className={profileClasses} style={{ backgroundColor }}>
      <span className={spanClasses}>{name}</span>
    </div>
  );
}
