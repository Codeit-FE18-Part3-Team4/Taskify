import Dialog from "@/components/dialog";
import { createComment, getComments } from "@/features/comment/apis";
import { useDialog } from "@/hooks/use-dialog";
import type { Card, Comment, Dashboard } from "@/types";
import { useEffect, useState } from "react";
import styles from "./card-detail-modal.module.css";
import CommentInput from "./comment-input";
import CommentList from "./comment-list";

export default function CommentSection({
  card,
  dashboard,
}: {
  card: Card;
  dashboard: Dashboard;
}) {
  const [comments, setComments] = useState<Comment[]>([]);
  useEffect(() => {
    async function loadComments() {
      try {
        const comments = await getComments({ cardId: card.id });
        setComments(comments);
      } catch {
        setComments([]);
      }
    }
    loadComments();
  }, [card]);

  const FAIL_DIALOG_KEY = "fail-dialog-from-card-detail-modal";
  const { isShowDialog, openDialog } = useDialog({ key: FAIL_DIALOG_KEY });
  const [failMessage, setFailMessage] = useState("");

  const handleCommentSubmit = async (value: string) => {
    try {
      const newComment = await createComment({
        params: {
          cardId: card.id,
          columnId: card.columnId,
          dashboardId: dashboard.id,
          content: value,
        },
      });
      setComments((prevComments) => [...prevComments, newComment]);
    } catch (error) {
      if (error instanceof Error) {
        setFailMessage(error.message);
        openDialog(true);
      }
    }
  };

  return (
    <>
      <section className={styles.comments}>
        <CommentInput
          authorName={card.assignee.nickname}
          onSubmit={handleCommentSubmit}
        />
        <CommentList comments={comments} />
      </section>
      {isShowDialog && (
        <Dialog dialogKey={FAIL_DIALOG_KEY} message={failMessage} />
      )}
    </>
  );
}
