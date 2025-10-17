import DashboardSideBar from "@/components/dashboard-side-bar/dashboard-side-bar";
import Modal from "@/components/modal";
import NavigationBar from "@/components/navigationBar/navigation-bar";
import { useCards } from "@/hooks/use-cards";
import { useColumn } from "@/hooks/use-column";
import { useDashboardById } from "@/hooks/use-dashboard";
import { useMembers } from "@/hooks/use-members";
import { useModal } from "@/hooks/use-modal";
import { Card } from "@/types/card";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import DashboardContent from "./dashboard-content";
import styles from "./index.module.css";

export default function DashboardPage() {
  const router = useRouter();
  const { id } = router.query;
  const dashboardId = Array.isArray(id)
    ? Number(id[0])
    : id
      ? Number(id)
      : null;

  const { dashboard } = useDashboardById(dashboardId);
  const { members } = useMembers(dashboardId);
  const { columns, isLoading: isColumnsLoading } = useColumn(dashboardId);
  const columnIds = useMemo(
    () => columns?.map((column) => column.id) ?? [],
    [columns]
  );
  const { cards, isLoading: isCardsLoading } = useCards(columnIds);

  const [stillLoading, setStillLoading] = useState(false);

  useEffect(() => {
    if (isColumnsLoading || isCardsLoading) {
      setStillLoading(true);
    } else {
      setStillLoading(false);
    }
  }, [isColumnsLoading, isCardsLoading]);

  const isLoading = stillLoading || isColumnsLoading || isCardsLoading;

  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const MODAL_KEY_1 = "CARD_MODAL";
  const { isShowModal: isShowModal1, openModal: openModal1 } = useModal({
    key: MODAL_KEY_1,
  });

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
    openModal1(true);
  };

  useEffect(() => {
    if (!router.isReady) return;

    if (dashboardId === null && dashboard) {
      router.replace(`/dashboard/${dashboard.id}`);
    }
  }, [router, router.isReady, dashboardId, dashboard]);

  return (
    <div className={styles.page}>
      <DashboardSideBar />
      <div className={styles.layoutContainer}>
        <NavigationBar
          members={members ?? []}
          dashboardId={dashboardId ?? null}
        />
        <main className={styles.main}>
          {dashboard && (
            <DashboardContent
              dashboard={dashboard}
              columns={columns ?? []}
              cards={cards ?? {}}
              isLoading={isLoading}
              onCardClick={handleCardClick}
            />
          )}
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
