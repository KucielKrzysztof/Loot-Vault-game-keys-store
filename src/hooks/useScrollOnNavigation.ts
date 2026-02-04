import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScrollOnNavigation = (): void => {
  const { pathname } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
};
