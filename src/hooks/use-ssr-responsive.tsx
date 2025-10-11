"use client";

import { useMediaQuery } from "react-responsive";

export function useSsrResponsive() {
  const isMobile = useMediaQuery({ query: "(max-width: 375px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 376px) and (max-width: 744px)",
  });
  const isDesktop = useMediaQuery({ query: "(min-width: 745px)" });

  return { isMobile, isTablet, isDesktop };
}