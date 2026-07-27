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
import romaniaHeroMap from "@/assets/romania-hero-map.webp.asset.json";

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

        {/* Products — positioned over the Bulgaria area, full width edge-to-edge */}
        <div className="absolute inset-x-0 bottom-0 z-10 px-1 pb-3">
          <div className="mb-3 flex items-center justify-end px-2">
            <div className="flex items-center gap-1 rounded-full bg-card/90 px-2 py-1.5 shadow-md ring-1 ring-forest/10 backdrop-blur">
              <Search className="h-3 w-3 shrink-0 text-forest-soft" />
              <input
                type="text"
                placeholder="Caută"
                className="w-10 bg-transparent text-[10px] text-forest placeholder:text-forest-soft/70 focus:outline-none sm:w-14"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-[2px]">
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
    <article className="group flex flex-col overflow-hidden rounded-lg border border-forest/10 bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden" style={{ background: product.swatch }}>
        <button
          onClick={onSave}
          aria-label="Salvează"
          className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-cream/90 text-forest backdrop-blur transition-transform hover:scale-110"
        >
          <Heart className={`h-2.5 w-2.5 ${isSaved ? "fill-terracotta text-terracotta" : ""}`} />
        </button>
        <span className="absolute bottom-1 left-1 rounded-full bg-cream/90 px-1 py-0.5 text-[8px] font-medium text-forest backdrop-blur">
          {product.region}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-0.5 p-1.5">
        <h3 className="font-serif text-[11px] leading-tight text-forest">{product.name}</h3>
        <div className="flex flex-wrap gap-0.5">
          {product.weights.slice(0, 2).map((w) => (
            <button
              key={w}
              onClick={() => onSelectWeight(w)}
              className={`rounded-full px-1 py-0 text-[8px] font-medium transition-colors ${
                selectedWeight === w
                  ? "bg-forest text-cream"
                  : "bg-forest/5 text-forest-soft hover:bg-forest/10"
              }`}
            >
              {w}
            </button>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between pt-0.5">
          <span className="font-serif text-sm font-medium text-forest leading-none">{product.price} <span className="text-[8px] text-forest-soft">lei</span></span>
          <button
            onClick={onAdd}
            className="grid h-5 w-5 place-items-center rounded-full bg-honey text-forest shadow-sm transition-transform hover:scale-110"
          >
            <Plus className="h-2.5 w-2.5" />
          </button>
        </div>
      </div>
    </article>
  );
}

function MapBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={romaniaHeroMap.url}
        alt="Hartă România"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
    </div>
  );
}

