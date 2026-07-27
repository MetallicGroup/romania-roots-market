import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { categories, getByCategory } from "@/lib/products";
import { SiteHeader, SiteFooter } from "@/components/site-header";

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
  return (
    <div className="min-h-screen bg-cream text-forest">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <Link to="/categorii" className="text-xs uppercase tracking-wider text-forest-soft hover:text-terracotta">← Toate categoriile</Link>
        <h1 className="mt-2 font-serif text-4xl md:text-5xl">{category.name}</h1>
        <p className="mt-2 max-w-xl text-forest-soft">{category.description}</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p: import("@/lib/products").Product) => (
            <Link
              key={p.id}
              to="/produs/$id"
              params={{ id: p.id }}
              className="group overflow-hidden rounded-2xl border border-forest/10 bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="aspect-square" style={{ background: p.swatch }} />
              <div className="p-4">
                <p className="text-[10px] uppercase tracking-wider text-forest-soft">{p.region}</p>
                <h3 className="mt-1 font-serif text-lg text-forest">{p.name}</h3>
                <p className="mt-2 text-sm font-medium text-forest">{p.price} lei</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
