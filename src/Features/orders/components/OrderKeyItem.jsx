import { Copy } from "lucide-react";
import Button from "../../../ui/Button";
import { useCopyToClipboard } from "../../../hooks/useCopyToClipboard";

function OrderKeyItem({ item }) {
  const { handleCopy: onCopy } = useCopyToClipboard();

  return (
    <div className="flex w-full min-w-0 flex-col gap-3 rounded-2xl border border-white/5 bg-white/5 p-4 text-left sm:p-5">
      <div className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <h4
          className="truncate text-sm font-bold text-white sm:text-base"
          title={item.title}
        >
          {item.title}
        </h4>

        <span className="bg-primary/10 text-primary shrink-0 rounded-md px-2 py-1 text-[9px] font-black tracking-wider uppercase sm:text-[10px]">
          {item.selectedPlatform}
        </span>
      </div>

      <div className="bg-background group border-primary/20 hover:border-primary/50 flex min-w-0 flex-col items-center justify-between gap-4 rounded-xl border p-3 transition-all sm:flex-row sm:p-4">
        <code className="text-primary w-full min-w-0 text-center font-mono text-xs leading-none tracking-normal break-all sm:w-auto sm:text-left sm:text-lg sm:tracking-[0.2em]">
          {item.licenseKey}
        </code>

        <Button
          onClick={() => onCopy(item.licenseKey)}
          className="hover:text-primary flex w-full shrink-0 items-center justify-center gap-2 py-3 text-white/40 transition-colors sm:w-auto sm:bg-transparent sm:py-0"
        >
          <span className="text-[10px] font-bold uppercase sm:hidden">
            Copy Key
          </span>
          <Copy size={18} />
        </Button>
      </div>
    </div>
  );
}

export default OrderKeyItem;
