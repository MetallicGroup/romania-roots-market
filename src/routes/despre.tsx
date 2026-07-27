import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-header";

export const Route = createFileRoute("/despre")({
  head: () => ({
    meta: [
      { title: "Despre noi — nume site" },
      { name: "description", content: "Suntem o punte între producătorii mici din satele României și cei care caută gustul adevărat." },
      { property: "og:title", content: "Despre noi — nume site" },
      { property: "og:description", content: "O punte între producătorii mici din sate și oamenii care caută gustul adevărat." },
    ],
  }),
  component: DesprePage,
});

function DesprePage() {
  return (
    <div className="min-h-screen bg-cream text-forest">
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-3xl px-4 pt-20 pb-12 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-terracotta">Povestea noastră</p>
          <h1 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">
            Un borcan de miere, o poveste din sat.
          </h1>
          <p className="mt-6 text-lg text-forest-soft">
            Am pornit dintr-o curte din Bucovina, cu bunica scoțând dulceața din cămară.
            Astăzi suntem o punte între producătorii mici din toate colțurile României și
            oamenii care caută, ca noi, gustul adevărat.
          </p>
        </section>

        <section className="mx-auto grid max-w-5xl gap-6 px-4 py-16 md:grid-cols-3">
          {[
            { t: "Direct de la producător", d: "Fără intermediari. Fiecare borcan vine din mâinile omului care l-a făcut." },
            { t: "Ingrediente curate", d: "Fără conservanți, fără coloranți, fără scurtături. Doar rețete de familie." },
            { t: "Preț corect", d: "Producătorii primesc un preț cinstit pentru muncă și tradiție." },
          ].map((v) => (
            <div key={v.t} className="rounded-2xl border border-forest/10 bg-card p-6 shadow-sm">
              <h3 className="font-serif text-xl text-forest">{v.t}</h3>
              <p className="mt-2 text-sm text-forest-soft">{v.d}</p>
            </div>
          ))}
        </section>

        <section className="bg-forest py-20 text-cream">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="font-serif text-3xl md:text-4xl">Susținem 47 de producători</h2>
            <p className="mx-auto mt-4 max-w-xl text-cream/80">
              Din Maramureș până în Dobrogea, din Banat până în Bucovina — mici stupini, cămări
              de familie, stâne de munte și mori de piatră.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6 text-center">
              <div>
                <p className="font-serif text-4xl text-honey">47</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-cream/60">Producători</p>
              </div>
              <div>
                <p className="font-serif text-4xl text-honey">18</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-cream/60">Județe</p>
              </div>
              <div>
                <p className="font-serif text-4xl text-honey">2019</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-cream/60">Din anul</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
