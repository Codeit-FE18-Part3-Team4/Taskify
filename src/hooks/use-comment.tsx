import {
  getComments as fetchComments,
  postComment,
  putComment,
  deleteComment,
} from "@/features/comment/comment";
import { useCallback, useEffect, useState } from "react";
import { Comment } from "@/types/comment";
import { OperationStatus } from "@/types/operation-status";
import { useMutation } from "./use-mutation";

export function useComments(cardId: number, size?: number) {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<OperationStatus>({
    type: "idle",
    message: "",
  });

  const loadComments = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetchComments({ cardId, size });
      setComments(res.comments);
    } catch (e) {
      setError(e as Error);
      setComments(null);
    } finally {
      setIsLoading(false);
    }
  }, [cardId, size]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const { mutate: mutCreateComment, isLoading: isCreating } = useMutation(
    postComment,
    {
      onSuccess: () => {
        setStatus({
          type: "success",
          message: "댓글이 등록되었습니다..",
        });
        loadComments();
      },
      onError: (err) => {
        console.error("댓글 등록 실패:", err);
        setStatus({
          type: "error",
          message: "댓글 등록에 실패했습니다.",
        });
      },
    },
  );

  const { mutate: mutUpdateComment, isLoading: isUpdating } = useMutation(
    putComment,
    {
      onSuccess: () => {
        setStatus({
          type: "success",
          message: "댓글이 수정되었습니다.",
        });
        loadComments();
      },
      onError: (err) => {
        console.error("댓글 수정 실패:", err);
        setStatus({
          type: "error",
          message: "댓글 수정에 실패했습니다.",
        });
      },
    },
  );

  const { mutate: mutDeleteComment, isLoading: isDeleting } = useMutation(
    deleteComment,
    {
      onSuccess: () => {
        setStatus({
          type: "success",
          message: "댓글이 삭제되었습니다.",
        });
        loadComments();
      },
      onError: (err) => {
        console.error("댓글 삭제 실패:", err);
        setStatus({
          type: "error",
          message: "댓글 삭제에 실패했습니다.",
        });
      },
    },
  );

  const createComment = async (payload: Parameters<typeof postComment>[0]) => {
    try {
      const result = await mutCreateComment(payload);
      return { success: true as const, result };
    } catch (err) {
      return { success: false as const, error: err };
    }
  };

  const updateComment = async (payload: Parameters<typeof putComment>[0]) => {
    try {
      const result = await mutUpdateComment(payload);
      return { success: true as const, result };
    } catch (err) {
      return { success: false as const, error: err };
    }
  };

  const removeComment = async (
    payload: Parameters<typeof deleteComment>[0],
  ) => {
    try {
      const result = await mutDeleteComment(payload);
      return { success: true as const, result };
    } catch (err) {
      return { success: false as const, error: err };
    }
  };

  const clearStatus = useCallback(() => {
    setStatus({ type: "idle", message: "" });
  }, []);

  return {
    comments,
    isLoading,
    error,
    isCreating,
    isUpdating,
    isDeleting,
    status,
    clearStatus,
    refetch: loadComments,
    createComment,
    updateComment,
    removeComment,
  };
}
