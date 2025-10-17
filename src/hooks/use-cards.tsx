import { getCards } from "@/components/dashboard/card/api/cards";
import { useEffectAuth } from "@/features/auth/components/auth-provider";
import { Card } from "@/types/card";
import { useState } from "react";

export function useCards(columnIds: number[]) {
  const [cards, setCards] = useState<Record<number, Card[]> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffectAuth(() => {
    if (columnIds.length === 0) {
      setCards(null);
      return;
    }

    const getCardData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const cardsPromises = columnIds.map((columnId) =>
          getCards({ columnId }),
        );
        const cardsDataList = await Promise.all(cardsPromises);

        const cardsMap = columnIds.reduce(
          (acc: Record<number, Card[]>, columnId, index) => {
            acc[columnId] = cardsDataList[index].cards;
            return acc;
          },
          {},
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
    };

    getCardData();
  }, [columnIds]);

  return { cards, isLoading, error };
}
