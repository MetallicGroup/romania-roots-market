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
import romaniaHeroMap from "@/assets/romania-hero-map.webp";
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
  { name: "Casă & grădină", icon: Sprout },
  { name: "Bijuterii", icon: Gem },
  { name: "Unelte", icon: Wrench },
  { name: "Jucării", icon: ToyBrick },
  { name: "Construcții", icon: HardHat },
  { name: "Meșteșuguri", icon: Scissors },
  { name: "Mobilă", icon: Armchair },
] as const;

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
    <div className="min-h-screen bg-white text-forest">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 pt-3">
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
          <div className="-mx-2 flex items-center justify-between pb-1.5 pt-0.5">
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
          <div className="border-t border-forest/10 px-4 py-3">
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
      <section className="relative mx-auto max-w-6xl px-1">
        <div
          className="relative aspect-[4/3] w-full overflow-hidden"
          style={{
            WebkitMaskImage:
              "radial-gradient(ellipse 64% 70% at 50% 50%, #000 52%, rgba(0,0,0,0.5) 76%, transparent 97%)",
            maskImage:
              "radial-gradient(ellipse 64% 70% at 50% 50%, #000 52%, rgba(0,0,0,0.5) 76%, transparent 97%)",
          }}
        >
          <img
            src={romaniaHeroMap}
            alt="Hartă România"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "50% 30%", transform: "scale(1.08)" }}
          />
        </div>
        <div className="pointer-events-none absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-full">
          <span className="relative block animate-pin">
            <MapPin className="h-9 w-9 fill-terracotta text-terracotta drop-shadow-md" strokeWidth={1.4} />
            <span className="absolute left-1/2 top-[9px] -translate-x-1/2 text-[9px] font-bold text-white">
              C
            </span>
          </span>
        </div>
      </section>

      {/* Tagline */}
      <p className="mx-auto max-w-6xl px-4 pb-3 pt-1 font-serif text-[19px] italic leading-snug text-forest">
        Platforma producătorilor români
      </p>

      {/* Media 9:16 */}
      <section className="mx-auto max-w-6xl px-2">
        <div
          className="flex gap-1.5 overflow-x-auto pb-1 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
        >
          {MEDIA_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => item.type === "video" && setVideoOpen(true)}
              className="relative aspect-[9/16] w-[29.5%] shrink-0 snap-start overflow-hidden rounded-lg bg-forest"
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
      <section className="mx-auto max-w-6xl px-3 pt-5">
        <div className="rounded-[28px] bg-forest/[0.06] px-2 py-4">
          <div className="grid grid-cols-4 gap-y-4">
            {CATEGORIES.map((c) => {
              const Icon = c.icon;
              return (
                <Link
                  key={c.name}
                  to="/categorii"
                  className="flex flex-col items-center gap-1.5 text-center"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-forest shadow-sm ring-1 ring-forest/10 transition-transform hover:scale-105">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <span className="text-[12px] font-medium leading-tight text-forest">{c.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-3 pt-4">
        <div className="grid grid-cols-3 divide-x divide-white/15 rounded-2xl bg-forest text-cream">
          <Stat n="350" l="producători" />
          <Stat n="1500" l="produse" />
          <Stat n="30" l="zile retur" />
        </div>
      </section>

      {/* Social */}
      <footer className="mx-auto max-w-6xl px-4 pb-10 pt-6">
        <div className="flex items-center justify-center gap-3">
          <SocialBtn label="Google" className="bg-white ring-1 ring-forest/10">
            <GoogleG />
          </SocialBtn>
          <SocialBtn label="YouTube" className="bg-[#FF0000] text-white">
            <Youtube className="h-5 w-5" strokeWidth={1.8} />
          </SocialBtn>
          <SocialBtn
            label="Instagram"
            className="text-white"
            style={{
              background:
                "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
            }}
          >
            <Instagram className="h-5 w-5" strokeWidth={1.8} />
          </SocialBtn>
          <SocialBtn label="TikTok" className="bg-black text-white">
            <TikTokIcon />
          </SocialBtn>
          <SocialBtn label="Facebook" className="bg-[#1877F2] text-white">
            <Facebook className="h-5 w-5 fill-white" strokeWidth={0} />
          </SocialBtn>
        </div>
        <p className="mt-6 text-center text-[11px] text-forest-soft">
          © 2026 ROMproducător · Toate drepturile rezervate
        </p>
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
    <div className="px-2 py-3.5 text-center">
      <p className="font-serif text-[22px] font-semibold leading-none">{n}</p>
      <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-cream/75">{l}</p>
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
      className={`grid h-11 w-11 place-items-center rounded-full shadow-sm transition-transform hover:scale-105 ${className ?? ""}`}
    >
      {children}
    </button>
  );
}

function GoogleG() {
  return (
    <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.6 2.6 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.3l7.8 6C12.3 13.5 17.7 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z" />
      <path fill="#FBBC05" d="M10.4 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.8-6A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.7l7.8-6z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.9 2.3-8.4 2.3-6.3 0-11.7-4-13.6-9.8l-7.8 6C6.5 42.6 14.6 48 24 48z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1-2.59-2.59 2.59 2.59 0 0 1 3.38-2.47V9.66a5.7 5.7 0 0 0-.79-.05 5.68 5.68 0 0 0-5.68 5.68A5.68 5.68 0 0 0 9.86 21a5.68 5.68 0 0 0 5.68-5.68V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.3 4.3 0 0 1-3.24-1.48z" />
    </svg>
  );
}
