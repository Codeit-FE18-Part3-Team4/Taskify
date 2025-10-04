import { classnames } from "@/utils/classnames";
import { ReactNode, useState } from "react";
import Typography from "../typography";
import styles from "./dropdown.module.css";

interface Props {
  options: ReactNode[];
  children: ReactNode;
  onSelect?: (index: number) => void;
}

export default function Dropdown({ options, children, onSelect }: Props) {
  const [isShow, setShow] = useState(false);

  const handleAnchorClick = () => {
    setShow((prev) => !prev);
  };

  const handleOptionClick = (index: number) => {
    onSelect?.(index);
    setShow(false);
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
                onClick={() => handleOptionClick(index)}
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
