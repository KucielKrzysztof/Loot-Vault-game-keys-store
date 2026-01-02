import { Link } from "react-router-dom";
import AppButton from "./AppButton";
import appleLogo from "../assets/apple-logo.png";
import googleStoreLogo from "../assets/google-store-logo.png";
import { Facebook, Instagram, Twitter } from "lucide-react";

function Footer() {
  const date = new Date().getFullYear();
  const links = [
    "Terms and Conditions",
    "Privacy Policy",
    "Newsletter",
    "Contact Us",
  ];
  const socials = [
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
  ];

  const sectionClasses =
    "flex flex-col items-center justify-center py-10 px-6 border-gray-500 lg:my-2";

  return (
    <footer className="bg-surface mt-auto w-full text-gray-400">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* LINKS */}
        <div className={`${sectionClasses} gap-2 border-b lg:border-b-0`}>
          {links.map((link) => (
            <Link
              key={link}
              to="#"
              className="hover:text-primary transition-colors"
            >
              {link}
            </Link>
          ))}
        </div>

        {/* SOCIALS */}
        <div className={`${sectionClasses} border-b lg:border-b-0 lg:border-l`}>
          <span className="mb-6 text-xs font-bold tracking-widest uppercase">
            Find us on:
          </span>
          <div className="flex gap-4">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <Link key={social.name} to={social.href}>
                  <div className="bg-background hover:bg-background/60 hover:text-primary rounded-2xl border border-white/5 p-3 transition-all">
                    <Icon size={24} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* MOBILE APP */}
        <div className={`${sectionClasses} border-b lg:border-b-0 lg:border-l`}>
          <span className="mb-4 text-xs font-bold tracking-widest uppercase">
            Get the App:
          </span>

          <div className="flex flex-col items-center gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <AppButton
              subtitle="Download on the"
              title="App Store"
              icon={
                <img
                  src={appleLogo}
                  alt="Apple"
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              }
            />
            <AppButton
              subtitle="Download on the"
              title="Google Play"
              icon={
                <img
                  src={googleStoreLogo}
                  alt="Google Play"
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              }
            />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-500 py-8 text-center text-sm font-bold">
        &copy; {date} Krzysztof Kuciel
      </div>
    </footer>
  );
}

export default Footer;
