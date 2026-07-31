import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { categories, getByCategory } from "@/lib/products";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { useCart } from "@/lib/cart";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/categorie/$slug")({
  loader: ({ params }) => {
    const category = categories.find((c) => c.slug === params.slug);
    if (!category) throw notFound();
    return { category, items: getByCategory(params.slug) };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.category.name ?? "Categorie";
    return {
      meta: [
        { title: `${name} — nume site` },
        { name: "description", content: loaderData?.category.description ?? "Produse tradiționale românești." },
        { property: "og:title", content: `${name} — Produse tradiționale` },
        { property: "og:description", content: loaderData?.category.description ?? "" },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category, items } = Route.useLoaderData();
  const { addToCart } = useCart();
  return (
    <div className="min-h-screen bg-cream text-forest">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <Link to="/categorii" className="text-xs uppercase tracking-wider text-forest-soft hover:text-terracotta">← Toate categoriile</Link>
        <h1 className="mt-2 font-serif text-4xl md:text-5xl">{category.name}</h1>
        <p className="mt-2 max-w-xl text-forest-soft">{category.description}</p>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p: import("@/lib/products").Product) => (
            <Link
              key={p.id}
              to="/produs/$id"
              params={{ id: p.id }}
              className="group flex flex-col overflow-hidden rounded-xl border border-forest/10 bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg sm:rounded-2xl"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-cream sm:aspect-square">
                <img src={p.image} alt={p.name} loading="lazy" width={512} height={512} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
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
                  <p className="text-sm font-medium text-forest">{p.price} lei</p>
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
      </main>
      <SiteFooter />
    </div>
  );
}
