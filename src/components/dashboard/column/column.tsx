import Card from "@/components/dashboard/card/card";
import SettingSvg from "@/components/icon/setting-svg";
import Typography from "@/components/typography";
import { Direction, Menu, MenuItem } from "@/features/card/components/menu";
import { Card as CardData } from "@/types/card";
import { classnames } from "@/utils/classnames";
import { useEffect, useRef } from "react";
import CardSkeleton from "../card/card-skeleton";
import ColumnTitleSkeleton from "./column-title-skeleton";
import styles from "./column.module.css";
import PlusSvg from "./plus-svg";

export enum ColumnActionType {
  Create = "create",
  Modify = "modify",
  Delete = "delete",
}

interface ColumnProps {
  totalCount: number;
  columnTitle: string;
  cards: CardData[];
  isLoadingCards: boolean;
  onCardClick: (card: CardData) => void;
  onClick?: (type: ColumnActionType) => void;
  moreCards?: boolean;
  onLoadMore?: () => void;
}

export default function Column({
  totalCount,
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
      {isLoadingCards && cards.length === 0 ? (
        <ColumnTitleSkeleton />
      ) : (
        <div className={styles.columnTitleWrapper}>
          <div className={styles.columnTitle}>
            <h3
              title={columnTitle}
              className={classnames(Typography.xlSemiBold, styles.columnName)}
            >
              {columnTitle}
            </h3>
            <h3 className={Typography.lgSemiBold}>{totalCount}</h3>
          </div>
          <div className={styles.buttonWrapper}>
            <button
              className={styles.columnTitleButton}
              onClick={() => onClick?.(ColumnActionType.Create)}
            >
              <PlusSvg className={styles.icon} />
            </button>
            <Menu
              items={[
                MenuItem.edit(() => onClick?.(ColumnActionType.Modify)),
                MenuItem.delete(() => onClick?.(ColumnActionType.Delete)),
              ]}
              direction={Direction.Right}
            >
              <SettingSvg
                className={classnames(
                  styles.columnEditIcon,
                  styles.columnTitleButton,
                )}
              />
            </Menu>
          </div>
        </div>
      )}

      <div className={styles.cardsWrapper}>
        {isLoadingCards && cards.length === 0 ? (
          <CardSkeleton />
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
