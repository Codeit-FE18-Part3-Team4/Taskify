import { classnames } from "@/utils/classnames";
import { ReactNode, useState } from "react";
import Typography from "../typography";
import styles from "./dropdown.module.css";

interface Props {
  options: ReactNode[];
  children: ReactNode;
}

export default function Dropdown({ options, children }: Props) {
  const [isShow, setShow] = useState(false);

  const handleAnchorClick = () => {
    setShow((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <div onClick={handleAnchorClick}>{children}</div>
      {isShow && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownContent}>
            {options.map((option, index) => (
              <div
                key={`dropdown-${index}`}
                className={classnames(
                  styles.dropdownOption,
                  Typography.lgMedium
                )}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
