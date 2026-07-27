import { createFileRoute, Link } from "@tanstack/react-router";
import { categories, products } from "@/lib/products";
import { SiteHeader, SiteFooter } from "@/components/site-header";

export const Route = createFileRoute("/categorii")({
  head: () => ({
    meta: [
      { title: "Categorii — nume site" },
      { name: "description", content: "Explorează categoriile de produse tradiționale românești: miere, dulcețuri, murături, brânzeturi și mai mult." },
      { property: "og:title", content: "Categorii — Produse românești tradiționale" },
      { property: "og:description", content: "Miere, dulcețuri, murături, brânzeturi și cereale — direct de la producători mici." },
    ],
  }),
  component: CategoriiPage,
});

function CategoriiPage() {
  return (
    <div className="min-h-screen bg-cream text-forest">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="font-serif text-4xl text-forest md:text-5xl">Categorii</h1>
        <p className="mt-3 max-w-xl text-forest-soft">Alege din bunătățile satului, împărțite după tradiție.</p>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => {
            const items = products.filter((p) => p.category === c.slug);
            const sample = items[0];
            return (
              <Link
                key={c.slug}
                to="/categorie/$slug"
                params={{ slug: c.slug }}
                className="group overflow-hidden rounded-2xl border border-forest/10 bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="aspect-[4/3]" style={{ background: sample?.swatch ?? "linear-gradient(160deg,#eab24a,#a86b12)" }} />
                <div className="p-5">
                  <div className="flex items-baseline justify-between">
                    <h2 className="font-serif text-2xl text-forest">{c.name}</h2>
                    <span className="text-xs text-forest-soft">{items.length} produse</span>
                  </div>
                  <p className="mt-2 text-sm text-forest-soft">{c.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
