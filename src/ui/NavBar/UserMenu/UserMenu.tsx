import { useState, useRef } from "react";
import { useUser } from "../../../Features/auth/hooks/useUser";
import { useLogout } from "../../../Features/auth/hooks/useLogout";
import { useClickOutside } from "../../../hooks/useClickOutside";
import UserMenuToggle from "./UserMenuToggle";
import UserMenuDropdown from "./UserMenuDropdown";

function UserMenu(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user } = useUser();
  const { logout, isPending } = useLogout();
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => setIsOpen(false));

  const fullName: string =
    user?.user_metadata?.fullName || user?.user_metadata?.full_name || "User";

  const avatarUrl: string =
    user?.user_metadata?.avatar ||
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture ||
    "";

  const email: string = user?.email || "";

  return (
    <div className="relative" ref={menuRef}>
      <UserMenuToggle
        fullName={fullName}
        avatarUrl={avatarUrl}
        isOpen={isOpen}
        onToggle={() => setIsOpen((s) => !s)}
      />

      {isOpen && (
        <UserMenuDropdown
          fullName={fullName}
          email={email}
          logout={logout}
          isLoading={isPending}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export default UserMenu;
