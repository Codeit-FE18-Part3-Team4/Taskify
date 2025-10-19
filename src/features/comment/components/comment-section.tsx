import Dialog from "@/components/dialog";
import { createComment } from "@/features/comment/apis";
import { useComments } from "@/hooks/use-comments";
import { useDialog } from "@/hooks/use-dialog";
import type { Card, Dashboard } from "@/types";
import { useState } from "react";
import CommentInput from "./comment-input";
import CommentList from "./comment-list";
import styles from "./comment-section.module.css";

export default function CommentSection({
  card,
  dashboard,
}: {
  card: Card;
  dashboard: Dashboard;
}) {
  const { comments, append, loadNext } = useComments({ cardId: card.id });

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
      append(newComment);
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
        <CommentList comments={comments} onScrollEnd={loadNext} />
      </section>
      {isShowDialog && (
        <Dialog dialogKey={FAIL_DIALOG_KEY} message={failMessage} />
      )}
    </>
  );
}
