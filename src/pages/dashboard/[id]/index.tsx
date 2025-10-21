import DashboardLayout from "@/components/dashboard-layout";
import CardDetailModal from "@/features/card/components/card-detail-modal";
import { useCards } from "@/hooks/use-cards";
import { useColumn } from "@/hooks/use-column";
import { useDashboardById } from "@/hooks/use-dashboard";
import { useMembers } from "@/hooks/use-members";
import { useModal } from "@/hooks/use-modal";
import { Card } from "@/types/card";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useMemo, useState } from "react";
import DashboardContent from "./dashboard-content";
import styles from "./index.module.css";

const MEMBERS_PAGE = 1;
const MEMBERS_SIZE = 1000;

export default function DashboardPage() {
  const router = useRouter();
  const { id } = router.query;
  const dashboardId = Array.isArray(id)
    ? Number(id[0])
    : id
      ? Number(id)
      : null;

  const { dashboard } = useDashboardById(dashboardId);
  const { members } = useMembers({
    dashboardId,
    page: MEMBERS_PAGE,
    size: MEMBERS_SIZE,
  });
  const { columns, isLoadingColumns, reloadColumns } = useColumn(dashboardId);
  const columnIds = useMemo(
    () => columns?.map((column) => column.id) ?? [],
    [columns],
  );
  const {
    columnCardsData,
    isLoadingCards,
    reloadCards,
    loadMoreCards: getMoreCards,
  } = useCards(columnIds);

  console.log("Dfsdfdsfsd");

  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  const CARD_DETAIL_MODAL_KEY = "card-detail-modal";
  const { isShowModal, openModal } = useModal({ key: CARD_DETAIL_MODAL_KEY });

  const handleColumnChange = () => {
    reloadColumns({ loading: false });
  };

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
    openModal(true);
  };

  const handleCardChange = () => {
    reloadCards({ loading: false });
  };

  useEffect(() => {
    if (!router.isReady) return;

    if (dashboardId === null && dashboard) {
      router.replace(`/dashboard/${dashboard.id}`);
    }
  }, [router, router.isReady, dashboardId, dashboard]);

  const loadMoreCard = (cursorId: number) => {
    getMoreCards(cursorId);
  };

  return (
    <div className={styles.page}>
      {dashboard && (
        <DashboardContent
          dashboard={dashboard}
          columns={columns ?? []}
          members={members ?? []}
          columnCardsData={columnCardsData ?? {}}
          isLoadingColumns={isLoadingColumns}
          isLoadingCards={isLoadingCards}
          onCardClick={handleCardClick}
          onCardChange={handleCardChange}
          onColumnChange={handleColumnChange}
          onLoadMoreCards={loadMoreCard}
        />
      )}
      {isShowModal && selectedCard !== null && dashboard !== null && (
        <CardDetailModal
          modalKey={CARD_DETAIL_MODAL_KEY}
          card={selectedCard}
          dashboard={dashboard}
          columns={columns ?? []}
          members={members ?? []}
          onDelete={handleCardChange}
          onUpdate={handleCardChange}
        />
      )}
    </div>
  );
}

DashboardPage.getLayout = function getLayout(page: ReactNode) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
