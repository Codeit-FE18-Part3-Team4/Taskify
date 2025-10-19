import Card from "@/components/dashboard/card/card";
import SettingSvg from "@/components/icon/setting-svg";
import Typography from "@/components/typography";
import { Card as CardData } from "@/types/card";
import styles from "./column.module.css";
import PlusSvg from "./plus-svg";
import { classnames } from "@/utils/classnames";

export enum ColumnActionType {
  Create = "create",
  Modify = "modify",
}

interface ColumnProps {
  columnTitle: string;
  cards: CardData[];
  isLoadingCards: boolean;
  onCardClick: (card: CardData) => void;
  onClick?: (type: ColumnActionType) => void;
}

export default function Column({
  columnTitle,
  cards = [],
  isLoadingCards,
  onCardClick,
  onClick,
}: ColumnProps) {
  return (
    <section className={styles.columnContainer}>
      <div className={styles.columnTitleWrapper}>
        <div className={styles.columnTitle}>
          <h3
            title={columnTitle}
            className={classnames(Typography.xlSemiBold, styles.columnName)}
          >
            {columnTitle}
          </h3>
          <h3 className={Typography.lgSemiBold}>{cards.length}</h3>
        </div>
        <div className={styles.buttonWrapper}>
          <button onClick={() => onClick?.(ColumnActionType.Create)}>
            <PlusSvg className={styles.icon} />
          </button>
          <button onClick={() => onClick?.(ColumnActionType.Modify)}>
            <SettingSvg className={styles.icon} />
          </button>
        </div>
      </div>
      {isLoadingCards ? (
        <div>카드 로딩중...</div>
      ) : (
        cards.map((card) => (
          <div key={card.id}>
            <Card card={card} onClick={() => onCardClick(card)} />
          </div>
        ))
      )}
    </section>
  );
}
