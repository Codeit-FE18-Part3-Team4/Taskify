import { useMediaQuery } from "@uidotdev/usehooks";

export function useResponsive() {
  const isMobile = useMediaQuery("(max-width: 375px)");
  const isTablet = useMediaQuery("(min-width: 376px) and (max-width: 744px)");
  const isDesktop = useMediaQuery("(min-width: 745px)");

  return { isMobile, isTablet, isDesktop };
}
