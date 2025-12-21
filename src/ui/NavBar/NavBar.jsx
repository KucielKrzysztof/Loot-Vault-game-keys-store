import { useEffect, useState } from "react";
import { ShoppingCart, UserCircle, Menu, Search } from "lucide-react";
import { NavLink } from "react-router-dom";
import SearchBar from "../Search/SearchBar";
import Logo from "./Logo";

function NavBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
          <button className="text-gray-300 transition-colors hover:text-white">
            <ShoppingCart size={30} />
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
