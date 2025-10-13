import { useEffect, useState } from "react";
import Card from "@/components/dashboard/card/card";
import { getCards } from "@/components/dashboard/card/api/cards";
import styles from "./column.module.css";
import { Card as CardData } from "@/types/card";
import SettingSvg from "@/components/navigationBar/setting-svg";
import Typography from "@/components/typography";
import PlusSvg from "./plus-svg";

interface ColumnProps {
  columnTitle: string;
  columnId: number;
  onCardClick: (card: CardData) => void;
  onClick?: (type: "create" | "modify") => void;
}

export default function Column({
  columnTitle,
  columnId,
  onCardClick,
  onClick,
}: ColumnProps) {
  const [cards, setCards] = useState<CardData[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { cards } = await getCards({ columnId });
        setCards(cards);
      } catch (e) {
        console.error(e);
      }
    };
    loadData();
  }, [columnId]);

  return (
    <section className={styles.columnContainer}>
      <div className={styles.columnTitleWrapper}>
        <div className={styles.columnTitle}>
          <h3 className={Typography.xlSemiBold}>{columnTitle}</h3>
          <h3 className={Typography.lgSemiBold}>{cards.length}</h3>
        </div>
        <div className={styles.buttonWrapper}>
          <button onClick={() => onClick?.("create")}>
            <PlusSvg className={styles.icon} color={"var(--color-brand500"} />
          </button>
          <button onClick={() => onClick?.("modify")}>
            <SettingSvg className={styles.icon} color={"var(--color-gray400"} />
          </button>
        </div>
      </div>
      {cards.map((card, index) => (
        <div>
          <Card key={index} card={card} onClick={() => onCardClick(card)} />
        </div>
      ))}
    </section>
  );
}
