import { LogOut, Package, User } from "lucide-react";
import { Link } from "react-router-dom";

interface UserMenuDropdownProps {
  fullName: string;
  email: string;
  onClose: () => void;
  isLoading: boolean;
  logout: () => void;
}

function UserMenuDropdown({
  fullName,
  email,
  onClose,
  isLoading,
  logout,
}: UserMenuDropdownProps): React.JSX.Element {
  return (
    <div className="bg-surface/90 animate-in fade-in zoom-in slide-in-from-top-2 absolute right-0 z-100 mt-3 w-56 origin-top-right overflow-hidden rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl duration-200">
      <div className="flex flex-col border-b border-white/5 bg-white/5 px-5 py-4">
        <span className="text-xs font-black tracking-tighter text-white uppercase">
          {fullName}
        </span>
        <span className="truncate text-[10px] font-medium text-white/40">
          {email}
        </span>
      </div>

      <div className="flex flex-col p-2">
        <Link
          to="/profile"
          className="group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-white/70 transition-all hover:bg-white/10 hover:text-white"
          onClick={onClose}
        >
          <User
            size={18}
            className="group-hover:text-primary text-white/20 transition-colors"
          />
          Profile Settings
        </Link>

        <Link
          to="/orders"
          className="group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-white/70 transition-all hover:bg-white/10 hover:text-white"
          onClick={onClose}
        >
          <Package
            size={18}
            className="group-hover:text-primary text-white/20 transition-colors"
          />
          My Orders
        </Link>

        <div className="my-2 px-4">
          <hr className="border-white/5" />
        </div>

        <button
          onClick={() => logout()}
          disabled={isLoading}
          className="group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-red-400/80 transition-all hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut
            size={18}
            className="text-red-400/30 transition-colors group-hover:text-red-400"
          />
          {isLoading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
}

export default UserMenuDropdown;
