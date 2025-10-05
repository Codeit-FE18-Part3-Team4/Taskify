import Typography from "@/components/typography";
import { useResponsive } from "@/hooks/use-responsive";
import { classnames } from "@/utils/classnames";
import {
  MouseEventHandler,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./dropdown.module.css";

export interface DropdownOption {
  element: ReactNode;
  value: string;
}

interface DropdownContainerProps {
  options: DropdownOption[];
  onSelect: (value: string) => void;
}

function DropdownContainer({ options, onSelect }: DropdownContainerProps) {
  const { isMobile } = useResponsive();

  const scrollableOrEmpty = useMemo(() => {
    const maxVisibleOptions = isMobile ? 3 : 5;
    return options.length > maxVisibleOptions ? styles.scrollable : "";
  }, [options, isMobile]);

  const handleOptionClick = (index: number) => {
    onSelect(options[index].value);
  };

  return (
    <div
      className={classnames(styles.dropdown, scrollableOrEmpty)}
      tabIndex={0}
    >
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
            {option.element}
          </div>
        ))}
      </div>
    </div>
  );
}

interface Props {
  options: DropdownOption[];
  children: ReactNode;
  onSelect?: (index: string) => void;
}

export default function Dropdown({ options, children, onSelect }: Props) {
  const [isShow, setShow] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleAnchorClick: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    setShow((prev) => !prev);
  };

  const handleOptionSelect = (value: string) => {
    onSelect?.(value);
    setShow(false);
  };

  useEffect(() => {
    function handleMouseUp(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        if (!isShow) return;
        setShow(false);
      }
    }

    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isShow]);

  return (
    <div className={styles.container} ref={dropdownRef}>
      <div onClick={handleAnchorClick}>{children}</div>
      {isShow && (
        <DropdownContainer options={options} onSelect={handleOptionSelect} />
      )}
    </div>
  );
}
