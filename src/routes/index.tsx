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
  MapPin,
  Sparkles,
  UtensilsCrossed,
  Shirt,
  Wine,
  BookOpen,
  Car,
  Hammer,
  Sprout,
  Gem,
  Wrench,
  ToyBrick,
  HardHat,
  Scissors,
  Armchair,
  Facebook,
  Youtube,
  Instagram,
} from "lucide-react";
import romaniaCutout from "@/assets/romania-cutout.webp";
import catAlimentare from "@/assets/categories/alimentare.jpg";
import catBauturi from "@/assets/categories/bauturi.jpg";
import catCasa from "@/assets/categories/casa-gradina.jpg";
import catCosmetice from "@/assets/categories/cosmetice.jpg";
import catImbracaminte from "@/assets/categories/imbracaminte.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const CATEGORIES = [
  { name: "Cosmetice", icon: Sparkles },
  { name: "Alimentare", icon: UtensilsCrossed },
  { name: "Îmbrăcăminte", icon: Shirt },
  { name: "Băuturi", icon: Wine },
  { name: "Lectură", icon: BookOpen },
  { name: "Auto", icon: Car },
  { name: "Bricolaj", icon: Hammer },
  { name: "Casă grădină", icon: Sprout },
  { name: "Bijuterii", icon: Gem },
  { name: "Unelte", icon: Wrench },
  { name: "Jucării", icon: ToyBrick },
  { name: "Construcții", icon: HardHat },
  { name: "Meșteșuguri", icon: Scissors },
  { name: "Mobilă", icon: Armchair },
] as const;

// Aliniere ca în mockup-ul clientului: 4 / 5 / 5
const CATEGORY_ROWS = [CATEGORIES.slice(0, 4), CATEGORIES.slice(4, 9), CATEGORIES.slice(9, 14)];

type MediaItem = {
  id: string;
  type: "video" | "foto";
  label: string;
  image: string;
  badge?: string;
};

