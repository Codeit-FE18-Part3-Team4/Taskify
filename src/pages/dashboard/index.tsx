import { ReactElement, useEffect, useState } from "react";
import styles from "./index.module.css";
import NavigationBar from "@/components/navigationBar/navigation-bar";
import DashboardSideBar from "@/components/dashboard-side-bar/dashboard-side-bar";
import Column from "@/components/dashboard/column/column";
import { Card } from "@/types/card";
import Modal from "@/components/modal";
import { useModal } from "@/hooks/use-modal";

import { getDashboards } from "@/components/dashboard-side-bar/api/dashboard";
import { getColumn } from "@/components/dashboard/column/api/column";

export default function DashboardPage() {
  const [dashboards, setDashboards] = useState<any[]>([]);
  const [column, setColumn] = useState<any[]>([]);
  const [selectedDashboard, setSelectedDashboard] = useState<any>(null);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const MODAL_KEY_1 = "MODAL_SAMPLE_1";
  const { isShowModal: isShowModal1, openModal: openModal1 } = useModal({
    key: MODAL_KEY_1,
  });

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
    openModal1(true);
  };

  const handleDashboardClick = (dashboard: any) => {
    console.log("-------------클릭된 대시보드:", dashboard);
    setSelectedDashboard(dashboard);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const { dashboards } = await getDashboards();
        setDashboards(dashboards);
      } catch (e) {
        console.error(e);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await getColumn({ dashboardId: 0 });
        setColumn(data);
      } catch (e) {
        console.error(e);
      }
    };
    loadData();
  }, []);

  return (
    <div>
      <div className={styles.layoutContainer}>
        <DashboardSideBar
          dashboards={dashboards}
          onDashboardClick={handleDashboardClick}
        />
        <main className={styles.main}>
          <div className={styles.columnWrapper}>
            {column.map((column, index) => (
              <Column
                key={index}
                columnId={column.id}
                onCardClick={handleCardClick}
                columnTitle={column.title}
                onClick={(type) => {
                  console.log(
                    `----------------${column.title} 컬럼의 ${type} 클릭`,
                  );
                }}
              />
            ))}
          </div>
        </main>
      </div>

      {isShowModal1 && (
        <Modal modalKey={MODAL_KEY_1}>
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
            <button onClick={() => openModal1(false)}>Close Modal 1</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <NavigationBar />
      {page}
    </>
  );
};
