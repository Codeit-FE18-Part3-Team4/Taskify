import Card from "@/components/dashboard/card/card";
import SettingSvg from "@/components/icon/setting-svg";
import Typography from "@/components/typography";
import { Card as CardData } from "@/types/card";
import styles from "./column.module.css";
import PlusSvg from "./plus-svg";
import { classnames } from "@/utils/classnames";
import { useEffect, useRef } from "react";

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
  moreCards?: boolean;
  onLoadMore?: () => void;
}

export default function Column({
  columnTitle,
  cards = [],
  isLoadingCards,
  onCardClick,
  onClick,
  moreCards = false,
  onLoadMore,
}: ColumnProps) {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!observerRef.current || !moreCards || isLoadingCards || !onLoadMore)
      return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      },
    );

    observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [moreCards, isLoadingCards, onLoadMore]);

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
      <div className={styles.cardsWrapper}>
        {isLoadingCards && cards.length === 0 ? (
          <div>카드 로딩중...</div>
        ) : (
          <>
            {cards.map((card) => (
              <div key={card.id}>
                <Card card={card} onClick={() => onCardClick(card)} />
              </div>
            ))}

            {moreCards && (
              <div
                ref={observerRef}
                style={{ height: "20px", width: "100%" }}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}
