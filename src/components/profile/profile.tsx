import { ProfileSize } from "@/components/profile/profile-size";
import { ProfileType } from "@/components/profile/profile-type";
import {
  ProfileColorsArray,
  RemainProfileColor,
} from "@/constants/profile-random-color";
import { classnames } from "@/utils/classnames";
import { colorFromString, localeLengthKR } from "@/utils/string-hashing";
import { useMemo } from "react";
import Typography from "../typography";
import styles from "./profile.module.css";

interface ProfileProps {
  size?: ProfileSize;
  type?: ProfileType;
  colorIndex?: number;
  name?: string;
  showFullName?: boolean;
  fullNameSize?: string;
  isRemain?: boolean;
}

export default function Profile({
  size = ProfileSize.XSmall,
  type = ProfileType.Normal,
  colorIndex,
  name = "",
  showFullName = false,
  fullNameSize = Typography.lgBold,
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
    Typography.xsSemiBold
  );

  return (
    <div className={styles.profileSection}>
      <div className={profileClasses} style={{ backgroundColor }}>
        <span className={spanClasses}>{name}</span>
      </div>
      {showFullName && (
        <span className={classnames(fullNameSize, styles.showName)}>
          {name}
        </span>
      )}
      <div className={profileClasses} style={{ backgroundColor }}>
        <span className={spanClasses}>{name}</span>
      </div>
    </div>
  );
}
