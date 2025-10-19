import { getComments } from "@/features/comment/apis";
import { Comment } from "@/types";
import { useCallback, useEffect, useState } from "react";

function mergeComments(
  prevComments: Comment[],
  newComments: Comment[]
): Comment[] {
  const filtered = newComments.filter(
    (newComment) =>
      !prevComments.some((comment) => comment.id === newComment.id)
  );
  return [...prevComments, ...filtered];
}

export function useComments({ cardId }: { cardId: number }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [cursorId, setCursorId] = useState<number | null>(null);

  const loadComments = useCallback(async () => {
    try {
      const response = await getComments({ cardId });
      setComments((prev) => mergeComments(prev, response.comments));
      setCursorId(response.cursorId);
    } catch {
      setComments([]);
    }
  }, [cardId]);

  const append = (newComment: Comment) => {
    setComments((prev) => [...prev, newComment]);
  };

  const loadNext = async () => {
    if (cursorId === null) {
      return;
    }

    try {
      const response = await getComments({ cardId, cursorId });
      setComments((prev) => mergeComments(prev, response.comments));
      setCursorId(response.cursorId);
    } catch {
      return;
    }
  };

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  return { comments, append, loadNext };
}
