import { createFileRoute } from "@tanstack/react-router";
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

export const Route = createFileRoute("/")({
  component: Index,
});

type Product = {
  id: string;
  name: string;
  region: string;
  weights: string[];
  price: number;
  swatch: string;
};

const products: Product[] = [
  { id: "1", name: "Miere de salcâm", region: "Bihor", weights: ["250g", "500g", "1kg"], price: 42, swatch: "linear-gradient(160deg,#f5c150,#c78118)" },
  { id: "2", name: "Miere de tei", region: "Argeș", weights: ["250g", "500g"], price: 38, swatch: "linear-gradient(160deg,#e6a94a,#8a5a1a)" },
  { id: "3", name: "Dulceață de afine", region: "Bucovina", weights: ["220g", "400g"], price: 32, swatch: "linear-gradient(160deg,#5a3a7a,#241436)" },
  { id: "4", name: "Miere poliflora", region: "Maramureș", weights: ["500g", "1kg"], price: 45, swatch: "linear-gradient(160deg,#eab24a,#a86b12)" },
  { id: "5", name: "Dulceață de trandafiri", region: "Dobrogea", weights: ["220g"], price: 36, swatch: "linear-gradient(160deg,#e78ba5,#9a3a55)" },
  { id: "6", name: "Zacuscă de casă", region: "Moldova", weights: ["300g", "500g"], price: 28, swatch: "linear-gradient(160deg,#c05c2a,#5a2010)" },
];

const regions = [
  { name: "Maramureș", x: 32, y: 22 },
  { name: "Bucovina", x: 55, y: 20 },
  { name: "Transilvania", x: 38, y: 40 },
  { name: "Moldova", x: 68, y: 38 },
  { name: "Muntenia", x: 50, y: 62 },
  { name: "Dobrogea", x: 78, y: 60 },
  { name: "Banat", x: 18, y: 52 },
];

