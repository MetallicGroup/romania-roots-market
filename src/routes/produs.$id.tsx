import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getProduct, relatedProducts } from "@/lib/products";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { useCart } from "@/lib/cart";
import { Heart, MapPin, Plus, Minus, ShoppingBag, Play, Share2 } from "lucide-react";

export const Route = createFileRoute("/produs/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product, related: relatedProducts(params.id, 12) };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p) return { meta: [{ title: "Produs — nume site" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${p.name} — ${p.producer} · nume site` },
        { name: "description", content: p.description },
        { property: "og:title", content: `${p.name} — ${p.region}` },
        { property: "og:description", content: p.description },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product, related } = Route.useLoaderData();
  const { addToCart, setCartOpen } = useCart();
  const [weight, setWeight] = useState(product.weights[0]);
  const [qty, setQty] = useState(1);
  const [saved, setSaved] = useState(false);
  const [showAllRelated, setShowAllRelated] = useState(false);

  useEffect(() => {
    setShowAllRelated(false);
    setWeight(product.weights[0]);
    setQty(1);
    setSaved(false);
  }, [product.id, product.weights]);

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, text: product.description, url });
      } else {
        await navigator.clipboard.writeText(url);
      }
    } catch {
      /* user cancelled */
    }
  };

  return (
    <div className="min-h-screen bg-cream text-forest">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-4 md:py-10">
        <nav className="mb-3 text-[10px] uppercase tracking-wider text-forest-soft md:mb-6 md:text-xs">
          <Link to="/" className="hover:text-terracotta">Acasă</Link>
          <span className="mx-2">/</span>
          <Link to="/categorie/$slug" params={{ slug: product.category }} className="hover:text-terracotta">{product.category}</Link>
          <span className="mx-2">/</span>
          <span className="text-forest">{product.name}</span>
        </nav>

        <div className="grid gap-5 lg:grid-cols-2 lg:gap-10">
          {/* Clip — compact pe mobil ca să încapă prețul + coșul pe primul ecran */}
          <div className="relative aspect-[16/10] max-h-[32vh] w-full overflow-hidden rounded-2xl bg-forest shadow-md md:max-h-none md:aspect-[4/3] md:rounded-3xl lg:aspect-square">
            <img src={product.image} alt={product.name} width={1024} height={1024} className="absolute inset-0 h-full w-full object-cover opacity-35" />
            <div className="absolute inset-0 bg-forest/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 md:gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-cream/95 shadow-lg md:h-16 md:w-16">
                <Play className="h-4 w-4 fill-forest text-forest md:h-6 md:w-6" />
              </span>
              <p className="font-serif text-sm text-cream/90 md:text-base">Video — {product.name}</p>
              <p className="text-[10px] uppercase tracking-widest text-cream/60 md:text-xs">1:00 min</p>
            </div>
            <div className="absolute inset-x-3 bottom-2.5 md:inset-x-4 md:bottom-4">
              <div className="h-1 w-full rounded-full bg-cream/25">
                <div className="h-1 w-0 rounded-full bg-honey" />
              </div>
              <div className="mt-1 flex justify-between text-[10px] text-cream/70">
                <span>0:00</span>
                <span>1:00</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between gap-2">
              <p className="flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-terracotta md:text-xs">
                <MapPin className="h-3 w-3" /> {product.region}
              </p>
              <div className="flex shrink-0 items-center gap-0.5">
                <button
                  type="button"
                  onClick={() => setSaved((s) => !s)}
                  aria-label="Salvează la favorite"
                  className="grid h-7 w-7 place-items-center rounded-full text-forest transition-colors hover:bg-forest/5"
                >
                  <Heart className={`h-3.5 w-3.5 ${saved ? "fill-terracotta text-terracotta" : ""}`} />
                </button>
                <button
                  type="button"
                  onClick={share}
                  aria-label="Distribuie"
                  className="grid h-7 w-7 place-items-center rounded-full text-forest transition-colors hover:bg-forest/5"
                >
                  <Share2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            <h1 className="mt-1.5 font-serif text-2xl leading-tight md:mt-3 md:text-4xl lg:text-5xl">{product.name}</h1>
            <p className="mt-1 text-xs text-forest-soft md:mt-2 md:text-sm">
              Produs de <span className="font-medium text-forest">{product.producer}</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-forest-soft md:mt-4 md:text-base lg:text-lg">
              {product.description}
            </p>

            <div className="mt-4 md:mt-8">
              <p className="text-[10px] uppercase tracking-wider text-forest-soft md:text-xs">Gramaj</p>
              <div className="mt-1.5 flex flex-wrap gap-2 md:mt-2">
                {product.weights.map((w: string) => (
                  <button
                    key={w}
                    onClick={() => setWeight(w)}
                    className={`rounded-full border px-3.5 py-1.5 text-sm transition-all md:px-4 md:py-2 ${
                      weight === w
                        ? "border-forest bg-forest text-cream"
                        : "border-forest/20 bg-card text-forest hover:border-forest/50"
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-end justify-between gap-4 md:mt-8 md:gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-forest-soft md:text-xs">Preț</p>
                <p className="font-serif text-3xl text-forest md:text-4xl">{product.price * qty} lei</p>
              </div>
              <div className="flex items-center gap-1 rounded-full border border-forest/20 bg-card p-1">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="grid h-9 w-9 place-items-center rounded-full hover:bg-forest/5" aria-label="Scade">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-6 text-center text-sm font-medium">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-forest/5" aria-label="Crește">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-4 md:mt-6">
              <button
                type="button"
                onClick={() => {
                  addToCart(product.id, qty);
                  setCartOpen(true);
                }}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-honey py-3.5 font-medium text-forest shadow-md transition-transform hover:scale-[1.01] md:py-4"
              >
                <ShoppingBag className="h-4 w-4" /> Adaugă în coș
              </button>
            </div>

            <ul className="mt-5 space-y-2 border-t border-forest/10 pt-4 text-sm text-forest-soft md:mt-8 md:pt-6">
              <li>✦ Livrare în 2-4 zile lucrătoare</li>
              <li>✦ Ambalaj reciclabil, fără plastic</li>
              <li>✦ Retur gratuit în 14 zile</li>
            </ul>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16 md:mt-24">
            <div className="flex items-baseline justify-between">
              <h2 className="font-serif text-3xl md:text-4xl">S-ar potrivi și</h2>
              <Link to="/categorie/$slug" params={{ slug: product.category }} className="text-sm text-terracotta hover:underline">
                Vezi toate →
              </Link>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {(showAllRelated ? related : related.slice(0, 4)).map((p: import("@/lib/products").Product) => (
                <Link
                  key={p.id}
                  to="/produs/$id"
                  params={{ id: p.id }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-forest/10 bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative aspect-square overflow-hidden bg-cream">
                    <img src={p.image} alt={p.name} loading="lazy" width={512} height={512} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                    <span className="absolute bottom-2 left-2 rounded-full bg-cream/95 px-2.5 py-1 text-[10px] font-semibold text-forest shadow-sm backdrop-blur">
                      {p.region}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-4">
                    <h3 className="font-serif text-lg text-forest">{p.name}</h3>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-forest">{p.weights[0]} · {p.price} lei</p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addToCart(p.id);
                        }}
                        aria-label="Adaugă în coș"
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-honey text-forest shadow-sm transition-transform hover:scale-110"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {!showAllRelated && related.length > 4 && (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAllRelated(true)}
                  className="rounded-full border border-forest/20 bg-card px-6 py-2.5 text-sm font-medium text-forest shadow-sm transition-all hover:border-forest/40 hover:shadow-md"
                >
                  Vezi mai multe
                </button>
              </div>
            )}
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
