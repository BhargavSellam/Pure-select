import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, ShoppingCart, X } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
import { useCart } from "@/lib/cart";

const links = [
  { hash: "products", label: "Products" },
  { hash: "promise", label: "Our Promise" },
  { hash: "story", label: "Story" },
];

export function SiteHeader() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-5 lg:px-8">
        <Link to="/" className="flex items-center gap-2 sm:gap-3" onClick={() => setOpen(false)}>
          <img src={logo.url} alt="Pure Select logo" className="h-9 w-9 rounded-full sm:h-11 sm:w-11" />
          <span className="text-sm font-semibold tracking-[0.18em] text-primary sm:text-lg sm:tracking-[0.2em]">
            PURE SELECT
          </span>
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          {links.map((l) => (
            <Link key={l.hash} to="/" hash={l.hash} className="transition-colors hover:text-primary">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            className="relative inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:scale-105 sm:px-5 sm:text-sm"
            onClick={() => setOpen(false)}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[11px] font-bold text-accent-foreground">
                {count}
              </span>
            )}
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 text-primary transition-colors hover:bg-secondary md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur-md md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-5">
            {links.map((l) => (
              <Link
                key={l.hash}
                to="/"
                hash={l.hash}
                onClick={() => setOpen(false)}
                className="rounded-xl px-2 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/cart"
              onClick={() => setOpen(false)}
              className="rounded-xl px-2 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
            >
              Cart{count > 0 ? ` (${count})` : ""}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
