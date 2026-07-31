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
              {cart.map((item) => {
                const p = catalog.find((x) => x.id === item.id)!;
                return (
                  <li
                    key={item.id}
                    className="flex items-center gap-3 rounded-2xl border border-forest/10 bg-card p-3"
                  >
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
                      <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                      <span className="absolute bottom-0.5 left-0.5 rounded-full bg-cream/95 px-1 py-px text-[7px] font-medium text-forest">
                        {p.region}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-serif text-sm text-forest">{p.name}</p>
                      <p className="text-xs text-forest-soft">{p.price} lei · buc</p>
                      <div className="mt-1.5 flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setQty(item.id, item.qty - 1)}
                          className="grid h-6 w-6 place-items-center rounded-full border border-forest/15 hover:bg-forest/5"
                          aria-label="Scade"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="min-w-6 text-center text-xs font-medium text-forest">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty(item.id, item.qty + 1)}
                          className="grid h-6 w-6 place-items-center rounded-full border border-forest/15 hover:bg-forest/5"
                          aria-label="Crește"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <span className="shrink-0 font-medium text-forest">
                      {p.price * item.qty} lei
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        {cart.length > 0 && (
          <div className="border-t border-forest/10 p-5">
            <button className="w-full rounded-full bg-honey py-3 font-medium text-forest shadow-md transition-transform hover:scale-[1.01]">
              Comandă · {cartTotal} lei
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
