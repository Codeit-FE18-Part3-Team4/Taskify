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
import { CardParams, deleteCard, updateCard } from "@/features/card/apis";
import { Direction, Menu, MenuItem } from "@/features/card/components/menu";
import CommentSection from "@/features/comment/components/comment-section";
import { useAlert } from "@/hooks/use-alert";
import { useDialog } from "@/hooks/use-dialog";
import { useModal } from "@/hooks/use-modal";
import { useResponsive } from "@/hooks/use-responsive";
import { useSheet } from "@/hooks/use-sheet";
import type { Card, Column, Dashboard, MemberInfo } from "@/types";
import { classnames } from "@/utils/classnames";
import { formatDueDate } from "@/utils/date-formatter";
import Image from "next/image";
import { ReactNode, useState } from "react";
import styles from "./card-detail-modal.module.css";
import CardEditSheet from "./card-edit-sheet";

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
        <Profile size={ProfileSize.XSmall} name={name} />
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
  dashboard: Dashboard;
  columnTitle: string;
}

function Main({
  card,
  dashboard,
  columnTitle,
  onEdit,
  onDelete,
  onClose,
}: MainProps) {
  const { isDesktop } = useResponsive();
  const [imageState, setImageState] = useState({
    isPortrait: false,
  });

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    setImageState({
      isPortrait: naturalHeight > naturalWidth,
    });
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
          {card.tags.length > 0 && (
            <div className={styles.tagsList}>
              {card.tags.map((tag) => (
                <Badge key={tag} title={tag} />
              ))}
            </div>
          )}
        </header>
        <article className={styles.content}>
          <p className={Typography.lgMedium160}>{card.description}</p>
          {card.imageUrl && (
            <div
              className={classnames(
                styles.imageContainer,
                imageState.isPortrait ? styles.portrait : styles.landscape
              )}
            >
              <Image
                className={styles.image}
                src={card.imageUrl}
                alt="카드에 등록된 이미지"
                quality={100}
                fill
                onLoad={handleImageLoad}
              />
            </div>
          )}
        </article>
        {isDesktop || (
          <div className={styles.info}>
            <ProjectInfo
              dashboardTitle={dashboard.title}
              columnTitle={columnTitle}
            />
            <AssigneeInfo name={card.assignee.nickname} />
            <DueDateInfo dueDate={card.dueDate} />
          </div>
        )}
        <CommentSection card={card} dashboard={dashboard} />
      </div>
    </div>
  );
}

interface Props {
  modalKey: string;
  card: Card;
  dashboard: Dashboard;
  columns: Column[];
  members: MemberInfo[];
  onDelete: () => void;
  onUpdate: () => void;
}

export default function CardDetailModal({
  modalKey,
  card: initialCard,
  dashboard,
  columns,
  members,
  onDelete,
  onUpdate,
}: Props) {
  const [card, setCard] = useState<Card>(initialCard);

  const { openModal } = useModal({ key: modalKey });
  const { isDesktop, isMobile } = useResponsive();

  const alertKey = "alert-from-card-detail-modal";
  const { isShowAlert, openAlert } = useAlert({ key: alertKey });

  const dialogKey = "dialog-from-card-detail-modal";
  const { isShowDialog, openDialog } = useDialog({ key: dialogKey });
  const [dialogMessage, setDialogMessage] = useState("");

  const sheetKey = "card-edit-sheet-from-card-detail-modal";
  const { isShowSheet, openSheet } = useSheet({
    key: sheetKey,
  });

  const columnTitle =
    columns?.find((column) => card.columnId === column.id)?.title ?? "";

  const handleEdit = () => {
    openSheet(true);
  };

  const handleDelete = async () => {
    if (!isShowAlert) {
      openAlert(true);
      return;
    }

    try {
      await deleteCard({ cardId: card.id });
      onDelete();
      openModal(false);
    } catch (error) {
      if (error instanceof Error) {
        setDialogMessage(error.message);
        openDialog(true);
      }
    }
  };

  const handleClose = () => {
    openModal(false);
  };

  const handleCardUpdate = async (params: CardParams) => {
    const newCard = await updateCard({ cardId: card.id, params });
    setCard(newCard);
    onUpdate();
    openSheet(false);
  };

  return (
    <Modal modalKey={modalKey} isFullScreen={isMobile}>
      <div className={styles.cardDetailModal}>
        <Main
          card={card}
          dashboard={dashboard}
          columnTitle={columnTitle}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onClose={handleClose}
        />
        {isDesktop && (
          <Sidebar
            dashboardTitle={dashboard.title}
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
      {isShowSheet && (
        <CardEditSheet
          sheetKey={sheetKey}
          dashboardId={dashboard.id}
          card={card}
          columns={columns}
          members={members}
          onUpdate={handleCardUpdate}
        />
      )}
    </Modal>
  );
}
