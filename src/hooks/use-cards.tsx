import { getCards } from "@/components/dashboard/card/api/cards";
import { useAuthEffect } from "@/features/auth/components/auth-provider";
import { Card } from "@/types/card";
import { useCallback, useState } from "react";

export type ColumnCardData = {
  cards: Card[];
  moreCards: boolean;
  cursorId: number | null;
  totalCount: number;
};

export function useCards(columnIds: number[], size = 20) {
  const [columnCardsData, setColumnCardsData] = useState<Record<
    number,
    ColumnCardData
  > | null>(null);
  const [isLoadingCards, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getCardData = useCallback(
    async ({ loading }: { loading: boolean } = { loading: true }) => {
      setIsLoading(loading);
      setError(null);

      try {
        if (columnIds.length === 0) {
          setColumnCardsData(null);
          return;
        }

        const cardsPromises = columnIds.map((columnId) =>
          getCards({ columnId, size, cursorId: null }),
        );
        const cardsDataList = await Promise.all(cardsPromises);

        const cardsMap: Record<number, ColumnCardData> = columnIds.reduce(
          (acc, columnId, index) => {
            acc[columnId] = {
              cards: cardsDataList[index].cards,
              cursorId: cardsDataList[index].cursorId,
              moreCards: cardsDataList[index].cursorId !== null,
              totalCount: cardsDataList[index].totalCount,
            };
            return acc;
          },
          {} as Record<number, ColumnCardData>,
        );

        setColumnCardsData(cardsMap);
      } catch (e) {
        console.log(e);
        setError(e as Error);
        setColumnCardsData(null);
        throw e;
      } finally {
        setIsLoading(false);
      }
    },
    [columnIds, size],
  );

  const loadMoreCards = useCallback(
    async (columnId: number) => {
      if (!columnCardsData?.[columnId]) return;

      const currentData = columnCardsData[columnId];
      if (!currentData.cursorId || !currentData.moreCards) return;

      setIsLoading(true);

      try {
        const newData = await getCards({
          columnId,
          size,
          cursorId: currentData.cursorId,
        });

        setColumnCardsData((prev) => {
          if (!prev) return prev;

          return {
            ...prev,
            [columnId]: {
              cards: [...prev[columnId].cards, ...newData.cards],
              cursorId: newData.cursorId,
              moreCards: newData.cursorId !== null,
              totalCount: newData.totalCount,
            },
          };
        });
      } catch (e) {
        console.error(e);
        setError(e as Error);
      } finally {
        setIsLoading(false);
      }
    },
    [columnCardsData, size],
  );

  useAuthEffect(() => {
    getCardData();
  }, [getCardData]);

  return {
    columnCardsData,
    isLoadingCards,
    error,
    reloadCards: getCardData,
    loadMoreCards,
  };
}