const MEDIA_ITEMS: MediaItem[] = [
  { id: "video", type: "video", label: "Povestea noastră", image: catImbracaminte },
  { id: "foto-1", type: "foto", label: "Piața de legume", image: catAlimentare },
  { id: "foto-2", type: "foto", label: "Meșterul din Maramureș", image: catCasa },
  { id: "foto-3", type: "foto", label: "Galerie", image: catBauturi, badge: "+30 foto" },
  { id: "foto-4", type: "foto", label: "Atelier", image: catCosmetice },
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
    <div className="flex min-h-[100dvh] flex-col bg-white text-forest">
      {/* Header */}
      <header className="relative z-30 shrink-0 bg-white">
        <div className="mx-auto max-w-6xl px-4 pt-2.5">
          <div className="flex items-center justify-between">
            <Link to="/" className="font-serif text-[26px] font-semibold leading-none tracking-tight">
              <span className="text-[#CE1126]">R</span>
              <span className="text-[#F5B400]">O</span>
              <span className="text-[#1D4ED8]">M</span>
              <span className="text-forest">producător</span>
            </Link>
            <div className="-mr-2 flex items-center">
              <IconBtn label="Cont">
                <User className="h-5 w-5" strokeWidth={1.6} />
              </IconBtn>
              <IconBtn label="Favorite">
                <Heart className="h-5 w-5" strokeWidth={1.6} />
              </IconBtn>
              <IconBtn label="Coș" badge={cartCount} onClick={() => setCartOpen(true)}>
                <ShoppingBag className="h-5 w-5" strokeWidth={1.6} />
              </IconBtn>
            </div>
          </div>
          <div className="-mx-2 flex items-center justify-between pb-1 pt-0">
            <Link
              to="/categorii"
              className="grid h-9 w-9 place-items-center rounded-full text-forest hover:bg-forest/5"
              aria-label="Meniu"
            >
              <Menu className="h-5 w-5" strokeWidth={1.6} />
            </Link>
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-full text-forest hover:bg-forest/5"
              aria-label="Caută"
            >
              {searchOpen ? (
                <X className="h-5 w-5" strokeWidth={1.6} />
              ) : (
                <Search className="h-5 w-5" strokeWidth={1.6} />
              )}
            </button>
          </div>
        </div>
        {searchOpen && (
          <div className="absolute inset-x-0 top-full border-t border-forest/10 bg-white px-4 py-3 shadow-lg">
            <div className="mx-auto flex max-w-6xl items-center gap-2 rounded-full border border-forest/15 bg-white px-3 py-2">
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

      {/* Hero — harta României */}
      <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-1.5" style={{ minHeight: "30dvh" }}>
        <div className="relative min-h-0 w-full flex-1 overflow-hidden rounded-[5px] bg-[#f1f1ee]">
          <div className="absolute inset-0 flex items-center justify-center p-2">
            <div className="relative h-full" style={{ aspectRatio: "649 / 508" }}>
              <img
                src={romaniaCutout}
                alt="Hartă România"
                className="pointer-events-none h-full w-full object-contain"
                style={{ filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.18))" }}
              />
              <div className="pointer-events-none absolute left-[51%] top-[51%] -translate-x-1/2 -translate-y-full">
                <span className="relative block animate-pin">
                  <MapPin className="h-9 w-9 fill-[#8B1A1A] text-[#8B1A1A] drop-shadow-md" strokeWidth={1.4} />
                  <span className="absolute left-1/2 top-[9px] -translate-x-1/2 text-[9px] font-bold text-white">
                    C
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tagline */}
      <p className="mx-auto w-full max-w-6xl shrink-0 px-4 py-1.5 font-serif text-[19px] italic leading-snug text-forest">
        Platforma producătorilor români
      </p>

      {/* Media */}
      <section className="mx-auto w-full max-w-6xl shrink-0 px-1.5">
        <div
          className="flex gap-1.5 overflow-x-auto snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
        >
          {MEDIA_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => item.type === "video" && setVideoOpen(true)}
              className="relative aspect-[17/20] w-[31%] shrink-0 snap-start sm:w-44 overflow-hidden rounded-[5px] bg-forest"
              aria-label={item.label}
            >
              <img
                src={item.image}
                alt={item.label}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              {item.type === "video" && (
                <>
                  <div className="absolute inset-0 bg-black/20" />
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-white/90 shadow-lg">
                      <Play className="ml-0.5 h-4 w-4 fill-forest text-forest" />
                    </span>
                  </span>
                </>
              )}
              {item.badge && (
                <>
                  <div className="absolute inset-0 bg-black/45" />
                  <span className="absolute inset-0 grid place-items-center font-serif text-lg font-medium text-white">
                    {item.badge}
                  </span>
                </>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Categorii */}
      <section className="mx-auto w-full max-w-6xl shrink-0 px-2 pt-2.5 sm:max-w-2xl">
        <div className="flex flex-col gap-y-2">
          {CATEGORY_ROWS.map((row, i) => (
            <div key={i} className="flex items-start justify-around">
              {row.map((c) => {
                const Icon = c.icon;
                return (
                  <Link
                    key={c.name}
                    to="/categorii"
                    className="flex flex-col items-center gap-0.5 text-center"
                  >
                    <Icon className="h-6 w-6 text-forest/70 transition-transform hover:scale-105" strokeWidth={1.4} />
                    <span className="whitespace-nowrap text-[12px] font-medium leading-tight text-forest">
                      {c.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="mt-auto shrink-0 bg-forest text-cream">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-3 py-2 sm:max-w-2xl">
          <Stat n="350" l="producători" />
          <Stat n="1500" l="produse" />
          <Stat n="30" l="zile retur" />
        </div>
      </section>

      {/* Social */}
      <footer className="mx-auto w-full max-w-6xl shrink-0 px-4 py-1.5 sm:max-w-md">
        <div className="flex items-center justify-between px-1">
          <SocialBtn label="Google">
            <GoogleG />
          </SocialBtn>
          <SocialBtn label="YouTube" className="text-[#FF0000]">
            <Youtube className="h-8 w-8" strokeWidth={1.6} />
          </SocialBtn>
          <SocialBtn label="Instagram" className="text-[#E1306C]">
            <Instagram className="h-7 w-7" strokeWidth={1.8} />
          </SocialBtn>
          <SocialBtn label="TikTok" className="text-black">
            <TikTokIcon />
          </SocialBtn>
          <SocialBtn label="Facebook" className="text-[#1877F2]">
            <Facebook className="h-7 w-7 fill-current" strokeWidth={0} />
          </SocialBtn>
        </div>
      </footer>

      {videoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setVideoOpen(false)}
        >
          <button
            className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-forest"
            onClick={() => setVideoOpen(false)}
            aria-label="Închide"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-forest shadow-2xl"
            style={{ aspectRatio: "9/16" }}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={catImbracaminte} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Play className="h-16 w-16 text-white/70" />
            </div>
            <p className="absolute bottom-4 left-5 font-serif text-white/90">
              Povestea ROMproducător
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <p className="whitespace-nowrap text-[13px] font-bold uppercase leading-none tracking-wide">
      {n} {l}
    </p>
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
      className="relative grid h-9 w-9 place-items-center rounded-full text-forest transition-colors hover:bg-forest/5"
    >
      {children}
      {badge !== undefined && badge > 0 && (
        <span className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-terracotta px-1 text-[10px] font-semibold text-white">
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
  style,
}: {
  children: React.ReactNode;
  label: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      style={style}
      className={`grid h-10 w-10 place-items-center transition-transform hover:scale-110 ${className ?? ""}`}
    >
      {children}
    </button>
  );
}

function GoogleG() {
  return (
    <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.6 2.6 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.3l7.8 6C12.3 13.5 17.7 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z" />
      <path fill="#FBBC05" d="M10.4 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.8-6A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.7l7.8-6z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.9 2.3-8.4 2.3-6.3 0-11.7-4-13.6-9.8l-7.8 6C6.5 42.6 14.6 48 24 48z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1-2.59-2.59 2.59 2.59 0 0 1 3.38-2.47V9.66a5.7 5.7 0 0 0-.79-.05 5.68 5.68 0 0 0-5.68 5.68A5.68 5.68 0 0 0 9.86 21a5.68 5.68 0 0 0 5.68-5.68V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.3 4.3 0 0 1-3.24-1.48z" />
    </svg>
  );
}
