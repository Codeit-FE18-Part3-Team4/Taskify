import ChevronIcon, { Direction } from "@/components/icon/chevron-icon";
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
  options: DropdownOption[] | string[];
  onSelect: (value: string) => void;
}

function DropdownContainer({ options, onSelect }: DropdownContainerProps) {
  const { isMobile } = useResponsive();

  const scrollableOrEmpty = useMemo(() => {
    const maxVisibleOptions = isMobile ? 3 : 5;
    return options.length > maxVisibleOptions ? styles.scrollable : "";
  }, [options, isMobile]);

  const handleOptionClick = (index: number) => {
    onSelect(
      typeof options[index] === "string" ? options[index] : options[index].value
    );
  };

  return (
    <div
      className={classnames(styles.dropdown, scrollableOrEmpty)}
      tabIndex={0}
    >
      <div className={classnames(styles.dropdownContent, scrollableOrEmpty)}>
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
            {typeof option === "string" ? option : option.element}
          </div>
        ))}
      </div>
    </div>
  );
}

interface Props {
  placeholder?: string;
  options: DropdownOption[] | string[];
  children: ReactNode;
  onSelect?: (index: string) => void;
}

export default function Dropdown({
  placeholder,
  options,
  children,
  onSelect,
}: Props) {
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
      <div
        className={classnames(styles.anchor, isShow ? styles.showing : "")}
        onClick={handleAnchorClick}
      >
        <span className={isShow || children ? styles.highlight : ""}>
          {children || placeholder || ""}
        </span>
        <ChevronIcon
          direction={isShow ? Direction.Up : Direction.Down}
          size={18}
          color="#F8F7FA" // gray100
        />
      </div>
      {isShow && (
        <DropdownContainer options={options} onSelect={handleOptionSelect} />
      )}
    </div>
  );
}
