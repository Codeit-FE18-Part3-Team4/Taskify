import { useAuth } from "@/features/auth/components/auth-provider";
import {
  getInvitations,
  putInvitationsAccepts,
} from "@/features/my-dashboard/api/";
import { Invitation } from "@/types/my-dashboard";
import { useCallback, useEffect, useRef, useState } from "react";

export function useInvitations() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [cursorId, setCursorId] = useState<number | undefined>(undefined);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const { isLoadingToken } = useAuth();

  const loadInvitations = useCallback(
    async (reset = false) => {
      if (isLoadingMore && !reset) return;

      try {
        setIsLoadingMore(true);
        const { invitations: newInvitations, cursorId: nextCursor } =
          await getInvitations({
            size: 10,
            cursorId: reset ? undefined : cursorId,
          });

        if (reset) {
          setInvitations(newInvitations);
        } else {
          setInvitations((prev) => [...prev, ...newInvitations]);
        }

        setCursorId(nextCursor);
        setHasMore(newInvitations.length === 10);
      } catch (e) {
        console.error("Failed to load invitations:", e);
      } finally {
        setIsLoadingMore(false);
      }
    },
    [cursorId, isLoadingMore]
  );

  const removeInvitation = useCallback((invitationId: number) => {
    setInvitations((prev) => prev.filter((i) => i.id !== invitationId));
  }, []);

  const handleInvitationAccept = useCallback(
    async (id: number, action: boolean) => {
      try {
        await putInvitationsAccepts({
          invitationsId: id,
          inviteAccepted: action,
        });
        removeInvitation(id);
        return true;
      } catch (e) {
        console.error("Failed to accept/reject invitation:", e);
        return false;
      }
    },
    [removeInvitation]
  );

  useEffect(() => {
    if (isLoadingToken) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          loadInvitations();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, isLoadingMore, loadInvitations, isLoadingToken]);

  useEffect(() => {
    if (isLoadingToken) return;
    loadInvitations(true);
  }, [loadInvitations, isLoadingToken]);

  return {
    invitations,
    isLoadingMore,
    hasMore,
    loadMoreRef,
    handleInvitationAccept,
    removeInvitation,
    refreshInvitations: () => loadInvitations(true),
  };
}
