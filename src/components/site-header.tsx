import { Link } from "@tanstack/react-router";
import { Menu, User, Heart, ShoppingBag } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-forest/10 bg-cream/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="font-serif text-xl font-semibold tracking-tight text-forest">
          nume site<span className="text-terracotta">.</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-forest md:flex">
          <Link to="/categorii" className="hover:text-terracotta" activeProps={{ className: "text-terracotta" }}>Categorii</Link>
          <Link to="/despre" className="hover:text-terracotta" activeProps={{ className: "text-terracotta" }}>Despre noi</Link>
          <Link to="/" className="hover:text-terracotta">Producători</Link>
        </nav>
        <div className="flex items-center gap-1.5">
          <Link to="/categorii" className="grid h-9 w-9 place-items-center rounded-full text-forest hover:bg-forest/5 md:hidden" aria-label="Categorii">
            <Menu className="h-[18px] w-[18px]" />
          </Link>
          <button className="grid h-9 w-9 place-items-center rounded-full text-forest hover:bg-forest/5" aria-label="Cont">
            <User className="h-[18px] w-[18px]" />
          </button>
          <button className="grid h-9 w-9 place-items-center rounded-full text-forest hover:bg-forest/5" aria-label="Salvate">
            <Heart className="h-[18px] w-[18px]" />
          </button>
          <button className="grid h-9 w-9 place-items-center rounded-full text-forest hover:bg-forest/5" aria-label="Coș">
            <ShoppingBag className="h-[18px] w-[18px]" />
          </button>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-forest/10 bg-forest text-cream">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <p className="font-serif text-xl">nume site<span className="text-honey">.</span></p>
          <p className="mt-2 text-sm text-cream/70">Gustul satului, direct de la producător.</p>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-honey">Magazin</p>
          <ul className="space-y-1.5 text-sm text-cream/80">
            <li><Link to="/categorii">Categorii</Link></li>
            <li><Link to="/">Toate produsele</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-honey">Companie</p>
          <ul className="space-y-1.5 text-sm text-cream/80">
            <li><Link to="/despre">Despre noi</Link></li>
            <li>Producători</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-honey">Contact</p>
          <p className="text-sm text-cream/80">salut@numesite.ro</p>
          <p className="text-sm text-cream/80">București, România</p>
        </div>
      </div>
      <div className="border-t border-cream/10 px-4 py-4 text-center text-xs text-cream/50">
        © 2026 nume site. Toate drepturile rezervate.
      </div>
    </footer>
  );
}
