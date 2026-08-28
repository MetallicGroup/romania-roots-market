import { products as catalog } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { Minus, Plus, X } from "lucide-react";

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, setQty } = useCart();
  const cartTotal = cart.reduce(
    (s, item) => s + (catalog.find((p) => p.id === item.id)?.price ?? 0) * item.qty,
    0,
  );

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-50" onClick={() => setCartOpen(false)}>
      <div className="absolute inset-0 bg-forest/40 backdrop-blur-sm" />
      <aside
        className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-cream shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-forest/10 px-4 py-3">
          <h3 className="font-serif text-xl text-forest">Coșul tău</h3>
          <button
            onClick={() => setCartOpen(false)}
            className="grid h-8 w-8 place-items-center rounded-full text-forest hover:bg-forest/5"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-3">
          {cart.length === 0 ? (
            <p className="pt-8 text-center text-sm text-forest-soft">
              Coșul e gol. Adaugă bunătăți din grădina satului.
            </p>
          ) : (
            <ul className="space-y-1.5">
              {cart.map((item) => {
                const p = catalog.find((x) => x.id === item.id)!;
                return (
                  <li
                    key={item.id}
                    className="flex items-center gap-2 rounded-xl border border-forest/10 bg-card px-2 py-1.5"
                  >
                    <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg">
                      <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                      <span className="absolute bottom-0 left-0 rounded-tr-md bg-cream/95 px-0.5 text-[6px] font-medium leading-tight text-forest">
                        {p.region}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-serif text-sm leading-tight text-forest">{p.name}</p>
                      <div className="mt-0.5 flex items-center gap-1.5">
                        <p className="text-[11px] text-forest-soft">{p.price} lei</p>
                        <div className="flex items-center gap-0.5">
                          <button
                            type="button"
                            onClick={() => setQty(item.id, item.qty - 1)}
                            className="grid h-5 w-5 place-items-center rounded-full border border-forest/15 hover:bg-forest/5"
                            aria-label="Scade"
                          >
                            <Minus className="h-2.5 w-2.5" />
                          </button>
                          <span className="min-w-4 text-center text-[11px] font-medium text-forest">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQty(item.id, item.qty + 1)}
                            className="grid h-5 w-5 place-items-center rounded-full border border-forest/15 hover:bg-forest/5"
                            aria-label="Crește"
                          >
                            <Plus className="h-2.5 w-2.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <span className="shrink-0 text-sm font-medium text-forest">
                      {p.price * item.qty} lei
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        {cart.length > 0 && (
          <div className="border-t border-forest/10 p-4">
            <button className="w-full rounded-full bg-honey py-3 font-medium text-forest shadow-md transition-transform hover:scale-[1.01]">
              Comandă · {cartTotal} lei
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
