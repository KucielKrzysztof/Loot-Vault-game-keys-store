import { useEffect } from "react";

export const useKeyDown = (key, callback) => {
  useEffect(() => {
    const handleEventPress = (event) => {
      const isInput =
        event.target.tagName === "INPUT" ||
        event.target.tagName === "TEXTAREA" ||
        event.target.isContentEditable;

      const allowsGlobal =
        event.target.getAttribute("data-allow-global-keys") === "true";

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
