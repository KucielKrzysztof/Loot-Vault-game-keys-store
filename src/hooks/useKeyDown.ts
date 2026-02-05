import { useEffect } from "react";

export const useKeyDown = (
  key: string,
  callback: () => void | null | undefined,
) => {
  useEffect(() => {
    if (!callback) return;
    const handleEventPress = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const isInput =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      const allowsGlobal =
        target.getAttribute("data-allow-global-keys") === "true";

      if (isInput && !allowsGlobal) return;

      if (event.key === key) {
        callback?.();
      }
    };

    document.addEventListener("keydown", handleEventPress);

    return () => {
      document.removeEventListener("keydown", handleEventPress);
    };
  }, [key, callback]);
};
