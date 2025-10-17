import { useEffect, useState } from "react";
import styles from "./index.module.css";
import Column, { ColumnActionType } from "@/components/dashboard/column/column";
import ColorChip from "@/components/chips/chip-color/chips-color";
import { classnames } from "@/utils/classnames";
import Typography from "@/components/typography";
import { CommonSize } from "@/constants/common/common-size";
import { useModal } from "@/hooks/use-modal";
import { Card } from "@/types/card";
import { Column as ColumnData } from "@/types/column";
import { Dashboard } from "@/types/dashboard";
import { classnames } from "@/utils/classnames";
import styles from "./index.module.css";
import PlusCircleSvg from "./plus-circle-svg";
import dynamic from "next/dynamic";
import { ColumnOperationStatus, useColumn } from "@/hooks/use-column";
import Alert, { AlertActionType } from "@/components/alert";
import { useAlert } from "@/hooks/use-alert";

export async function getServerSideProps() {
  return {
    props: {},
  };
}

interface DashboardContentProps {
  dashboard: Dashboard;
  columns: ColumnData[];
  cards: Record<number, Card[]>;
  isLoading: boolean;
  onCardClick: (card: Card, columnTitle: string) => void;
}

const ColumnEditSheet = dynamic(
  () => import("@/features/column/components/column-edit-sheet"),
  {
    ssr: false,
  },
);

export default function DashboardContent({
  dashboard,
  columns: propsColumns,
  cards,
  isLoading: propsLoading,
  onCardClick,
}: DashboardContentProps) {
  const [selectedColumn, setSelectedColumn] = useState<ColumnData | null>(null);
  const [statusMessage, setStatusMessage] =
    useState<ColumnOperationStatus | null>(null);

  const COLUMN_SHEET_KEY = "COLUMN_SHEET";
  const { isShowModal, openModal } = useModal({
    key: COLUMN_SHEET_KEY,
  });

  const ALERT_KEY = "ALERT_SAMPLE";
  const { isShowAlert, openAlert } = useAlert({
    key: ALERT_KEY,
  });

  const {
    columns: fetchedColumns,
    isLoading: fetchingColumns,
    createColumn,
    updateColumn,
    isCreating,
    isUpdating,
    status,
    clearStatus,
    refetch,
  } = useColumn(dashboard.id);

  const columns = fetchedColumns ?? propsColumns;
  const isLoading = propsLoading || fetchingColumns;

  useEffect(() => {
    console.log("🔔 status 변경:", status);
    if (status.type !== "idle") {
      console.log("✅ statusMessage 설정 & Alert 열기:", status);
      setStatusMessage(status);
      openAlert(true); // 👈 Alert 열기!
      clearStatus();
    }
  }, [status, clearStatus, openAlert]);

  // statusMessage가 설정되면 3초 후 제거
  useEffect(() => {
    console.log("💬 statusMessage 변경:", statusMessage);
    if (statusMessage) {
      console.log("⏰ 3초 타이머 시작");
      const timer = setTimeout(() => {
        console.log("⏰ 3초 경과 - statusMessage 제거 & Alert 닫기");
        setStatusMessage(null);
        openAlert(false); // 👈 Alert 닫기!
      }, 3000);

      return () => {
        console.log("🧹 타이머 정리");
        clearTimeout(timer);
      };
    }
  }, [statusMessage, openAlert]);

  const handleCreateColumnClick = () => {
    setSelectedColumn(null);
    openModal(true);
  };

  const handleEditColumnClick = (column: ColumnData) => {
    setSelectedColumn(column);
    openModal(true);
  };

  const columnTitleSubmit = async (title: string) => {
    if (!title) return;

    const result = selectedColumn
      ? await updateColumn({
          columnTitle: title,
          columnId: selectedColumn.id,
        })
      : await createColumn({
          columnTitle: title,
          dashboardId: dashboard.id,
        });

    if (result.success) {
      openModal(false);
      await refetch();
    }
  };

  const handleAlertClose = () => {
    console.log("❌ Alert 닫기 핸들러 호출");
    setStatusMessage(null);
    openAlert(false); // 👈 Alert 상태도 닫기
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
                  onCardClick={(card) => {
                    onCardClick(card, column.title);
                  }}
                  columnTitle={column.title}
                  onClick={(type) => {
                    if (type === ColumnActionType.Modify) {
                      handleEditColumnClick(column);
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
                disabled={isCreating || isUpdating}
              >
                <PlusCircleSvg className={styles.icon} />
                <span>새로운 컬럼 추가</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {isShowModal && (
        <ColumnEditSheet
          sheetKey={COLUMN_SHEET_KEY}
          onSubmit={columnTitleSubmit}
          column={selectedColumn ?? undefined}
        />
      )}

      {statusMessage && (
        <Alert
          actionType={AlertActionType.Confirm}
          alertKey={ALERT_KEY}
          message={statusMessage.message}
          title={statusMessage.type}
          onCancel={handleAlertClose}
        />
      )}
    </>
  );
}
