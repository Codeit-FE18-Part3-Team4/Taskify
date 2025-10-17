import { Color } from "@/components/color";
import EditIcon from "@/components/icon/edit-icon";
import Typography from "@/components/typography";
import { classnames } from "@/utils/classnames";
import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import styles from "./menu-item.module.css";

enum MenuItemType {
  Normal,
  Delete,
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  $type?: MenuItemType;
  icon: ReactNode;
  title: string;
}

export function MenuItem({
  $type = MenuItemType.Normal,
  icon,
  title,
  ...props
}: Props) {
  return (
    <button className={styles.menuItem} {...props}>
      {icon}
      <span
        className={classnames(
          Typography.lgMedium,
          $type === MenuItemType.Delete ? styles.delete : ""
        )}
      >
        {title}
      </span>
    </button>
  );
}

MenuItem.edit = function (onClick?: MouseEventHandler<HTMLButtonElement>) {
  return (
    <MenuItem
      icon={<EditIcon size={20} color={Color.Gray200} />}
      title="수정하기"
      onClick={onClick}
    />
  );
};
MenuItem.delete = function (onClick?: MouseEventHandler<HTMLButtonElement>) {
  return (
    <MenuItem
      $type={MenuItemType.Delete}
      icon={<EditIcon size={20} color={Color.Red} />}
      title="삭제하기"
      onClick={onClick}
    />
  );
};
