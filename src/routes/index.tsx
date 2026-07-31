import { createFileRoute, Link } from "@tanstack/react-router";
import { products as catalog } from "@/lib/products";
import { SiteFooter } from "@/components/site-header";
import { useCart } from "@/lib/cart";
import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Menu,
  User,
  Heart,
  ShoppingBag,
  Play,
  X,
  Plus,
  ChevronRight,
  LayoutGrid,
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

type Product = (typeof catalog)[number];

const DEPARTMENTS = [
  { name: "Produse alimentare", image: catAlimentare },
  { name: "Băuturi", image: catBauturi },
  { name: "Casă și grădină", image: catCasa },
  { name: "Cosmetice", image: catCosmetice },
  { name: "Îmbrăcăminte", image: catImbracaminte },
] as const;

function Index() {
  const { cartCount, setCartOpen, addToCart } = useCart();
  const [videoOpen, setVideoOpen] = useState(false);
  const [saved, setSaved] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  // Lock hero height once — pe mobil dvh se schimbă la scroll (bara browserului) și „mişcă” harta.
  const [heroH, setHeroH] = useState<number | null>(null);

  useEffect(() => {
    const lock = () => setHeroH(window.innerHeight);
    lock();
    const onOrient = () => lock();
    window.addEventListener("orientationchange", onOrient);
    return () => window.removeEventListener("orientationchange", onOrient);
  }, []);

  const q = query.trim().toLowerCase();
  const filtered: Product[] = q
    ? catalog.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.region.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.producer.toLowerCase().includes(q),
      )
    : catalog;

  const { row1, row2 } = useMemo(() => {
    const a: Product[] = [];
    const b: Product[] = [];
    filtered.forEach((p, i) => (i % 2 === 0 ? a : b).push(p));
    return { row1: a, row2: b };
  }, [filtered]);

  const toggleSave = (id: string) =>
    setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO — înălțime blocată; produsele peste hartă (conturul rămâne vizibil) */}
      <section
        className="relative w-full overflow-hidden bg-forest"
        style={{ height: heroH ? `${heroH}px` : "100svh" }}
      >
        <MapBackground />

        <button
          onClick={() => setVideoOpen(true)}
          className="absolute left-1 top-1 z-20 w-[140px] overflow-hidden rounded-xl shadow-lg ring-1 ring-forest/10 transition-transform hover:scale-[1.02] animate-fade-up sm:w-[180px]"
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

        <header className="relative z-20 flex items-start justify-end px-1 pt-1 sm:px-2">
          <div className="flex flex-col items-end gap-1">
            <nav className="flex items-center gap-1.5">
              <IconBtn label="Categorii">
                <Menu className="h-[18px] w-[18px]" />
              </IconBtn>
              <IconBtn label="Cont">
                <User className="h-[18px] w-[18px]" />
              </IconBtn>
              <IconBtn label="Salvate" badge={saved.length}>
                <Heart className="h-[18px] w-[18px]" />
              </IconBtn>
              <IconBtn label="Coș" badge={cartCount} onClick={() => setCartOpen(true)}>
                <ShoppingBag className="h-[18px] w-[18px]" />
              </IconBtn>
            </nav>
            <a href="/" className="font-serif text-xl font-semibold tracking-tight text-forest">
              nume site<span className="text-terracotta">.</span>
            </a>
          </div>
        </header>

        <div className="absolute inset-x-0 bottom-0 z-10 px-1 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          <div className="mx-auto max-w-3xl">
            <div className="mb-[2px] flex items-center justify-between gap-2">
              <div className="min-w-0 basis-1/3 drop-shadow-sm">
                <p className="text-xs font-bold leading-tight text-cream">Livrare gratuită</p>
                <p className="text-[10px] font-semibold leading-tight text-cream/90">
                  la comenzi de peste 500 lei
                </p>
              </div>
              <div className="flex min-w-0 basis-2/3 items-center gap-1 rounded-full bg-card/90 px-2 py-1.5 shadow-md ring-1 ring-forest/10 backdrop-blur">
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

            {filtered.length === 0 ? (
              <p className="mt-1 rounded-xl bg-card/90 px-3 py-2 text-center text-[11px] text-forest-soft backdrop-blur">
                Niciun produs pentru „{query}”.
              </p>
            ) : (
              <div className="flex flex-col gap-[2px]">
                <ProductRow
                  products={row1}
                  saved={saved}
                  onSave={toggleSave}
                  onAdd={addToCart}
                />
                <ProductRow
                  products={row2}
                  saved={saved}
                  onSave={toggleSave}
                  onAdd={addToCart}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Categorii — slider departamente + stats */}
      <section className="bg-cream py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between px-4">
            <div>
              <h2 className="font-serif text-3xl text-forest md:text-4xl">Categorii</h2>
              <p className="mt-2 text-sm text-forest-soft">
                Glisează pentru a explora magazinul.
              </p>
            </div>
            <Link to="/categorii" className="text-sm text-terracotta hover:underline">
              Vezi toate →
            </Link>
          </div>

          <div
            className="mt-8 flex gap-2.5 overflow-x-auto px-4 pb-2 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
          >
            {DEPARTMENTS.map((d) => (
              <button
                key={d.name}
                type="button"
                className="relative aspect-[3/4] w-[calc((100%-30px)/3.25)] shrink-0 snap-start overflow-hidden rounded-xl border border-forest/10 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <img
                  src={d.image}
                  alt={d.name}
                  loading="lazy"
                  width={400}
                  height={533}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest/85 to-transparent px-2.5 pb-2.5 pt-8 font-serif text-[13px] leading-snug text-cream">
                  {d.name}
                </span>
              </button>
            ))}
            <Link
              to="/categorii"
              className="relative flex aspect-[3/4] w-[calc((100%-30px)/3.25)] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-xl border border-forest/10 bg-forest p-3 text-left text-cream shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-cream/15">
                <LayoutGrid className="h-4 w-4" />
              </span>
              <span className="inline-flex items-center gap-0.5 font-serif text-[13px] leading-snug">
                Vezi toate <ChevronRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3 px-4">
            <div className="rounded-2xl border border-forest/10 bg-card px-3 py-5 text-center shadow-sm">
              <p className="font-serif text-2xl text-forest md:text-3xl">200+</p>
              <p className="mt-1 text-[11px] uppercase tracking-wider text-forest-soft">Producători</p>
            </div>
            <div className="rounded-2xl border border-forest/10 bg-card px-3 py-5 text-center shadow-sm">
              <p className="font-serif text-2xl text-forest md:text-3xl">2000+</p>
              <p className="mt-1 text-[11px] uppercase tracking-wider text-forest-soft">Produse</p>
            </div>
            <div className="rounded-2xl border border-forest/10 bg-card px-3 py-5 text-center shadow-sm">
              <p className="font-serif text-lg text-forest md:text-xl">Livrare</p>
              <p className="mt-1 text-[11px] uppercase tracking-wider text-forest-soft">În toată țara</p>
            </div>
          </div>
        </div>
      </section>

      {/* Produse populare */}
      <section className="bg-cream px-4 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-serif text-3xl text-forest md:text-4xl">Produse populare</h2>
              <p className="mt-2 text-sm text-forest-soft">Alese cu grijă de la producători români.</p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {catalog.slice(0, 8).map((p) => (
              <Link
                key={p.id}
                to="/produs/$id"
                params={{ id: p.id }}
                className="group flex flex-col overflow-hidden rounded-xl border border-forest/10 bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg sm:rounded-2xl"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-cream sm:aspect-square">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={512}
                    height={512}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <span className="absolute bottom-2 left-2 rounded-full bg-cream/95 px-2.5 py-1 text-[10px] font-semibold text-forest shadow-sm backdrop-blur sm:text-xs">
                    {p.region}
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-4">
                  <div>
                    <h3 className="font-serif text-[15px] leading-snug text-forest sm:text-lg">{p.name}</h3>
                    <p className="mt-1 text-xs text-forest-soft">Produs de {p.producer}</p>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-forest">
                      {p.weights[0]} · {p.price} lei
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart(p.id);
                      }}
                      aria-label="Adaugă în coș"
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-honey text-forest shadow-sm transition-transform hover:scale-110"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Despre */}
      <section className="bg-forest px-4 py-20 text-cream">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm uppercase tracking-widest text-honey">Despre noi</p>
          <h2 className="mt-3 max-w-xl font-serif text-3xl md:text-4xl">Gustul satului, adus la tine acasă.</h2>
          <p className="mt-4 max-w-xl text-cream/80">
            Lucrăm direct cu familii de producători din toată România. Miere culesă în livezi,
            dulcețuri fierte la ceaun, brânzeturi din stânele muntelui — totul cu poveste și cu
            nume.
          </p>
          <Link
            to="/despre"
            className="mt-6 inline-block rounded-full bg-honey px-6 py-3 font-medium text-forest transition-transform hover:scale-[1.02]"
          >
            Povestea noastră
          </Link>
        </div>
      </section>

      <SiteFooter />

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
    </div>
  );
}

