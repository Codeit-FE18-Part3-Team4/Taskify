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

interface updateCommentProps {
  content: string;
  commentId: number;
}

export async function putComment({ content, commentId }: updateCommentProps) {
  try {
    const res = await axiosInstance.put(`/comments/${commentId}`, {
      content,
    });
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

interface PostCommentProps {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}

export async function postComment({
  content,
  cardId,
  columnId,
  dashboardId,
}: PostCommentProps) {
  try {
    const res = await axiosInstance.post(`/comments`, {
      content,
      cardId,
      columnId,
      dashboardId,
    });
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

export async function deleteComment({ commentId }: { commentId: number }) {
  try {
    const res = await axiosInstance.delete(`/comments${commentId}`);
    return res.data;
  } catch (e) {
    console.error(e);
  }
}
