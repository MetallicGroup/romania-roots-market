import { createFileRoute, Link } from "@tanstack/react-router";
import { products as catalog } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useState } from "react";
import {
  Search,
  Menu,
  User,
  Heart,
  ShoppingBag,
  Play,
  X,
  Facebook,
  Youtube,
} from "lucide-react";
import romaniaHeroMap from "@/assets/romania-hero-map.webp";
import catAlimentare from "@/assets/categories/alimentare.jpg";
import catBauturi from "@/assets/categories/bauturi.jpg";
import catCasa from "@/assets/categories/casa-gradina.jpg";
import catCosmetice from "@/assets/categories/cosmetice.jpg";
import catImbracaminte from "@/assets/categories/imbracaminte.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const CATEGORY_CLOUD = [
  { name: "cosmetice", href: "/categorii" },
  { name: "alimentare", href: "/categorie/miere" },
  { name: "îmbrăcăminte", href: "/categorii", withPhoto: true },
  { name: "băuturi", href: "/categorii" },
  { name: "lectură", href: "/categorii" },
  { name: "bricolaj & construcții", href: "/categorii" },
  { name: "casă grădină", href: "/categorii" },
  { name: "meșteșuguri", href: "/categorii" },
  { name: "mobilă", href: "/categorii" },
] as const;

const MEDIA_ITEMS = [
  { id: "video", type: "video" as const, label: "Povestea noastră", image: catAlimentare },
  { id: "foto-1", type: "foto" as const, label: "Foto", image: catBauturi },
  { id: "foto-2", type: "foto" as const, label: "Foto", image: catCasa, badge: "+30 foto" },
  { id: "foto-3", type: "foto" as const, label: "Foto", image: catCosmetice },
  { id: "foto-4", type: "foto" as const, label: "Foto", image: catImbracaminte },
];

const MAP_PINS = [
  { top: "28%", left: "32%" },
  { top: "34%", left: "48%" },
  { top: "42%", left: "58%" },
  { top: "38%", left: "72%" },
  { top: "52%", left: "40%" },
  { top: "55%", left: "62%" },
  { top: "62%", left: "50%" },
  { top: "48%", left: "28%" },
];

