import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { getProduct, relatedProducts } from "@/lib/products";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { Heart, MapPin, Plus, Minus, ShoppingBag, Play } from "lucide-react";

export const Route = createFileRoute("/produs/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product, related: relatedProducts(params.id, 4) };
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
  const [weight, setWeight] = useState(product.weights[0]);
  const [qty, setQty] = useState(1);

  return (
    <div className="min-h-screen bg-cream text-forest">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <nav className="mb-6 text-xs uppercase tracking-wider text-forest-soft">
          <Link to="/" className="hover:text-terracotta">Acasă</Link>
          <span className="mx-2">/</span>
          <Link to="/categorie/$slug" params={{ slug: product.category }} className="hover:text-terracotta">{product.category}</Link>
          <span className="mx-2">/</span>
          <span className="text-forest">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-forest shadow-md">
            <img src={product.image} alt={product.name} width={1024} height={1024} className="absolute inset-0 h-full w-full object-cover opacity-35" />
            <div className="absolute inset-0 bg-forest/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-cream/95 shadow-lg">
                <Play className="h-6 w-6 fill-forest text-forest" />
              </span>
              <p className="font-serif text-cream/90">Video placeholder — {product.name}</p>
              <p className="text-xs uppercase tracking-widest text-cream/60">1:00 min</p>
            </div>
            <div className="absolute inset-x-4 bottom-4">
              <div className="h-1 w-full rounded-full bg-cream/25">
                <div className="h-1 w-0 rounded-full bg-honey" />
              </div>
              <div className="mt-1.5 flex justify-between text-[10px] text-cream/70">
                <span>0:00</span>
                <span>1:00</span>
              </div>
            </div>
          </div>


          <div>
            <p className="flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-terracotta">
              <MapPin className="h-3 w-3" /> {product.region}
            </p>
            <h1 className="mt-3 font-serif text-4xl md:text-5xl">{product.name}</h1>
            <p className="mt-2 text-sm text-forest-soft">Vândut de <span className="font-medium text-forest">{product.producer}</span></p>

            <p className="mt-6 text-lg leading-relaxed text-forest-soft">{product.description}</p>

            <div className="mt-8">
              <p className="text-xs uppercase tracking-wider text-forest-soft">Gramaj</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.weights.map((w: string) => (
                  <button
                    key={w}
                    onClick={() => setWeight(w)}
                    className={`rounded-full border px-4 py-2 text-sm transition-all ${
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

            <div className="mt-8 flex items-end justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-forest-soft">Preț</p>
                <p className="font-serif text-4xl text-forest">{product.price * qty} lei</p>
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

            <div className="mt-6 flex gap-3">
              <button className="flex flex-1 items-center justify-center gap-2 rounded-full bg-honey py-4 font-medium text-forest shadow-md transition-transform hover:scale-[1.01]">
                <ShoppingBag className="h-4 w-4" /> Adaugă în coș
              </button>
              <button className="grid h-14 w-14 place-items-center rounded-full border border-forest/20 bg-card text-forest transition-colors hover:bg-forest/5" aria-label="Salvează">
                <Heart className="h-5 w-5" />
              </button>
            </div>

            <ul className="mt-8 space-y-2 border-t border-forest/10 pt-6 text-sm text-forest-soft">
              <li>✦ Livrare în 2-4 zile lucrătoare</li>
              <li>✦ Ambalaj reciclabil, fără plastic</li>
              <li>✦ Retur gratuit în 14 zile</li>
            </ul>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-24">
            <div className="flex items-baseline justify-between">
              <h2 className="font-serif text-3xl md:text-4xl">S-ar potrivi și</h2>
              <Link to="/categorie/$slug" params={{ slug: product.category }} className="text-sm text-terracotta hover:underline">
                Vezi toate →
              </Link>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p: import("@/lib/products").Product) => (
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
                    <p className="text-[10px] uppercase tracking-wider text-forest-soft">{p.region}</p>
                    <h3 className="mt-1 font-serif text-lg text-forest">{p.name}</h3>
                    <p className="mt-2 text-sm font-medium text-forest">{p.price} lei</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
