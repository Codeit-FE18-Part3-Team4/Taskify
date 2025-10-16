import SampleImage from "@/assets/images/dashboard-gui.png";
import IconButton from "@/components/button/icon-button";
import Badge from "@/components/chips/badge/badge";
import { Color } from "@/components/color";
import MoreIcon from "@/components/icon/more-icon";
import XmarkIcon from "@/components/icon/xmark-icon";
import Modal from "@/components/modal";
import Profile from "@/components/profile/profile";
import { ProfileSize } from "@/components/profile/profile-size";
import Typography from "@/components/typography";
import { Direction, Menu, MenuItem } from "@/features/card/components/menu";
import { getComments } from "@/features/comment/apis/comment";
import { useModal } from "@/hooks/use-modal";
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

function Actions({ onClose }: { onClose: () => void }) {
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
      <IconButton size={20} onClick={onClose}>
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

function ProjectInfo({
  dashboardTitle,
  columnTitle,
}: {
  dashboardTitle: string;
  columnTitle: string;
}) {
  return (
    <>
      <InfoTitle>프로젝트</InfoTitle>
      <InfoContent>
        {dashboardTitle} / {columnTitle}
      </InfoContent>
    </>
  );
}

function AssigneeInfo({ name }: { name: string }) {
  return (
    <>
      <InfoTitle>담당자</InfoTitle>
      <div className={classnames(styles.assigneeInfo, Typography.lgMedium)}>
        <Profile size={ProfileSize.XSmall} name={name.slice(1)} />
        <span>{name}</span>
      </div>
    </>
  );
}

function DueDateInfo({ dueDate }: { dueDate: string }) {
  return (
    <>
      <InfoTitle>마감일</InfoTitle>
      <InfoContent>{formatDueDate(dueDate)}</InfoContent>
    </>
  );
}

function Sidebar({
  dashboardTitle,
  columnTitle,
  assignee,
  dueDate,
  onClose,
}: {
  dashboardTitle: string;
  columnTitle: string;
  assignee: string;
  dueDate: string;
  onClose: () => void;
}) {
  return (
    <div className={styles.sidebar}>
      <header className={styles.sidebarHeader}>
        <Actions onClose={onClose} />
      </header>
      <section className={styles.sidebarSection}>
        <ProjectInfo
          dashboardTitle={dashboardTitle}
          columnTitle={columnTitle}
        />
      </section>
      <section className={classnames(styles.sidebarSection, styles.divider)}>
        <AssigneeInfo name={assignee} />
      </section>
      <section className={classnames(styles.sidebarSection, styles.divider)}>
        <DueDateInfo dueDate={dueDate} />
      </section>
    </div>
  );
}

function Main({
  card,
  dashboardTitle,
  columnTitle,
  onClose,
}: {
  card: Card;
  dashboardTitle: string;
  columnTitle: string;
  onClose: () => void;
}) {
  const [comments, setComments] = useState<Comment[]>([]);
  const { isDesktop } = useResponsive();

  useEffect(() => {
    async function loadComments() {
      try {
        const data = await getComments();
        setComments(data);
      } catch (error) {
        // TODO: Error handling
      }
    }
    loadComments();
  }, []);

  const handleCommentSubmit = (value: string) => {
    // TODO: Add comment
  };

  return (
    <div className={styles.main}>
      <div className={styles.scrollContainer}>
        <header className={styles.header}>
          <h2
            className={classnames(
              isDesktop ? "" : styles.compact,
              Typography.xl2SemiBold
            )}
          >
            {card.title}
            {isDesktop || <Actions onClose={onClose} />}
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
        {isDesktop || (
          <div className={styles.info}>
            <ProjectInfo
              dashboardTitle={dashboardTitle}
              columnTitle={columnTitle}
            />
            <AssigneeInfo name={card.assignee.nickname} />
            <DueDateInfo dueDate={card.dueDate} />
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
  columnTitle: string;
}

export default function CardDetailModal({
  modalKey,
  card,
  dashboardTitle,
  columnTitle,
}: Props) {
  const { openModal } = useModal({ key: modalKey });
  const { isDesktop, isMobile } = useResponsive();

  const handleClose = () => {
    openModal(false);
  };

  return (
    <Modal modalKey={modalKey} isFullScreen={isMobile}>
      <div className={styles.cardDetailModal}>
        <Main
          card={card}
          dashboardTitle={dashboardTitle}
          columnTitle={columnTitle}
          onClose={handleClose}
        />
        {isDesktop && (
          <Sidebar
            dashboardTitle={dashboardTitle}
            columnTitle={columnTitle}
            assignee={card.assignee.nickname}
            dueDate={card.dueDate}
            onClose={handleClose}
          />
        )}
      </div>
    </Modal>
  );
}
