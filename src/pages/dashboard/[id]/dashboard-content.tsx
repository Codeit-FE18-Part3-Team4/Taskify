import ColorChip from "@/components/chips/chip-color/chips-color";
import Column, { ColumnActionType } from "@/components/dashboard/column/column";
import Dialog from "@/components/dialog";
import Modal from "@/components/modal";
import { MemberInfo } from "@/components/profile/member-info";
import Typography from "@/components/typography";
import { CommonSize } from "@/constants/common/common-size";
import { CardParams, createCard, CreateCardParams } from "@/features/card/apis";
import CardEditSheet from "@/features/card/components/card-edit-sheet";
import { useDialog } from "@/hooks/use-dialog";
import { useModal } from "@/hooks/use-modal";
import { useSheet } from "@/hooks/use-sheet";
import { Card } from "@/types/card";
import { Column as ColumnData } from "@/types/column";
import { Dashboard } from "@/types/dashboard";
import { classnames } from "@/utils/classnames";
import { useState } from "react";
import styles from "./index.module.css";
import PlusCircleSvg from "./plus-circle-svg";

export async function getServerSideProps() {
  return {
    props: {},
  };
}

interface DashboardContentProps {
  dashboard: Dashboard;
  columns: ColumnData[];
  members: MemberInfo[];
  cards: Record<number, Card[]>;
  isLoading: boolean;
  onCardClick: (card: Card) => void;
  onCardCreate: (newCard: Card) => void;
}

export default function DashboardContent({
  dashboard,
  columns,
  members,
  cards,
  isLoading,
  onCardClick,
  onCardCreate,
}: DashboardContentProps) {
  const CREATE_COLUMN_MODAL_KEY = "CREATE_COLUMN_MODAL";
  const { isShowModal, openModal } = useModal({ key: CREATE_COLUMN_MODAL_KEY });

  const CREATE_CARD_SHEET_KEY = "CREATE_CARD_SHEET";
  const { isShowSheet, openSheet } = useSheet({ key: CREATE_CARD_SHEET_KEY });

  const FAIL_DIALOG_KEY = "fail-dialog-from-dashboard-content";
  const { isShowDialog, openDialog } = useDialog({ key: FAIL_DIALOG_KEY });
  const [failMessage, setFailMessage] = useState("");

  const handleCreateColumnClick = () => {
    openModal(true);
  };

  const handleCardCreate = async (params?: CardParams) => {
    if (!params) {
      openSheet(true);
      return;
    }

    try {
      const createParams: CreateCardParams = {
        ...params,
        dashboardId: dashboard.id,
      };
      const newCard = await createCard({ params: createParams });
      onCardCreate(newCard);
      openSheet(false);
    } catch (error) {
      if (error instanceof Error) {
        openDialog(true);
        setFailMessage(error.message);
      }
    }
  };

  const handleColumnUpdate = () => {
    console.log("컬럼 수정 처리");
  };

  return (
    <>
      <section>
        <div className={classnames(styles.dashboardTitle, Typography.xl3Bold)}>
          <ColorChip color={dashboard.color} size={CommonSize.Large} />
          <h3>{dashboard.title}</h3>
        </div>

        <div className={styles.columnWrapper}>
          <div className={styles.columnContentWrapper}>
            {isLoading ? (
              <h2>컬럼 로딩중...</h2>
            ) : (
              columns.map((column) => (
                <Column
                  key={column.id}
                  cards={cards[column.id] ?? []}
                  onCardClick={onCardClick}
                  columnTitle={column.title}
                  onClick={(type) => {
                    switch (type) {
                      case ColumnActionType.Create:
                        handleCardCreate();
                        break;
                      case ColumnActionType.Modify:
                        handleColumnUpdate();
                        break;
                    }
                    console.log(`${column.title} 컬럼의 ${type} 클릭`);
                  }}
                />
              ))
            )}
            <div>
              <button
                type="button"
                className={classnames(
                  styles.createColumnButton,
                  Typography.lg2Medium
                )}
                onClick={handleCreateColumnClick}
              >
                <PlusCircleSvg className={styles.icon} />
                <span>새로운 컬럼 추가</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {isShowModal && (
        <Modal modalKey={CREATE_COLUMN_MODAL_KEY}>
          <div
            style={{
              width: "600px",
              height: "600px",
              backgroundColor: "#242429",
              borderRadius: "24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2 style={{ color: "white" }}>새컬럼만들기모달</h2>
            <button onClick={() => openModal(false)}>Close Modal 1</button>
          </div>
        </Modal>
      )}
      {isShowSheet && (
        <CardEditSheet
          sheetKey={CREATE_CARD_SHEET_KEY}
          columns={columns}
          members={members}
          onCreate={handleCardCreate}
        />
      )}
      {isShowDialog && (
        <Dialog dialogKey={FAIL_DIALOG_KEY} message={failMessage} />
      )}
    </>
  );
}
