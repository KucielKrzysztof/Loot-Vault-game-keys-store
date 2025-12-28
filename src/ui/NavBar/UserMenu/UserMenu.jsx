import { useState, useRef } from "react";
import { useUser } from "../../../Features/auth/hooks/useUser";
import { useLogout } from "../../../Features/auth/hooks/useLogout";
import { useClickOutside } from "../../../hooks/useClickOutside";
import UserMenuToggle from "./UserMenuToggle";
import UserMenuDropdown from "./UserMenuDropdown";

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const { logout, isPending } = useLogout();
  const menuRef = useRef();

  useClickOutside(menuRef, () => setIsOpen(false));

  const fullName = user?.user_metadata?.fullName || "User";
  const avatarUrl = user?.user_metadata?.avatar || "";
  const email = user?.email || "";

  return (
    <div className="relative" ref={menuRef}>
      <UserMenuToggle
        fullNam={fullName}
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
