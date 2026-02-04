import { Link } from "react-router-dom";

function Logo(): React.JSX.Element {
  return (
    <Link
      to="/"
      className="flex h-10 w-auto shrink-0 items-center transition-transform duration-300 md:hover:scale-110 lg:h-12"
    >
      <img
        src="/transaprent1.png"
        alt="Loot Vault Logo"
        loading="lazy"
        className="h-full w-full object-contain object-left"
      />
    </Link>
  );
}

export default Logo;
