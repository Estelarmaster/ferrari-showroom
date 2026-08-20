import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useStore } from "../../store/useStore";

const links = [
  { label: "Models", href: "#collection" },
  { label: "3D Experience", href: "#hero" },
  { label: "Configurator", href: "#configurator" },
  { label: "Performance", href: "#performance" },
  { label: "Dealers", href: "#dealers" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const openTestDrive = useStore((s) => s.openTestDrive);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || mobileOpen ? "bg-black/85 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5" aria-label="Primary">
        <a href="#hero" className="font-display text-xl tracking-[0.3em] text-white">
          FERRARI
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-300 transition-colors hover:text-[var(--color-rosso-bright)]">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={openTestDrive}
          className="hidden border border-white/30 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-white transition-colors hover:border-[var(--color-rosso)] hover:text-[var(--color-rosso-bright)] lg:inline-flex"
        >
          Test Drive
        </button>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="text-white lg:hidden"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden bg-black lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 pb-8">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="block border-b border-white/10 py-4 text-sm uppercase tracking-[0.2em] text-zinc-200"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    openTestDrive();
                  }}
                  className="mt-4 w-full border border-[var(--color-rosso)] py-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--color-rosso-bright)]"
                >
                  Test Drive
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
