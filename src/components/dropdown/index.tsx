import Typography from "@/components/typography";
import { useResponsive } from "@/hooks/use-responsive";
import { classnames } from "@/utils/classnames";
import { ReactNode, useMemo, useState } from "react";
import styles from "./dropdown.module.css";

function DropdownContainer({
  options,
  onSelect,
}: {
  options: ReactNode[];
  onSelect?: (index: number) => void;
}) {
  const { isMobile } = useResponsive();

  const scrollableOrEmpty = useMemo(() => {
    const maxVisibleOptions = isMobile ? 3 : 5;
    return options.length > maxVisibleOptions ? styles.scrollable : "";
  }, [options, isMobile]);

  const handleOptionClick = (index: number) => {
    onSelect?.(index);
  };

  return (
    <div className={classnames(styles.dropdown, scrollableOrEmpty)}>
      <div className={styles.dropdownContent}>
        {options.map((option, index) => (
          <div
            key={`dropdown-${index}`}
            className={classnames(
              styles.dropdownOption,
              scrollableOrEmpty,
              Typography.lgMedium
            )}
            onClick={() => handleOptionClick(index)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
}

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

  const handleOptionSelect = (index: number) => {
    onSelect?.(index);
    setShow(false);
  };

  return (
    <div className={styles.container}>
      <div onClick={handleAnchorClick}>{children}</div>
      {isShow && (
        <DropdownContainer options={options} onSelect={handleOptionSelect} />
      )}
    </div>
  );
}
