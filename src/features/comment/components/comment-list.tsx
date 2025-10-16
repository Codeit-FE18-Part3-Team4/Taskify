import Profile from "@/components/profile/profile";
import { ProfileSize } from "@/components/profile/profile-size";
import Typography from "@/components/typography";
import { Comment } from "@/types/comment";
import { formatFullDate } from "@/utils/date-formatter";
import { Key } from "react";
import styles from "./comment-list.module.css";

function CommentListItem({ key, comment }: { key: Key; comment: Comment }) {
  return (
    <li className={styles.commentContainer} key={key}>
      <div className={styles.avatar}>
        <Profile
          size={ProfileSize.Large}
          name={comment.author.nickname.slice(1)}
        />
      </div>
      <div className={styles.commentContent}>
        <div className={styles.commentHeader}>
          <span className={Typography.lgSemiBold}>
            {comment.author.nickname}
          </span>
          <span className={Typography.mdMedium}>
            {formatFullDate(comment.createdAt)}
          </span>
        </div>
        <p className={Typography.lgMedium160}>{comment.content}</p>
      </div>
    </li>
  );
}

interface Props {
  comments?: Comment[];
}

export default function CommentList({ comments = [] }: Props) {
  return (
    <ul className={styles.listContainer}>
      {comments
        .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
        .map((comment) => (
          <CommentListItem key={comment.id} comment={comment} />
        ))}
    </ul>
  );
}
