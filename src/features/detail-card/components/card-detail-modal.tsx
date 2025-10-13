import SampleImage from "@/assets/images/dashboard-gui.png";
import IconButton from "@/components/button/icon-button";
import Badge from "@/components/chips/badge/badge";
import { Color } from "@/components/color";
import MoreIcon from "@/components/icon/more-icon";
import XmarkIcon from "@/components/icon/xmark-icon";
import { Direction, Menu, MenuItem } from "@/components/menu";
import Modal from "@/components/modal";
import Profile from "@/components/profile/profile";
import { ProfileSize } from "@/components/profile/profile-size";
import Typography from "@/components/typography";
import { CardStatus } from "@/constants/card/card-status";
import { getComments } from "@/features/comment/apis/comment";
import { useResponsive } from "@/hooks/use-responsive";
import { Card } from "@/types/card";
import { Comment } from "@/types/comment";
import { classnames } from "@/utils/classnames";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import { formatDueDate } from "../../../utils/date-formatter";
import CommentInput from "../../comment/components/comment-input";
import CommentList from "../../comment/components/comment-list";
import styles from "./card-detail-modal.module.css";

export const STATUS_TITLE = {
  [CardStatus.ToDo]: "To Do",
  [CardStatus.OnProgress]: "On Progress",
  [CardStatus.Done]: "Done",
} as const;

function Actions() {
  const handleEdit = () => {
    // TODO: Go to edit modal
  };

  const handleDelete = () => {
    // TODO: Delete card with modal (additional feature)
  };

  return (
    <div className={styles.actions}>
      <Menu
        items={[MenuItem.edit(handleEdit), MenuItem.delete(handleDelete)]}
        direction={Direction.Right}
      >
        <MoreIcon color={Color.Gray300} />
      </Menu>
      <IconButton size={20}>
        <XmarkIcon size={20} color={Color.Gray300} />
      </IconButton>
    </div>
  );
}

function InfoTitle({ children }: { children: ReactNode }) {
  return (
    <div className={classnames(styles.infoTitle, Typography.mdSemiBold)}>
      {children}
    </div>
  );
}

function InfoContent({ children }: { children: ReactNode }) {
  return <div className={Typography.lgMedium}>{children}</div>;
}

function AssigneeInfo({ name }: { name: string }) {
  return (
    <div className={classnames(styles.assigneeInfo, Typography.lgMedium)}>
      <Profile size={ProfileSize.XSmall} name={name.slice(1)} />
      <span>{name}</span>
    </div>
  );
}

function Sidebar({
  dashboardTitle,
  cardStatus,
  assignee,
  dueDate,
}: {
  dashboardTitle: string;
  cardStatus: CardStatus;
  assignee: string;
  dueDate: string;
}) {
  return (
    <div className={styles.sidebar}>
      <header className={styles.sidebarHeader}>
        <Actions />
      </header>
      <section className={styles.sidebarSection}>
        <InfoTitle>프로젝트</InfoTitle>
        <InfoContent>
          {dashboardTitle} / {STATUS_TITLE[cardStatus]}
        </InfoContent>
      </section>
      <section className={classnames(styles.sidebarSection, styles.divider)}>
        <InfoTitle>담당자</InfoTitle>
        <AssigneeInfo name={assignee} />
      </section>
      <section className={classnames(styles.sidebarSection, styles.divider)}>
        <InfoTitle>마감일</InfoTitle>
        <InfoContent>{formatDueDate(dueDate)}</InfoContent>
      </section>
    </div>
  );
}

function Main({
  card,
  dashboardTitle,
  showsCompact = false,
}: {
  card: Card;
  dashboardTitle: string;
  showsCompact?: boolean;
}) {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    async function loadComments() {
      try {
        const data = await getComments();
        setComments(data);
      } catch (error) {
        // TODO: Error handling
        console.error("Failed to load comments:", error);
      }
    }
    loadComments();
  }, []);

  const handleCommentSubmit = (value: string) => {
    // TODO: Add comment
    console.log("Submit comment:", value);
  };

  return (
    <div className={styles.main}>
      <div className={styles.scrollContainer}>
        <header className={styles.header}>
          <h2
            className={classnames(
              showsCompact ? styles.compact : "",
              Typography.xl2SemiBold
            )}
          >
            {card.title}
            {showsCompact && <Actions />}
          </h2>
          <div className={styles.tagsList}>
            {card.tags.map((tag) => (
              <Badge key={tag} title={tag} />
            ))}
          </div>
        </header>
        <article className={styles.content}>
          <p className={Typography.lgMedium160}>{card.description}</p>
          <div className={styles.image}>
            <Image src={SampleImage} alt="카드에 등록된 이미지" fill />
          </div>
        </article>
        {showsCompact && (
          <div className={styles.info}>
            <InfoTitle>프로젝트</InfoTitle>
            <InfoContent>
              {dashboardTitle} / {STATUS_TITLE[card.columnId as CardStatus]}
            </InfoContent>
            <InfoTitle>담당자</InfoTitle>
            <AssigneeInfo name={card.assignee.nickname} />
            <InfoTitle>마감일</InfoTitle>
            <InfoContent>{formatDueDate(card.dueDate)}</InfoContent>
          </div>
        )}
        <div className={styles.comments}>
          <CommentInput
            authorName={card.assignee.nickname}
            onSubmit={handleCommentSubmit}
          />
          <CommentList comments={comments} />
        </div>
      </div>
    </div>
  );
}

interface Props {
  modalKey: string;
  card: Card;
  dashboardTitle: string;
}

export default function CardDetailModal({
  modalKey,
  card,
  dashboardTitle,
}: Props) {
  const { isDesktop, isMobile } = useResponsive();

  return (
    <Modal modalKey={modalKey} isFullScreen={isMobile}>
      <div className={styles.cardDetailModal}>
        <Main card={card} dashboardTitle={dashboardTitle} />
        {isDesktop && (
          <Sidebar
            dashboardTitle={dashboardTitle}
            cardStatus={card.columnId as CardStatus}
            assignee={card.assignee.nickname}
            dueDate={card.dueDate}
          />
        )}
      </div>
    </Modal>
  );
}
