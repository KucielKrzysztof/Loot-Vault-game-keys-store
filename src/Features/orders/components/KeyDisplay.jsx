import { Copy } from "lucide-react";
import Button from "../../../ui/Button";

function KeyDisplay({ keys, onCopy }) {
  return (
    <div className="flex flex-col gap-2">
      {keys.map((key, index) => (
        <div
          key={`${key}-${index}`}
          className="bg-background group border-primary/20 hover:border-primary/50 flex min-w-0 flex-col items-center justify-between gap-4 rounded-xl border p-3 transition-all sm:flex-row sm:p-4"
        >
          <div className="flex w-full min-w-0 items-center gap-3 sm:w-auto">
            {keys.length > 1 && (
              <span className="font-mono text-xs text-white/20">
                {index + 1}.
              </span>
            )}
            <code className="text-primary w-full min-w-0 text-center font-mono text-xs leading-none tracking-normal break-all sm:w-auto sm:text-left sm:text-lg sm:tracking-[0.2em]">
              {key}
            </code>
          </div>

          <Button
            onClick={() => onCopy(key)}
            className="hover:text-primary flex w-full shrink-0 items-center justify-center gap-2 py-3 text-white/40 transition-colors sm:w-auto sm:bg-transparent sm:py-0"
          >
            <span className="text-[10px] font-bold uppercase sm:hidden">
              Copy Key
            </span>
            <Copy size={18} />
          </Button>
        </div>
      ))}
    </div>
  );
}

export default KeyDisplay;
