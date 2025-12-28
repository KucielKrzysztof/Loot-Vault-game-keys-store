import { useEffect, useState } from "react";
import { ShoppingCart, UserCircle, Menu, Search } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import SearchBar from "./Search/SearchBar";
import Logo from "./Logo";
import { useCart } from "../../Features/cart/hooks/useCart";
import { cn } from "../../utils/cn";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useUser } from "../../Features/auth/hooks/useUser";
import UserMenu from "./UserMenu/UserMenu";

function NavBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { totalQuantity, toggle } = useCart();
  const { isAuthenticated } = useUser();

  const textOutline =
    "[text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000]";

  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    if (isLargeScreen) setIsSearchOpen(false);
  }, [isLargeScreen]);

  return (
    <nav className="bg-primary/80 fixed top-0 z-50 h-16 w-full border-b border-white/10 p-2 backdrop-blur-sm">
      <div className="relative flex h-full items-center justify-between px-4">
        <div
          className={`flex items-center gap-2 ${isSearchOpen ? "hidden lg:flex" : "flex"}`}
        >
          <Logo />
          <NavLink to="products">
            <Menu className="text-gray-300 transition-all duration-300 hover:text-white md:hover:scale-110" />
          </NavLink>
        </div>

        <SearchBar
          isOpen={isSearchOpen}
          setOpen={setIsSearchOpen}
          isLargeScreen={isLargeScreen}
        />

        <div
          className={`flex items-center gap-3 ${isSearchOpen ? "hidden lg:flex" : "flex"}`}
        >
          <button
            onClick={() => setIsSearchOpen(true)}
            className="rounded-full p-2 text-gray-300 hover:text-white lg:hidden"
          >
            <Search size={30} />
          </button>
          <button
            onClick={toggle}
            className="group relative text-gray-300 transition-all hover:text-white"
          >
            <ShoppingCart size={30} />
            {totalQuantity > 0 && (
              <span
                className={cn(
                  "animate-in zoom-in absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-black text-white transition-all",
                  textOutline,
                )}
              >
                {totalQuantity > 99 ? "99+" : totalQuantity}
              </span>
            )}
          </button>
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <Link
              to="/login"
              className="text-gray-300 transition-all hover:text-white"
            >
              <UserCircle size={30} />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
