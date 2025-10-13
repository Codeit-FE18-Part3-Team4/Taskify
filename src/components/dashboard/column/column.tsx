import { useEffect, useState } from "react";
import Card from "@/components/dashboard/card/card";
import { getCards } from "@/components/dashboard/card/api/dashboard";
import styles from "./column.module.css";
import { Card as CardData } from "@/types/card";

interface ColumnProps {
  columnId: number;
  onCardClick: (card: CardData) => void;
}

export default function Column({ columnId, onCardClick }: ColumnProps) {
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
    <section className={styles.columnComtainer}>
      {cards.map((card, index) => (
        <Card key={index} card={card} onClick={() => onCardClick(card)} />
      ))}
    </section>
  );
}
