import { ShoppingCart, UserCircle } from "lucide-react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="bg-primary flex h-auto w-full justify-between p-2">
      <NavLink to="/"> Homepage </NavLink>
      <div className="flex gap-1">
        <NavLink to="products">Categories</NavLink>
        <div>SearchBar</div>
      </div>
      <div className="flex gap-1">
        <div>
          <ShoppingCart />
        </div>
        <div>
          <UserCircle />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
