import { ChevronDown } from "lucide-react";

function UserMenuToggle({ fullName, avatarUrl, isOpen, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="group flex items-center gap-3 rounded-full border border-white/5 bg-white/5 p-1 pr-3 transition-all hover:bg-white/10 focus:outline-none"
    >
      <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full shadow-inner">
        {!avatarUrl ? (
          <div className="bg-primary text-background flex h-full w-full items-center justify-center text-sm font-bold">
            {fullName[0]?.toUpperCase()}
          </div>
        ) : (
          <img
            src={avatarUrl}
            alt={fullName}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <span className="hidden text-xs font-black tracking-wider text-white/80 uppercase group-hover:text-white lg:block">
        {fullName}
      </span>

      <ChevronDown
        size={14}
        className={`text-white/30 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
      />
    </button>
  );
}

export default UserMenuToggle;
