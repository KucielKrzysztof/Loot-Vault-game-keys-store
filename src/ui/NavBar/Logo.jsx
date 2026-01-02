import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link
      to="/"
      className="lg:h-12items-center flex h-10 w-auto shrink-0 items-center transition-transform duration-300 md:hover:scale-110"
    >
      <img
        src="/transaprent1.png"
        alt="logo"
        loading="lazy"
        className="h-full w-full object-contain object-left"
      />
    </Link>
  );
}

export default Logo;
