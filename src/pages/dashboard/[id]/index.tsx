import DashboardSideBar from "@/components/dashboard-side-bar/dashboard-side-bar";
import { Card } from "@/types/card";
import { useModal } from "@/hooks/use-modal";
import { useDashboardById } from "@/hooks/use-dashboard";
import { useColumn } from "@/hooks/use-column";
import { useCards } from "@/hooks/use-cards";
import { useColumn } from "@/hooks/use-column";
import { useDashboardById } from "@/hooks/use-dashboard";
import { useMembers } from "@/hooks/use-members";
import { useModal } from "@/hooks/use-modal";
import { Card } from "@/types/card";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import DashboardContent from "./dashboard-content";
import CardDetailModal from "@/features/card/components/card-detail-modal";

interface SelectedCardInfo {
  card: Card;
  columnTitle: string;
}

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
  const [selectedCardInfo, setSelectedCardInfo] =
    useState<SelectedCardInfo | null>(null);
  const CARD_SHEET = "CARD_SHEET";
  const { isShowModal: isShowCardSheet, openModal: openCardSheet } = useModal({
    key: CARD_SHEET,
  });

  const handleCardClick = (card: Card, columnTitle: string) => {
    setSelectedCardInfo({ card, columnTitle });
    openCardSheet(true);
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

      {isShowCardSheet && selectedCardInfo && dashboard && (
        <CardDetailModal
          modalKey={CARD_SHEET}
          card={selectedCardInfo.card}
          columnTitle={selectedCardInfo.columnTitle}
          dashboardTitle={dashboard.title}
        />
      )}
    </div>
  );
}
