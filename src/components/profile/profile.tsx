import { ProfileSize } from "@/components/profile/profile-size";
import { ProfileType } from "@/components/profile/profile-type";
import {
  ProfileColorsArray,
  RemainProfileColor,
} from "@/constants/profile-random-color";
import { classnames } from "@/utils/classnames";
import { colorFromString, localeLengthKR } from "@/utils/string-hashing";
import Image from "next/image";
import { useMemo } from "react";
import Typography from "../typography";
import styles from "./profile.module.css";

interface ProfileProps {
  size?: ProfileSize;
  type?: ProfileType;
  colorIndex?: number;
  name?: string;
  profileImageUrl?: string;
  showFullName?: boolean;
  fullNameSize?: string;
  isRemain?: boolean;
}

const IMG_SIZE: Record<ProfileSize, number> = {
  [ProfileSize.SuperLarge]: 120,
  [ProfileSize.XLarge]: 34,
  [ProfileSize.Large]: 30,
  [ProfileSize.Medium]: 26,
  [ProfileSize.Small]: 24,
  [ProfileSize.XSmall]: 20,
};

export default function Profile({
  size = ProfileSize.XSmall,
  type = ProfileType.Normal,
  colorIndex,
  profileImageUrl = "",
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
  const spanClasses = styles.alignCenter;

  const profileClasses = classnames(
    styles.profile,
    type === ProfileType.NavigationBar ? styles.naviType : "",
    styles[size],
    Typography.xsSemiBold
  );

  return (
    <div className={styles.profileSection}>
      {profileImageUrl ? (
        <div className={styles.profileImg}>
          <Image
            src={profileImageUrl}
            width={IMG_SIZE[size]}
            height={IMG_SIZE[size]}
            alt="프로필"
          />
        </div>
      ) : (
        <div className={profileClasses} style={{ backgroundColor }}>
          <span className={spanClasses}>{name[0]}</span>
        </div>
      )}
      {showFullName && (
        <span className={classnames(fullNameSize, styles.showName)}>
          {name}
        </span>
      )}
    </div>
  );
}
