import { Loader2 } from "lucide-react";

function FullPageLoader() {
  return (
    <div className="animate-in fade-in fixed inset-0 z-100 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md duration-300">
      <div className="relative">
        <Loader2
          className="text-primary animate-spin"
          size={60}
          strokeWidth={3}
        />
        <div className="bg-primary/20 absolute inset-0 animate-pulse blur-xl" />
      </div>
      <p className="mt-4 animate-pulse text-sm font-black tracking-[0.2em] text-white uppercase">
        Loading Vault...
      </p>
    </div>
  );
}

export default FullPageLoader;
