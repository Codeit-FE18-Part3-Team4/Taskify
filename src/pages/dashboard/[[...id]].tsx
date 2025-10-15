import { ReactElement, useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import NavigationBar from "@/components/navigationBar/navigation-bar";
import DashboardSideBar from "@/components/dashboard-side-bar/dashboard-side-bar";
import Column from "@/components/dashboard/column/column";
import { Card } from "@/types/card";
import Modal from "@/components/modal";
import { useModal } from "@/hooks/use-modal";
import { useDashboard } from "@/hooks/use-dashboard";
import { useColumn } from "@/hooks/use-column";
import { useCards } from "@/hooks/use-cards";
import ColorChip from "@/components/chips/chip-color/chips-color";
import { classnames } from "@/utils/classnames";
import Typography from "@/components/typography";
import { CommonSize } from "@/constants/common/common-size";
import { useMembers } from "@/hooks/use-members";
import { MemberInfo } from "@/types/member-info";

export default function DashboardPage() {
  const router = useRouter();
  const { id } = router.query;
  const dashboardId = Array.isArray(id)
    ? Number(id[0])
    : id
      ? Number(id)
      : null;

  const { dashboards } = useDashboard();
  const { members } = useMembers(dashboardId);

  const { columns, isLoading: isColumnsLoading } = useColumn(dashboardId);

  const currentDashboard = useMemo(() => {
    return dashboards?.find((dashboard) => dashboard.id === dashboardId);
  }, [dashboards, dashboardId]);

  const columnIds = useMemo(
    () => columns?.map((column) => column.id) ?? [],
    [columns],
  );

  const { cards, isLoading: isCardsLoading } = useCards(columnIds);

  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  const MODAL_KEY_1 = "MODAL_SAMPLE_1";
  const { isShowModal: isShowModal1, openModal: openModal1 } = useModal({
    key: MODAL_KEY_1,
  });

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
    openModal1(true);
  };

  useEffect(() => {
    if (!router.isReady) return;

    if (dashboardId === null && dashboards && dashboards.length > 0) {
      router.replace(`/dashboard/${dashboards[0].id}`);
    }
  }, [router.isReady, dashboardId, dashboards]);

  const isLoading = isColumnsLoading || isCardsLoading;

  return (
    <div>
      <NavigationBar
        members={members ?? []}
        dashboardId={dashboardId ?? null}
      />

      <div className={styles.layoutContainer}>
        <DashboardSideBar dashboards={dashboards ?? []} />
        <main className={styles.main}>
          <div
            className={classnames(styles.dashboardTitle, Typography.xl3Bold)}
          >
            {currentDashboard && (
              <>
                <ColorChip
                  color={currentDashboard?.color}
                  size={CommonSize.Large}
                />
                <h3>{currentDashboard.title}</h3>
              </>
            )}
          </div>
          <div className={styles.columnWrapper}>
            {isLoading ? (
              <div>컬럼 로딩중 넣을화면 들어갈 자리</div>
            ) : (
              (columns?.map((column) => (
                <Column
                  key={column.id}
                  cards={cards?.[column.id] ?? []}
                  onCardClick={handleCardClick}
                  columnTitle={column.title}
                  onClick={(type) => {
                    console.log(
                      `----------------${column.title} 컬럼의 ${type} 클릭`,
                    );
                  }}
                />
              )) ?? [])
            )}
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
