import { useIsClient } from "@uidotdev/usehooks";
import { useMediaQuery } from "react-responsive";

export function useSsrResponsive() {
  const isClient = useIsClient();

  const isMobile = useMediaQuery({ query: "(max-width: 487px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 376px) and (max-width: 744px)",
  });
  const isDesktop = useMediaQuery({ query: "(min-width: 745px)" });

  if (!isClient) {
    return { isMobile: false, isTablet: false, isDesktop: false };
  }

  return { isMobile, isTablet, isDesktop };
}
