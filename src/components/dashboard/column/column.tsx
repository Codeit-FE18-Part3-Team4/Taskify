import Card from "@/components/dashboard/card/card";
import styles from "./column.module.css";
import { Card as CardData } from "@/types/card";
import SettingSvg from "@/components/navigationBar/setting-svg";
import Typography from "@/components/typography";
import PlusSvg from "./plus-svg";

interface ColumnProps {
  columnTitle: string;
  cards: CardData[];
  onCardClick: (card: CardData) => void;
  onClick?: (type: "create" | "modify") => void;
}

export default function Column({
  columnTitle,
  cards = [],
  onCardClick,
  onClick,
}: ColumnProps) {
  return (
    <section className={styles.columnContainer}>
      <div className={styles.columnTitleWrapper}>
        <div className={styles.columnTitle}>
          <h3 className={Typography.xlSemiBold}>{columnTitle}</h3>
          <h3 className={Typography.lgSemiBold}>{cards.length}</h3>
        </div>
        <div className={styles.buttonWrapper}>
          <button onClick={() => onClick?.("create")}>
            <PlusSvg className={styles.icon} />
          </button>
          <button onClick={() => onClick?.("modify")}>
            <SettingSvg className={styles.icon} />
          </button>
        </div>
      </div>
      {cards.map((card) => (
        <div key={card.id}>
          <Card card={card} onClick={() => onCardClick(card)} />
        </div>
      ))}
    </section>
  );
}
