import { FetchCommentsResponse } from "@/types/comment";
import axiosInstance from "@/services/axios-instance";

export async function getComments({
  cardId,
  size = 20,
}: {
  cardId: number;
  size?: number;
}): Promise<FetchCommentsResponse> {
  try {
    const params = new URLSearchParams({
      cardId: cardId.toString(),
    });

    if (size) {
      params.append("size", size.toString());
    }

    const res = await axiosInstance.get("/comments", {
      params: {
        cardId,
        size,
      },
    });
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
