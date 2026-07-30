import { createFileRoute, Link } from "@tanstack/react-router";
import { products as catalog, categories } from "@/lib/products";
import { SiteFooter } from "@/components/site-header";
import { useState } from "react";
import {
  Search,
  Menu,
  User,
  Heart,
  ShoppingBag,
  Play,
  X,
  Plus,
  MapPin,
} from "lucide-react";
import romaniaHeroMap from "@/assets/romania-hero-map.webp.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
});

type Product = (typeof catalog)[number];

const products: Product[] = catalog.slice(0, 6);


function Index() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [cart, setCart] = useState<string[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const shown: Product[] = q
    ? catalog.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.region.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.producer.toLowerCase().includes(q),
      ).slice(0, 6)
    : products;


  const addToCart = (id: string) => setCart((c) => [...c, id]);
  const toggleSave = (id: string) =>
    setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO — vertical, full viewport height */}
      <section className="relative min-h-[110vh] w-full overflow-hidden">
        {/* Map background */}
        <MapBackground />

        {/* Video thumbnail — absolute top-left corner, no padding */}
        <button
          onClick={() => setVideoOpen(true)}
          className="absolute left-1 top-1 z-20 w-[180px] overflow-hidden rounded-xl shadow-lg ring-1 ring-forest/10 transition-transform hover:scale-[1.02] animate-fade-up"
          style={{ aspectRatio: "16/9" }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg,#3a2814 0%,#7a4a1c 50%,#c78118 100%)",
            }}
          />
          <div className="absolute inset-0 bg-black/25" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-cream/95 shadow-md transition-transform group-hover:scale-110">
              <Play className="h-3.5 w-3.5 fill-forest text-forest" />
            </span>
          </div>
          <span className="absolute bottom-1.5 left-2.5 font-serif text-[10px] font-medium text-cream/95">
            Povestea noastră · 4:32
          </span>
        </button>

        {/* Header */}
        <header className="relative z-20 flex items-start justify-end px-1 pt-1 sm:px-2">
          <div className="flex flex-col items-end gap-1">
            <nav className="flex items-center gap-1.5">
              <IconBtn label="Categorii"><Menu className="h-[18px] w-[18px]" /></IconBtn>
              <IconBtn label="Cont"><User className="h-[18px] w-[18px]" /></IconBtn>
              <IconBtn label="Salvate" badge={saved.length}>
                <Heart className="h-[18px] w-[18px]" />
              </IconBtn>
              <IconBtn label="Coș" badge={cart.length} onClick={() => setCartOpen(true)}>
                <ShoppingBag className="h-[18px] w-[18px]" />
              </IconBtn>
            </nav>
            <a href="/" className="font-serif text-xl font-semibold tracking-tight text-forest">
              nume site<span className="text-terracotta">.</span>
            </a>
          </div>
        </header>

        {/* Products — positioned over the Bulgaria area, compact strip */}
        <div className="absolute inset-x-0 bottom-[10vh] z-10 px-1 pb-3">
          <div className="mx-auto max-w-3xl">
            <div className="mb-5 flex items-center justify-between px-2">
              <div className="drop-shadow-sm">
                <p className="text-xs font-bold leading-tight text-cream">Livrare gratuită</p>
                <p className="text-[10px] font-semibold leading-tight text-cream/90">la comenzi de peste 500 lei</p>
              </div>
              <div className="flex w-1/3 items-center gap-1 rounded-full bg-card/90 px-2 py-1.5 shadow-md ring-1 ring-forest/10 backdrop-blur">
                <Search className="h-3 w-3 shrink-0 text-forest-soft" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Caută"
                  className="min-w-0 flex-1 bg-transparent text-[10px] text-forest placeholder:text-forest-soft/70 focus:outline-none"
                />
                {query && (
                  <button onClick={() => setQuery("")} aria-label="Șterge căutarea">
                    <X className="h-3 w-3 shrink-0 text-forest-soft" />
                  </button>
                )}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-[2px]">
              {shown.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  isSaved={saved.includes(p.id)}
                  onSave={() => toggleSave(p.id)}
                  onAdd={() => addToCart(p.id)}
                />
              ))}
            </div>
            {query && shown.length === 0 && (
              <p className="mt-3 rounded-xl bg-card/90 px-3 py-2 text-center text-[11px] text-forest-soft backdrop-blur">
                Niciun produs pentru „{query}”.
              </p>
            )}
          </div>
        </div>

      </section>

      {/* Categorii */}
      <section className="bg-cream px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-serif text-3xl text-forest md:text-4xl">Categorii</h2>
              <p className="mt-2 text-sm text-forest-soft">Bunătățile satului, împărțite după tradiție.</p>
            </div>
            <Link to="/categorii" className="text-sm text-terracotta hover:underline">Vezi toate →</Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {categories.map((c) => {
              const sample = catalog.find((p) => p.category === c.slug);
              return (
                <Link
                  key={c.slug}
                  to="/categorie/$slug"
                  params={{ slug: c.slug }}
                  className="group overflow-hidden rounded-2xl border border-forest/10 bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="aspect-square overflow-hidden bg-cream">
                    {sample && <img src={sample.image} alt={c.name} loading="lazy" width={512} height={512} className="h-full w-full object-cover transition-transform group-hover:scale-105" />}
                  </div>
                  <div className="p-3">
                    <h3 className="font-serif text-base text-forest">{c.name}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Produse populare */}
      <section className="bg-cream px-4 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-serif text-3xl text-forest md:text-4xl">Produse populare</h2>
              <p className="mt-2 text-sm text-forest-soft">Alese cu grijă de la producători mici.</p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {catalog.slice(0, 8).map((p) => (
              <Link
                key={p.id}
                to="/produs/$id"
                params={{ id: p.id }}
                className="group overflow-hidden rounded-2xl border border-forest/10 bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="aspect-square overflow-hidden bg-cream">
                  <img src={p.image} alt={p.name} loading="lazy" width={512} height={512} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <p className="text-xs text-forest-soft">{p.region}</p>
                  <h3 className="mt-1 font-serif text-base text-forest">{p.name}</h3>
                  <p className="mt-2 text-sm font-medium text-forest">{p.price} lei</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Despre */}
      <section className="bg-forest px-4 py-20 text-cream">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm uppercase tracking-widest text-honey">Despre noi</p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">Gustul satului, adus la tine acasă.</h2>
            <p className="mt-4 text-cream/80">
              Lucrăm direct cu familii de producători din toată România. Miere culesă în livezi, dulcețuri fierte la ceaun, brânzeturi din stânele muntelui — totul cu poveste și cu nume.
            </p>
            <Link to="/despre" className="mt-6 inline-block rounded-full bg-honey px-6 py-3 font-medium text-forest transition-transform hover:scale-[1.02]">
              Povestea noastră
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Stat n="40+" l="Producători" />
            <Stat n="12" l="Regiuni" />
            <Stat n="100%" l="Natural" />
          </div>
        </div>
      </section>

      <SiteFooter />




      {/* Video modal */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setVideoOpen(false)}
        >
          <button
            className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-cream/95 text-forest transition-transform hover:scale-105"
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
              Video placeholder — Povestea Prisma Satului
            </p>
          </div>
        </div>
      )}

      {/* Cart drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50" onClick={() => setCartOpen(false)}>
          <div className="absolute inset-0 bg-forest/40 backdrop-blur-sm" />
          <aside
            className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-cream shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-forest/10 px-5 py-4">
              <h3 className="font-serif text-xl text-forest">Coșul tău</h3>
              <button
                onClick={() => setCartOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full text-forest hover:bg-forest/5"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              {cart.length === 0 ? (
                <p className="pt-8 text-center text-sm text-forest-soft">
                  Coșul e gol. Adaugă bunătăți din grădina satului.
                </p>
              ) : (
                <ul className="space-y-3">
                  {cart.map((id, i) => {
                    const p = catalog.find((x) => x.id === id)!;
                    return (
                      <li
                        key={i}
                        className="flex items-center gap-3 rounded-2xl border border-forest/10 bg-card p-3"
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-12 w-12 shrink-0 rounded-xl object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-serif text-sm text-forest">{p.name}</p>
                          <p className="text-xs text-forest-soft">{p.region}</p>
                        </div>
                        <span className="shrink-0 font-medium text-forest">{p.price} lei</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            {cart.length > 0 && (
              <div className="border-t border-forest/10 p-5">
                <button className="w-full rounded-full bg-honey py-3 font-medium text-forest shadow-md transition-transform hover:scale-[1.01]">
                  Comandă · {cart.reduce((s, id) => s + (catalog.find((p) => p.id === id)?.price ?? 0), 0)} lei
                </button>
              </div>
            )}
          </aside>
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
      onClick={onClick}
      aria-label={label}
      className="relative grid h-10 w-10 place-items-center rounded-full bg-card/80 text-forest ring-1 ring-forest/10 backdrop-blur transition-all hover:scale-105 hover:bg-card hover:shadow-md"
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

function ProductCard({
  product,
  isSaved,
  onSave,
  onAdd,
}: {
  product: Product;
  isSaved: boolean;
  onSave: () => void;
  onAdd: () => void;
}) {
  return (
    <Link
      to="/produs/$id"
      params={{ id: product.id }}
      className="group flex flex-col overflow-hidden rounded-lg border border-forest/10 bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-cream">
        <img src={product.image} alt={product.name} loading="lazy" width={256} height={256} className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105" />
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onSave(); }}
          aria-label="Salvează"
          className="absolute right-1 top-1 grid h-4 w-4 place-items-center rounded-full bg-cream/90 text-forest backdrop-blur transition-transform hover:scale-110"
        >
          <Heart className={`h-2 w-2 ${isSaved ? "fill-terracotta text-terracotta" : ""}`} />
        </button>
        <span className="absolute bottom-1 left-1 rounded-full bg-cream/90 px-1 py-0.5 text-[7px] font-medium text-forest backdrop-blur">
          {product.region}
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-between p-1">
        <h3 className="font-serif text-[10px] leading-tight text-forest">{product.name}</h3>
        <div className="flex items-center justify-between pt-0.5">
          <p className="text-[8px] text-forest-soft">{product.weights[0]} · {product.price} lei</p>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAdd(); }}
            aria-label="Adaugă în coș"
            className="grid h-4 w-4 place-items-center rounded-full bg-honey text-forest shadow-sm transition-transform hover:scale-110"
          >
            <Plus className="h-2 w-2" />
          </button>
        </div>
      </div>
    </Link>
  );
}


function MapBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={romaniaHeroMap.url}
        alt="Hartă România"
        className="absolute -top-[16%] left-0 h-[110%] w-full object-cover object-center md:-top-[8%] md:h-[103%]"
      />
    </div>
  );
}


function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="rounded-2xl border border-cream/15 bg-cream/5 p-4 text-center">
      <p className="font-serif text-2xl text-honey">{n}</p>
      <p className="mt-1 text-xs text-cream/70">{l}</p>
    </div>
  );
}
