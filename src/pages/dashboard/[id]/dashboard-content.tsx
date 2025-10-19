import ColorChip from "@/components/chips/chip-color/chips-color";
import Column, { ColumnActionType } from "@/components/dashboard/column/column";
import Dialog from "@/components/dialog";
import { MemberInfo } from "@/components/profile/member-info";
import Typography from "@/components/typography";
import { CommonSize } from "@/constants/common/common-size";
import { CardParams, createCard, CreateCardParams } from "@/features/card/apis";
import CardEditSheet from "@/features/card/components/card-edit-sheet";
import { createColumn, updateColumn } from "@/features/column/apis";
import ColumnEditSheet from "@/features/column/components/column-edit-sheet";
import { useDialog } from "@/hooks/use-dialog";
import { useSheet } from "@/hooks/use-sheet";
import { Card } from "@/types/card";
import { Column as ColumnType } from "@/types/column";
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
  columns: ColumnType[];
  members: MemberInfo[];
  cards: Record<number, Card[]>;
  isLoadingColumns: boolean;
  isLoadingCards: boolean;
  onColumnChange: () => void;
  onCardClick: (card: Card) => void;
  onCardChange: () => void;
}

export default function DashboardContent({
  dashboard,
  columns,
  members,
  cards,
  isLoadingColumns,
  isLoadingCards,
  onColumnChange,
  onCardClick,
  onCardChange,
}: DashboardContentProps) {
  const CREATE_COLUMN_SHEET_KEY = "CREATE_COLUMN_SHEET_KEY";
  const { isShowSheet: isShowColumnEditSheet, openSheet: openColumnEditSheet } =
    useSheet({ key: CREATE_COLUMN_SHEET_KEY });
  const [editingColumn, setEditingColumn] = useState<ColumnType>();

  const CREATE_CARD_SHEET_KEY = "CREATE_CARD_SHEET";
  const { isShowSheet, openSheet } = useSheet({ key: CREATE_CARD_SHEET_KEY });

  const FAIL_DIALOG_KEY = "fail-dialog-from-dashboard-content";
  const { isShowDialog, openDialog } = useDialog({ key: FAIL_DIALOG_KEY });
  const [failMessage, setFailMessage] = useState("");

  const handleCreateColumnClick = () => {
    openColumnEditSheet(true);
  };

  const handleEditColumnClick = (column: ColumnType) => {
    openColumnEditSheet(true);
    setEditingColumn(column);
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
      await createCard({ params: createParams });
      onCardChange();
      openSheet(false);
    } catch (error) {
      if (error instanceof Error) {
        openDialog(true);
        setFailMessage(error.message);
      }
    }
  };

  const handleColumnEdit = async (title: string) => {
    try {
      if (editingColumn) {
        await updateColumn({ columnId: editingColumn.id, title });
      } else {
        await createColumn({ dashboardId: dashboard.id, title });
      }
      onColumnChange();
      setEditingColumn(undefined);
    } catch (error) {
      if (error instanceof Error) {
        openDialog(true);
        setFailMessage(error.message);
      }
    }
  };

  const handleDialogConfirm = () => {
    openDialog(false);
  };

  return (
    <>
      <section>
        <div className={classnames(styles.dashboardTitle, Typography.xl3Bold)}>
          <ColorChip color={dashboard.color} size={CommonSize.Large} />
          <h3 title={dashboard.title}>{dashboard.title}</h3>
        </div>

        <div className={styles.columnWrapper}>
          <div className={styles.columnContentWrapper}>
            {isLoadingColumns ? (
              <h2>컬럼 로딩중...</h2>
            ) : (
              columns.map((column) => (
                <Column
                  key={column.id}
                  cards={cards[column.id] ?? []}
                  isLoadingCards={isLoadingCards}
                  onCardClick={onCardClick}
                  columnTitle={column.title}
                  onClick={(type) => {
                    switch (type) {
                      case ColumnActionType.Create:
                        handleCardCreate();
                        break;
                      case ColumnActionType.Modify:
                        handleEditColumnClick(column);
                        break;
                    }
                  }}
                />
              ))
            )}
            <div>
              <button
                type="button"
                className={classnames(
                  styles.createColumnButton,
                  Typography.lg2Medium,
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
      {isShowColumnEditSheet && (
        <ColumnEditSheet
          sheetKey={CREATE_COLUMN_SHEET_KEY}
          column={editingColumn}
          usedTitles={[]}
          onSubmit={handleColumnEdit}
        />
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
        <Dialog
          dialogKey={FAIL_DIALOG_KEY}
          message={failMessage}
          onConfirm={handleDialogConfirm}
        />
      )}
    </>
  );
}
