import ColorChip from "@/components/chips/chip-color/chips-color";
import Column from "@/components/dashboard/column/column";
import Modal from "@/components/modal";
import Typography from "@/components/typography";
import { CommonSize } from "@/constants/common/common-size";
import { useModal } from "@/hooks/use-modal";
import { Card } from "@/types/card";
import { Column as ColumnData } from "@/types/column";
import { Dashboard } from "@/types/dashboard";
import { classnames } from "@/utils/classnames";
import styles from "./index.module.css";
import PlusCircleSvg from "./plus-circle-svg";

interface DashboardContentProps {
  dashboard: Dashboard;
  columns: ColumnData[];
  cards: Record<number, Card[]>;
  isLoading: boolean;
  onCardClick: (card: Card) => void;
}

export default function DashboardContent({
  dashboard,
  columns,
  cards,
  isLoading,
  onCardClick,
}: DashboardContentProps) {
  const CREATE_COLUMN_MODAL_KEY = "CREATE_COLUMN_MODAL";
  const { isShowModal, openModal } = useModal({ key: CREATE_COLUMN_MODAL_KEY });

  const handleCreateColumnClick = () => {
    openModal(true);
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
    </>
  );
}
