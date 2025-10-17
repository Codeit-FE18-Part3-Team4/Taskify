import SampleImage from "@/assets/images/dashboard-gui.png";
import Alert, { AlertActionType } from "@/components/alert";
import IconButton from "@/components/button/icon-button";
import Badge from "@/components/chips/badge/badge";
import { Color } from "@/components/color";
import Dialog from "@/components/dialog";
import MoreIcon from "@/components/icon/more-icon";
import XmarkIcon from "@/components/icon/xmark-icon";
import Modal from "@/components/modal";
import Profile from "@/components/profile/profile";
import { ProfileSize } from "@/components/profile/profile-size";
import Typography from "@/components/typography";
import { deleteCard } from "@/features/card/apis";
import { Direction, Menu, MenuItem } from "@/features/card/components/menu";
import { getComments } from "@/features/comment/apis/comment";
import CommentInput from "@/features/comment/components/comment-input";
import CommentList from "@/features/comment/components/comment-list";
import { useAlert } from "@/hooks/use-alert";
import { useDialog } from "@/hooks/use-dialog";
import { useModal } from "@/hooks/use-modal";
import { useResponsive } from "@/hooks/use-responsive";
import { Card } from "@/types/card";
import { Comment } from "@/types/comment";
import { classnames } from "@/utils/classnames";
import { formatDueDate } from "@/utils/date-formatter";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import styles from "./card-detail-modal.module.css";

interface ActionsProps {
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

function Actions({ onEdit, onDelete, onClose }: ActionsProps) {
  return (
    <div className={styles.actions}>
      <Menu
        items={[MenuItem.edit(onEdit), MenuItem.delete(onDelete)]}
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

interface SidebarProps extends ActionsProps {
  dashboardTitle: string;
  columnTitle: string;
  assignee: string;
  dueDate: string;
}

function Sidebar({
  dashboardTitle,
  columnTitle,
  assignee,
  dueDate,
  onEdit,
  onDelete,
  onClose,
}: SidebarProps) {
  return (
    <div className={styles.sidebar}>
      <header className={styles.sidebarHeader}>
        <Actions onEdit={onEdit} onDelete={onDelete} onClose={onClose} />
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

interface MainProps extends ActionsProps {
  card: Card;
  dashboardTitle: string;
  columnTitle: string;
}

function Main({
  card,
  dashboardTitle,
  columnTitle,
  onEdit,
  onDelete,
  onClose,
}: MainProps) {
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
            {isDesktop || (
              <Actions onEdit={onEdit} onDelete={onDelete} onClose={onClose} />
            )}
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

  const alertKey = "alert-from-card-detail-modal";
  const { isShowAlert, openAlert } = useAlert({ key: alertKey });

  const dialogKey = "dialog-from-card-detail-modal";
  const { isShowDialog, openDialog } = useDialog({ key: dialogKey });
  const [dialogMessage, setDialogMessage] = useState("");

  const handleEdit = () => {
    // TODO: Show CardEditSheet
  };

  const handleDelete = async () => {
    if (!isShowAlert) {
      openAlert(true);
      return;
    }

    try {
      await deleteCard({ cardId: card.id });
      openModal(false);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        setDialogMessage(error.message);
        openDialog(true);
      }
    }
  };

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
          onEdit={handleEdit}
          onDelete={handleDelete}
          onClose={handleClose}
        />
        {isDesktop && (
          <Sidebar
            dashboardTitle={dashboardTitle}
            columnTitle={columnTitle}
            assignee={card.assignee.nickname}
            dueDate={card.dueDate}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onClose={handleClose}
          />
        )}
      </div>
      {isShowAlert && (
        <Alert
          alertKey={alertKey}
          title="할 일을 삭제하시겠습니까?"
          message="삭제된 할 일은 복구할 수 없습니다."
          actionType={AlertActionType.Delete}
          onAction={handleDelete}
        />
      )}
      {isShowDialog && <Dialog dialogKey={dialogKey} message={dialogMessage} />}
    </Modal>
  );
}
