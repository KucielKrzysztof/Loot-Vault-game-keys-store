import { notifyGeneric } from "../utils/notifications";

export const useCopyToClipboard = () => {
  function handleCopy(text, successMessage = "Copied to clipboard!") {
    if (!text) return;
    navigator.clipboard.writeText(text);
    notifyGeneric(successMessage, "OK");
  }

  return { handleCopy };
};
