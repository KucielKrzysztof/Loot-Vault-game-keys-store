import { useCallback } from "react";
import { notifyGeneric } from "../utils/notifications";

export const useCopyToClipboard = () => {
  const handleCopy = useCallback(
    async (text: string, successMessage = "Copied to clipboard!") => {
      if (!text) return;

      try {
        await navigator.clipboard.writeText(text);

        notifyGeneric(successMessage, "OK");
      } catch (err) {
        console.error("Failed to copy: ", err);
        notifyGeneric("Failed to copy to clipboard", "X");
      }
    },
    [],
  );

  return { handleCopy };
};
