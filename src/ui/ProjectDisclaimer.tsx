import React, { useState, useEffect } from "react";
import { ShieldAlert, Rocket, Info } from "lucide-react";
import Button from "./Button";

function ProjectDisclaimer(): React.JSX.Element | null {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("vault_disclaimer_accepted");
    if (!hasAccepted) {
      setIsOpen(true);
      document.body.style.overflow = "hidden";
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("vault_disclaimer_accepted", "true");
    setIsOpen(false);
    document.body.style.overflow = "unset";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />

      {/* MODAL CONTENT */}
      <div className="bg-surface/40 relative w-full max-w-lg overflow-hidden rounded-[40px] border border-white/10 p-8 text-center shadow-2xl lg:p-12">
        <div className="bg-primary/20 absolute -top-24 -left-24 h-48 w-48 rounded-full blur-[80px]" />

        <div className="relative z-10">
          <div className="bg-primary/10 text-primary mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl">
            <ShieldAlert size={40} />
          </div>

          <h2 className="mb-4 text-3xl font-black tracking-tighter text-white uppercase italic">
            Welcome to <span className="text-primary">The Vault</span>
          </h2>

          <div className="space-y-4 text-sm leading-relaxed font-medium text-white/60">
            <p className="flex items-center justify-center gap-2 text-white">
              <Rocket size={16} className="text-primary" />
              <strong>Portfolio Project Disclaimer</strong>
            </p>
            <p>
              This is a{" "}
              <span className="text-white">non-commercial demonstration</span>.
              No real transactions are processed here, and no real products are
              delivered.
            </p>
            <p className="rounded-2xl border border-white/5 bg-white/5 p-4 text-[12px]">
              <Info size={14} className="mr-1 mb-1 inline" />
              Feel free to test the checkout using{" "}
              <strong>Stripe Test Cards</strong>. Any data provided is used
              solely for the purpose of demonstrating the app's functionality.
            </p>
          </div>

          <div className="mt-8">
            <Button
              onClick={handleAccept}
              variant="primary"
              className="w-full py-4 text-sm font-black tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(var(--color-primary),0.3)] transition-all active:scale-95"
            >
              Enter the Vault
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDisclaimer;
