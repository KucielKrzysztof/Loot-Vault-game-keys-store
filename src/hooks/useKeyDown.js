import { useEffect } from "react";

export const useKeyDown = (key, callback) => {
  useEffect(() => {
    const handleEventPress = (event) => {
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
