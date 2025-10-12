import { useSsrResponsive } from "@/hooks/use-ssr-responsive";

type ResponsiveValueProps<T> = {
  desktop: T;
  tablet: T;
  mobile: T;
}

export function useResponsiveValue<T>({
  desktop,
  tablet,
  mobile,
}: ResponsiveValueProps<T>) {
  const { isTablet, isMobile } = useSsrResponsive();
  if (isMobile) return mobile;
  if (isTablet) return tablet;
  return desktop;
}