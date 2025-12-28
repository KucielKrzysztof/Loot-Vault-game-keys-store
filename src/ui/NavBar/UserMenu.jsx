import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { User, LogOut, Package, Settings } from "lucide-react";
import { useUser } from "../../Features/auth/hooks/useUser";
import { useLogout } from "../../Features/auth/hooks/useLogout";
import { useClickOutside } from "../../hooks/useClickOutside";

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const { logout, isPending } = useLogout();
  const menuRef = useRef();

  useClickOutside(menuRef, () => setIsOpen(false));

  const fullName = user?.user_metadata?.fullName || "User";

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen((s) => !s)}
        className="hover:text-primary flex items-center gap-2 transition-colors focus:outline-none"
      >
        <span className="hidden text-xs font-black uppercase lg:block">
          {fullName}
        </span>
        <div className="bg-primary text-background flex h-8 w-8 items-center justify-center rounded-full font-bold">
          {fullName[0]}
        </div>
      </button>

      {/* Dropdown Modal */}
      {isOpen && (
        <div className="bg-surface animate-in fade-in zoom-in absolute right-0 z-100 mt-3 w-48 overflow-hidden rounded-2xl border border-white/10 shadow-2xl duration-150">
          <div className="flex flex-col p-2">
            <Link
              to="/profile"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-white/5"
              onClick={() => setIsOpen(false)}
            >
              <User size={16} /> Profile
            </Link>
            <Link
              to="/orders"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-white/5"
              onClick={() => setIsOpen(false)}
            >
              <Package size={16} /> My Orders
            </Link>

            <hr className="my-2 border-white/5" />

            <button
              onClick={logout}
              disabled={isPending}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10"
            >
              <LogOut size={16} /> {isPending ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
