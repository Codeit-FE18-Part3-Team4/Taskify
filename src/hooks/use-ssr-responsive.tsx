import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export function useSsrResponsive() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isMobile = useMediaQuery({ query: "(max-width: 375px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 376px) and (max-width: 744px)",
  });
  const isDesktop = useMediaQuery({ query: "(min-width: 745px)" });

  if (!isClient) {
    return { isMobile: false, isTablet: false, isDesktop: false };
  }

  return { isMobile, isTablet, isDesktop };
}
