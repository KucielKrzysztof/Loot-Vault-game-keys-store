import { toast, type Toast } from "react-hot-toast";
import { X } from "lucide-react";
import type { ReactNode } from "react";

export function notifyAddedToCart(
  game: string,
  platform: string,
  openCart: () => void,
) {
  toast.success(
    (t: Toast) => (
      <div className="flex min-w-70 items-center gap-4 py-1">
        <div className="flex flex-1 flex-col">
          <strong className="block text-[10px] font-bold tracking-widest text-emerald-400 uppercase italic">
            Added To Cart!
          </strong>
          <h3 className="text-sm leading-tight font-black text-white">
            {game}
          </h3>
          <span className="text-[10px] font-medium tracking-widest text-gray-400 uppercase">
            Platform:{" "}
            <strong className="text-primary font-bold">{platform}</strong>
          </span>
        </div>

        <button
          onClick={() => {
            toast.dismiss(t.id);
            openCart();
          }}
          className="flex flex-col items-center justify-center rounded-lg border border-white/5 bg-white/5 px-3 py-2 text-[11px] font-black tracking-wider text-white uppercase transition-all hover:bg-white/10 active:scale-95"
        >
          <p>Check</p> <p>Cart</p>
        </button>
      </div>
    ),
    { duration: 4000 },
  );
}

export const notifyGeneric = (
  message: string,
  buttonTxt: string | ReactNode,
  handleClick?: () => void,
) => {
  toast.success(
    (t: Toast) => (
      <div className="flex min-w-70 items-center justify-between gap-4 py-1">
        <h3 className="text-sm leading-tight font-black text-white">
          {message}
        </h3>

        <button
          onClick={() => {
            toast.dismiss(t.id);
            handleClick?.();
          }}
          className="flex flex-col items-center justify-center rounded-lg border border-white/5 bg-white/5 px-3 py-2 text-[11px] font-black tracking-wider text-white uppercase transition-all hover:bg-white/10 active:scale-95"
        >
          {buttonTxt}
        </button>
      </div>
    ),
    { duration: 4000 },
  );
};

export const notifyError = (message: string, error?: unknown): void => {
  toast.error(
    (t: Toast) => {
      const errorDescription = error
        ? error instanceof Error
          ? error.message
          : String(error)
        : null;

      return (
        <div className="flex min-w-70 items-center justify-between gap-4 py-1">
          <div>
            <h3 className="text-sm leading-tight font-black text-red-500">
              {message}
            </h3>
            {errorDescription && (
              <p className="text-xs text-red-400">{errorDescription}</p>
            )}
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="flex flex-col items-center justify-center rounded-lg border border-white/5 bg-white/5 px-3 py-2 text-[11px] text-red-500 transition-all hover:bg-white/10 active:scale-95"
          >
            <X size={16} />
          </button>
        </div>
      );
    },
    { duration: 4000 },
  );
};
