import { useState } from "react";
import styles from "./index.module.css";
import Column from "@/components/dashboard/column/column";
import Modal from "@/components/modal";
import ColorChip from "@/components/chips/chip-color/chips-color";
import { classnames } from "@/utils/classnames";
import Typography from "@/components/typography";
import { CommonSize } from "@/constants/common/common-size";
import { useModal } from "@/hooks/use-modal";
import { Card } from "@/types/card";
import { Dashboard } from "@/types/dashboard";
import { Column as ColumnData } from "@/types/column";
import PlusCircleSvg from "./plus-circle-svg";

interface DashboardContentProps {
  dashboard: Dashboard;
  columns: ColumnData[];
  cards: Record<number, Card[]>;
  isLoading: boolean;
}

export default function DashboardContent({
  dashboard,
  columns,
  cards,
  isLoading,
}: DashboardContentProps) {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  const MODAL_KEY = "CARD_DETAIL_MODAL";
  const { isShowModal, openModal } = useModal({ key: MODAL_KEY });

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
    openModal(true);
  };

  const handleCreatColumnClick = () => {
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
              <div>컬럼 로딩중 넣을화면 들어갈 자리</div>
            ) : (
              columns.map((column) => (
                <Column
                  key={column.id}
                  cards={cards[column.id] ?? []}
                  onCardClick={handleCardClick}
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
                  Typography.lg2Medium,
                )}
                onClick={handleCreatColumnClick}
              >
                <PlusCircleSvg className={styles.icon} />
                <span>새로운 컬럼 추가</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {isShowModal && (
        <Modal modalKey={MODAL_KEY}>
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
            <h2 style={{ color: "white" }}>Modal 1 Title</h2>
            <div>{selectedCard && JSON.stringify(selectedCard, null, 2)}</div>
            <button onClick={() => openModal(false)}>Close Modal 1</button>
          </div>
        </Modal>
      )}
    </>
  );
}
