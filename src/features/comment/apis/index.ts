import axiosInstance from "@/services/axios-instance";
import { withThrowingAxiosError } from "@/services/with-throwing-axios-error";
import { Comment } from "@/types";

interface GetCommentsResponse {
  cursorId: number;
  comments: Comment[];
}

export async function getComments({ cardId }: { cardId: number }) {
  return withThrowingAxiosError<Comment[]>(async () => {
    const response = await axiosInstance.get<GetCommentsResponse>(`/comments`, {
      params: { cardId },
    });
    return response.data.comments;
  });
}

export async function createComment({
  params,
}: {
  params: {
    cardId: number;
    columnId: number;
    dashboardId: number;
    content: string;
  };
}) {
  return withThrowingAxiosError<Comment>(async () => {
    const response = await axiosInstance.post<Comment>(`/comments`, params);
    return response.data;
  });
}