function ProductRow({
  products,
  saved,
  onSave,
  onAdd,
}: {
  products: Product[];
  saved: string[];
  onSave: (id: string) => void;
  onAdd: (id: string) => void;
}) {
  if (products.length === 0) return null;
  return (
    <div
      className="flex gap-[2px] overflow-x-auto snap-x snap-mandatory"
      style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
    >
      {products.map((p) => (
        <div key={p.id} className="w-[calc((100%-4px)/3.15)] shrink-0 snap-start">
          <ProductCard
            product={p}
            isSaved={saved.includes(p.id)}
            onSave={() => onSave(p.id)}
            onAdd={() => onAdd(p.id)}
          />
        </div>
      ))}
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
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={256}
          height={256}
          className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onSave();
          }}
          aria-label="Salvează"
          className="absolute right-1 top-1 grid h-4 w-4 place-items-center rounded-full bg-cream/90 text-forest backdrop-blur transition-transform hover:scale-110"
        >
          <Heart className={`h-2 w-2 ${isSaved ? "fill-terracotta text-terracotta" : ""}`} />
        </button>
        <span className="absolute bottom-1 left-1 rounded-full bg-cream/95 px-1.5 py-0.5 text-[7px] font-semibold text-forest shadow-sm backdrop-blur">
          {product.region}
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-between p-1">
        <h3 className="font-serif text-[10px] leading-tight text-forest">{product.name}</h3>
        <div className="flex items-center justify-between pt-0.5">
          <p className="text-[8px] text-forest-soft">
            {product.weights[0]} · {product.price} lei
          </p>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAdd();
            }}
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
  // Framing ca pe Pro Max (scale 1.32 + ușor dreapta/jos), pe tot ecranul hero.
  // Produsele sunt overlay — sudul României rămâne deasupra lor.
  return (
    <div className="absolute inset-0 overflow-hidden bg-forest">
      <img
        src={romaniaHeroMap}
        alt="Hartă România"
        className="pointer-events-none absolute inset-0 h-full w-full object-contain object-[center_22%] origin-center"
        style={{ transform: "scale(1.32) translate(1.2%, -2%)" }}
      />
    </div>
  );
}