function Index() {
  const { cartCount, setCartOpen } = useCart();
  const [videoOpen, setVideoOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const searchResults = q
    ? catalog.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.region.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.producer.toLowerCase().includes(q),
      )
    : [];

  return (
    <div className="min-h-screen bg-cream text-forest">
      {/* Header — ROMproducător + iconițe */}
      <header className="sticky top-0 z-30 border-b border-forest/10 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="font-serif text-xl font-semibold tracking-tight sm:text-2xl">
            <span className="text-[#CE1126]">R</span>
            <span className="text-[#FCD116]">O</span>
            <span className="text-[#002B7F]">M</span>
            <span className="text-forest">producător</span>
          </Link>
          <div className="flex items-center gap-0.5">
            <IconBtn label="Cont">
              <User className="h-[18px] w-[18px]" />
            </IconBtn>
            <IconBtn label="Favorite">
              <Heart className="h-[18px] w-[18px]" />
            </IconBtn>
            <IconBtn label="Coș" badge={cartCount} onClick={() => setCartOpen(true)}>
              <ShoppingBag className="h-[18px] w-[18px]" />
            </IconBtn>
          </div>
        </div>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 pb-3">
          <Link
            to="/categorii"
            className="grid h-10 w-10 place-items-center rounded-full text-forest hover:bg-forest/5"
            aria-label="Meniu"
          >
            <Menu className="h-5 w-5" />
          </Link>
          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full text-forest hover:bg-forest/5"
            aria-label="Caută"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
        {searchOpen && (
          <div className="border-t border-forest/10 px-4 py-3">
            <div className="mx-auto flex max-w-6xl items-center gap-2 rounded-full border border-forest/15 bg-card px-3 py-2">
              <Search className="h-4 w-4 shrink-0 text-forest-soft" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Caută produse, regiuni, producători…"
                className="min-w-0 flex-1 bg-transparent text-sm text-forest placeholder:text-forest-soft/70 focus:outline-none"
              />
              {query && (
                <button type="button" onClick={() => setQuery("")} aria-label="Șterge">
                  <X className="h-4 w-4 text-forest-soft" />
                </button>
              )}
            </div>
            {q && (
              <ul className="mx-auto mt-2 max-w-6xl space-y-1">
                {searchResults.length === 0 ? (
                  <li className="px-2 py-2 text-sm text-forest-soft">Niciun rezultat.</li>
                ) : (
                  searchResults.slice(0, 5).map((p) => (
                    <li key={p.id}>
                      <Link
                        to="/produs/$id"
                        params={{ id: p.id }}
                        className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-forest/5"
                        onClick={() => setSearchOpen(false)}
                      >
                        <img src={p.image} alt="" className="h-9 w-9 rounded-lg object-cover" />
                        <span className="font-serif text-sm text-forest">{p.name}</span>
                        <span className="ml-auto text-xs text-forest-soft">{p.region}</span>
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
        )}
      </header>

      {/* Hero — hartă full + pinuri */}
      <section className="relative w-full overflow-hidden bg-forest" style={{ height: "58svh" }}>
        <img
          src={romaniaHeroMap}
          alt="Hartă România"
          className="pointer-events-none absolute inset-0 h-full w-full object-contain object-[center_30%]"
          style={{ transform: "scale(1.28) translate(0.5%, -1%)" }}
        />
        {MAP_PINS.map((pin, i) => (
          <span
            key={i}
            className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-terracotta shadow ring-2 ring-cream/80 animate-pin"
            style={{ top: pin.top, left: pin.left, animationDelay: `${i * 0.18}s` }}
          />
        ))}
      </section>

      {/* Media 9:16 carousel */}
      <section className="bg-cream px-3 pt-4">
        <div
          className="flex gap-2 overflow-x-auto pb-1 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
        >
          {MEDIA_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => item.type === "video" && setVideoOpen(true)}
              className="relative aspect-[9/16] w-[31%] shrink-0 snap-start overflow-hidden rounded-xl bg-forest shadow-sm"
            >
              <img
                src={item.image}
                alt={item.label}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-forest/35" />
              {item.type === "video" ? (
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-cream/95 shadow-md">
                    <Play className="h-4 w-4 fill-forest text-forest" />
                  </span>
                </span>
              ) : (
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest/80 to-transparent px-2 pb-2 pt-8 text-left font-serif text-[11px] text-cream">
                  {item.label}
                </span>
              )}
              {"badge" in item && item.badge && (
                <span className="absolute right-1.5 top-1.5 rounded-full bg-cream/95 px-2 py-0.5 text-[10px] font-semibold text-forest shadow">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Category cloud */}
      <section className="bg-cream px-5 py-10">
        <div className="mx-auto flex max-w-lg flex-wrap items-center justify-center gap-x-4 gap-y-3">
          {CATEGORY_CLOUD.map((c) =>
            "withPhoto" in c && c.withPhoto ? (
              <Link
                key={c.name}
                to={c.href}
                className="inline-flex items-center gap-2 font-serif text-lg text-forest transition-colors hover:text-terracotta sm:text-xl"
              >
                <img
                  src={catImbracaminte}
                  alt=""
                  className="h-8 w-8 rounded-full object-cover ring-1 ring-forest/15"
                />
                {c.name}
              </Link>
            ) : (
              <Link
                key={c.name}
                to={c.href}
                className="font-serif text-lg text-forest transition-colors hover:text-terracotta sm:text-xl"
              >
                {c.name}
              </Link>
            ),
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-cream px-4 pb-10">
        <div className="mx-auto grid max-w-lg grid-cols-3 overflow-hidden rounded-2xl border border-forest/15">
          <div className="border-r border-forest/15 px-2 py-4 text-center">
            <p className="font-serif text-xl text-forest sm:text-2xl">350</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-wider text-forest-soft">producători</p>
          </div>
          <div className="border-r border-forest/15 px-2 py-4 text-center">
            <p className="font-serif text-xl text-forest sm:text-2xl">1500</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-wider text-forest-soft">produse</p>
          </div>
          <div className="px-2 py-4 text-center">
            <p className="font-serif text-xl text-forest sm:text-2xl">30</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-wider text-forest-soft">zile</p>
          </div>
        </div>
      </section>

      {/* Social */}
      <footer className="border-t border-forest/10 bg-cream px-4 py-8">
        <div className="mx-auto flex max-w-lg items-center justify-center gap-5">
          <SocialBtn label="Google" className="bg-[#EA4335]/15 text-[#EA4335]">
            <span className="font-serif text-lg font-bold">G</span>
          </SocialBtn>
          <SocialBtn label="TikTok" className="bg-forest/10 text-forest">
            <span className="font-serif text-base font-bold">♪</span>
          </SocialBtn>
          <SocialBtn label="YouTube" className="bg-[#FF0000]/15 text-[#FF0000]">
            <Youtube className="h-5 w-5" />
          </SocialBtn>
          <SocialBtn label="Facebook" className="bg-[#1877F2]/15 text-[#1877F2]">
            <Facebook className="h-5 w-5" />
          </SocialBtn>
        </div>
        <p className="mt-6 text-center text-xs text-forest-soft">
          © 2026 ROMproducător. Toate drepturile rezervate.
        </p>
      </footer>

      {videoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setVideoOpen(false)}
        >
          <button
            className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-cream/95 text-forest"
            onClick={() => setVideoOpen(false)}
            aria-label="Închide"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-forest shadow-2xl"
            style={{ aspectRatio: "16/9" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Play className="h-16 w-16 text-cream/40" />
            </div>
            <p className="absolute bottom-4 left-5 font-serif text-cream/80">
              Video placeholder — Povestea ROMproducător
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function IconBtn({
  children,
  badge,
  onClick,
  label,
}: {
  children: React.ReactNode;
  badge?: number;
  onClick?: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="relative grid h-10 w-10 place-items-center rounded-full text-forest transition-colors hover:bg-forest/5"
    >
      {children}
      {badge !== undefined && badge > 0 && (
        <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-terracotta px-1 text-[10px] font-semibold text-cream">
          {badge}
        </span>
      )}
    </button>
  );
}

function SocialBtn({
  children,
  label,
  className,
}: {
  children: React.ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`grid h-12 w-12 place-items-center rounded-full transition-transform hover:scale-105 ${className ?? ""}`}
    >
      {children}
    </button>
  );
}
