import DashboardSideBar from "@/components/dashboard-side-bar/dashboard-side-bar";
import NavigationBar from "@/components/navigationBar/navigation-bar";
import CardDetailModal from "@/features/card/components/card-detail-modal";
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
  const CARD_DETAIL_MODAL_KEY = "card-detail-modal";
  const { isShowModal, openModal } = useModal({ key: CARD_DETAIL_MODAL_KEY });

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
    openModal(true);
  };

  const handleCardDelete = () => {
    console.log("카드 삭제 처리");
  };

  const handleCardCreate = (newCard: Card) => {
    console.log("카드 생성 처리", newCard);
  }

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
              members={members ?? []}
              cards={cards ?? {}}
              isLoading={isLoading}
              onCardClick={handleCardClick}
              onCardCreate={handleCardCreate}
            />
          )}
        </main>
      </div>

      {isShowModal && selectedCard !== null && (
        <CardDetailModal
          modalKey={CARD_DETAIL_MODAL_KEY}
          card={selectedCard}
          dashboardTitle={dashboard?.title ?? ""}
          columns={columns ?? []}
          members={members ?? []}
          onDelete={handleCardDelete}
        />
      )}
    </div>
  );
}
