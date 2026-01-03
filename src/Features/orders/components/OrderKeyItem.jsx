import { useCopyToClipboard } from "../../../hooks/useCopyToClipboard";
import KeyDisplay from "./KeyDisplay";

function OrderKeyItem({ item }) {
  const { handleCopy: onCopy } = useCopyToClipboard();

  const keys = Array.isArray(item.licenseKeys)
    ? item.licenseKeys
    : item.licenseKey
      ? [item.licenseKey]
      : [];

  return (
    <div className="flex w-full min-w-0 flex-col gap-3 rounded-2xl border border-white/5 bg-white/5 p-4 text-left sm:p-5">
      <div className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <h4 className="truncate text-sm font-bold text-white sm:text-base">
          {item.title} {item.quantity > 1 && `(x${item.quantity})`}
        </h4>

        <span className="bg-primary/10 text-primary shrink-0 rounded-md px-2 py-1 text-[9px] font-black tracking-wider uppercase sm:text-[10px]">
          {item.selectedPlatform}
        </span>
      </div>

      <KeyDisplay keys={keys} onCopy={onCopy} />
    </div>
  );
}

export default OrderKeyItem;
