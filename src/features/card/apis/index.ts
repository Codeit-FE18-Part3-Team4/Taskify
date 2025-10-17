import axiosInstance from "@/services/axios-instance";
import { withThrowingAxiosError } from "@/services/with-throwing-axios-error";
import { Card } from "@/types/card";

export async function updateCard({
  userId,
  card,
}: {
  userId: number;
  card: Partial<Card>;
}): Promise<Card> {
  return withThrowingAxiosError<Card>(async () => {
    const response = await axiosInstance.put(`/cards/${card.id}`, {
      columnId: card.columnId,
      assigneeUserId: userId,
      title: card.title,
      description: card.description,
      dueDate: card.dueDate,
      tags: card.tags,
      imageUrl: card.imageUrl,
    });

    return response.data;
  });
}

export async function deleteCard({
  cardId,
}: {
  cardId: number;
}): Promise<void> {
  return withThrowingAxiosError<void>(async () => {
    const response = await axiosInstance.delete(`/cards/${cardId}`);
    return response.data;
  });
}
