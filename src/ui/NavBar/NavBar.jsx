import { useEffect, useState } from "react";
import { ShoppingCart, UserCircle, Menu, Search } from "lucide-react";
import { NavLink } from "react-router-dom";
import SearchBar from "../Search/SearchBar";
import Logo from "./Logo";
import { useCart } from "../../Features/cart/hooks/useCart";
import { cn } from "../../utils/cn";

function NavBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { totalQuantity, toggle } = useCart();
  const textOutline =
    "[text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000]";

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          onClose={() => setIsSearchOpen(false)}
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
          <button className="text-gray-300 transition-colors hover:text-white">
            <UserCircle size={30} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