function Index() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [cart, setCart] = useState<string[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedWeights, setSelectedWeights] = useState<Record<string, string>>({});

  const addToCart = (id: string) => setCart((c) => [...c, id]);
  const toggleSave = (id: string) =>
    setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO — vertical, full viewport height */}
      <section className="relative min-h-screen w-full overflow-hidden">
        {/* Map background */}
        <MapBackground />

        {/* Warm overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream/40 via-cream/10 to-cream/95 pointer-events-none" />

        {/* Header */}
        <header className="relative z-20 flex items-center justify-between px-5 pt-5 sm:px-8">
          <a href="/" className="font-serif text-2xl font-semibold tracking-tight text-forest">
            nume site<span className="text-terracotta">.</span>
          </a>
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
        </header>

        {/* Hero content */}
        <div className="relative z-10 flex flex-col gap-6 px-5 pt-8 sm:px-8">
          {/* Video thumbnail — top left */}
          <button
            onClick={() => setVideoOpen(true)}
            className="group relative w-[62%] max-w-[280px] overflow-hidden rounded-2xl shadow-lg ring-1 ring-forest/10 transition-transform hover:scale-[1.02] animate-fade-up"
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
              <span className="grid h-11 w-11 place-items-center rounded-full bg-cream/95 shadow-md transition-transform group-hover:scale-110">
                <Play className="h-4 w-4 fill-forest text-forest" />
              </span>
            </div>
            <span className="absolute bottom-2 left-3 font-serif text-[11px] font-medium text-cream/95">
              Povestea noastră · 4:32
            </span>
          </button>

          {/* Headline */}
          <div className="max-w-md animate-fade-up" style={{ animationDelay: "80ms" }}>
            <h1 className="font-serif text-[2rem] font-medium text-forest sm:text-5xl">
            </h1>
            <p className="mt-3 max-w-sm text-sm text-forest-soft sm:text-base">
              {"\n"}
            </p>
          </div>

        {/* Product grid — 2x3, still inside hero */}
        <div className="animate-fade-up pb-10" style={{ animationDelay: "240ms" }}>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-xl font-medium text-forest">
                {"\n"}
              </h2>
              {/* Search — compact, above the products grid next to the count */}
              <div className="flex items-center gap-1 rounded-full bg-card/95 px-2 py-1.5 shadow-md ring-1 ring-forest/10 backdrop-blur">
                <Search className="h-3 w-3 shrink-0 text-forest-soft" />
                <input
                  type="text"
                  placeholder="Caută"
                  className="w-10 bg-transparent text-[10px] text-forest placeholder:text-forest-soft/70 focus:outline-none sm:w-14"
                />
              </div>
            </div>
            <span className="text-[11px] uppercase tracking-widest text-forest-soft">
              {products.length} produse
            </span>
          </div>
          <div className="flex flex-row gap-3">
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {products.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    selectedWeight={selectedWeights[p.id] ?? p.weights[0]}
                    onSelectWeight={(w) =>
                      setSelectedWeights((s) => ({ ...s, [p.id]: w }))
                    }
                    isSaved={saved.includes(p.id)}
                    onSave={() => toggleSave(p.id)}
                    onAdd={() => addToCart(p.id)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="mt-5 flex justify-center">
            <button className="rounded-full border border-forest/20 bg-cream px-6 py-3 text-sm font-medium text-forest transition-all hover:border-forest/40 hover:shadow-md">
              Vezi toate produsele →
            </button>
          </div>
        </div>
        </div>
      </section>

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
                    const p = products.find((x) => x.id === id)!;
                    return (
                      <li
                        key={i}
                        className="flex items-center gap-3 rounded-2xl border border-forest/10 bg-card p-3"
                      >
                        <div
                          className="h-12 w-12 shrink-0 rounded-xl"
                          style={{ background: p.swatch }}
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
                  Comandă · {cart.reduce((s, id) => s + (products.find((p) => p.id === id)?.price ?? 0), 0)} lei
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
  selectedWeight,
  onSelectWeight,
  isSaved,
  onSave,
  onAdd,
}: {
  product: Product;
  selectedWeight: string;
  onSelectWeight: (w: string) => void;
  isSaved: boolean;
  onSave: () => void;
  onAdd: () => void;
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-forest/10 bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden" style={{ background: product.swatch }}>
        <button
          onClick={onSave}
          aria-label="Salvează"
          className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-cream/90 text-forest backdrop-blur transition-transform hover:scale-110"
        >
          <Heart className={`h-3.5 w-3.5 ${isSaved ? "fill-terracotta text-terracotta" : ""}`} />
        </button>
        <span className="absolute bottom-2 left-2 rounded-full bg-cream/90 px-2 py-0.5 text-[10px] font-medium text-forest backdrop-blur">
          {product.region}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="font-serif text-[15px] leading-tight text-forest">{product.name}</h3>
        <div className="flex flex-wrap gap-1">
          {product.weights.map((w) => (
            <button
              key={w}
              onClick={() => onSelectWeight(w)}
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors ${
                selectedWeight === w
                  ? "bg-forest text-cream"
                  : "bg-forest/5 text-forest-soft hover:bg-forest/10"
              }`}
            >
              {w}
            </button>
          ))}
        </div>
        <div className="mt-1 flex items-baseline justify-between">
          <span className="font-serif text-lg font-medium text-forest">{product.price} <span className="text-xs text-forest-soft">lei</span></span>
        </div>
        <div className="mt-1 flex items-center gap-1.5">
          <button
            onClick={onAdd}
            className="flex flex-1 items-center justify-center gap-1 rounded-full bg-honey py-2 text-[11px] font-semibold text-forest shadow-sm transition-transform hover:scale-[1.02]"
          >
            <Plus className="h-3 w-3" /> În coș
          </button>
          <button className="rounded-full border border-forest/15 px-2.5 py-2 text-[11px] font-medium text-forest transition-colors hover:bg-forest/5">
            Detalii
          </button>
        </div>
      </div>
    </article>
  );
}

function MapBackground() {
  return (
    <div className="absolute inset-0">
      {/* Background wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-honey-soft/40 via-cream to-cream" />

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full opacity-70"
        aria-hidden="true"
      >
        {/* Stylized Romania outline — abstract line-art */}
        <path
          d="M18,40 L14,52 L20,62 L26,70 L38,78 L52,80 L64,76 L74,72 L82,66 L86,58 L82,50 L78,42 L82,34 L78,26 L70,20 L58,18 L46,20 L36,22 L28,28 Z"
          fill="none"
          stroke="var(--forest)"
          strokeWidth="0.4"
          strokeLinejoin="round"
          opacity="0.35"
        />
        <path
          d="M18,40 L14,52 L20,62 L26,70 L38,78 L52,80 L64,76 L74,72 L82,66 L86,58 L82,50 L78,42 L82,34 L78,26 L70,20 L58,18 L46,20 L36,22 L28,28 Z"
          fill="var(--forest)"
          opacity="0.05"
        />
        {/* Carpathian arc — inner curve */}
        <path
          d="M32,32 Q48,44 60,38 T78,44"
          fill="none"
          stroke="var(--honey)"
          strokeWidth="0.3"
          strokeDasharray="1 1.5"
          opacity="0.6"
        />
        {/* Region pins */}
        {regions.map((r, i) => (
          <g
            key={r.name}
            className="animate-pin"
            style={{ animationDelay: `${i * 0.35}s`, transformBox: "fill-box" }}
          >
            <circle cx={r.x} cy={r.y} r="1.6" fill="var(--terracotta)" opacity="0.35" />
            <circle cx={r.x} cy={r.y} r="0.7" fill="var(--terracotta)" />
          </g>
        ))}
      </svg>

      {/* Region labels — HTML for crisp typography */}
      <div className="absolute inset-0 pointer-events-none">
        {regions.map((r) => (
          <span
            key={r.name}
            className="absolute -translate-x-1/2 translate-y-2 whitespace-nowrap font-serif text-[9px] tracking-wide text-forest/50 sm:text-[10px]"
            style={{ left: `${r.x}%`, top: `${r.y}%` }}
          >
            <MapPin className="mr-0.5 inline h-2 w-2 text-terracotta" />
            {r.name}
          </span>
        ))}
      </div>
    </div>
  );
}
