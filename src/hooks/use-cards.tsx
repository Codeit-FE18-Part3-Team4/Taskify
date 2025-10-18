import { getCards } from "@/components/dashboard/card/api/cards";
import { useAuth } from "@/features/auth/components/auth-provider";
import { Card } from "@/types/card";
import { useCallback, useEffect, useState } from "react";

export function useCards(columnIds: number[]) {
  const [cards, setCards] = useState<Record<number, Card[]> | null>(null);
  const [isLoadingCards, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { isLoadingToken } = useAuth();

  const getCardData = useCallback(
    async ({ loading }: { loading: boolean } = { loading: true }) => {
      setIsLoading(loading);
      setError(null);

      try {
        if (columnIds.length === 0) {
          setCards(null);
          return;
        }

        const cardsPromises = columnIds.map((columnId) =>
          getCards({ columnId })
        );
        const cardsDataList = await Promise.all(cardsPromises);

        const cardsMap = columnIds.reduce(
          (acc: Record<number, Card[]>, columnId, index) => {
            acc[columnId] = cardsDataList[index].cards;
            return acc;
          },
          {}
        );

        setCards(cardsMap);
      } catch (e) {
        console.log(e);
        setError(e as Error);
        setCards(null);
        throw e;
      } finally {
        setIsLoading(false);
      }
    },
    [columnIds]
  );

  useEffect(() => {
    if (isLoadingToken) return;
    getCardData();
  }, [isLoadingToken, getCardData]);

  return { cards, isLoadingCards, error, reloadCards: getCardData };
}
