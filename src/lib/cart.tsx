import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = { id: string; qty: number };

type CartContextValue = {
  cart: CartItem[];
  cartOpen: boolean;
  cartCount: number;
  setCartOpen: (open: boolean) => void;
  addToCart: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = useCallback((id: string, qty = 1) => {
    const n = Math.max(1, qty);
    setCart((c) => {
      const existing = c.find((x) => x.id === id);
      if (existing) return c.map((x) => (x.id === id ? { ...x, qty: x.qty + n } : x));
      return [...c, { id, qty: n }];
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setCart((c) =>
      qty <= 0 ? c.filter((x) => x.id !== id) : c.map((x) => (x.id === id ? { ...x, qty } : x)),
    );
  }, []);

  const cartCount = useMemo(() => cart.reduce((s, item) => s + item.qty, 0), [cart]);

  const value = useMemo(
    () => ({ cart, cartOpen, cartCount, setCartOpen, addToCart, setQty }),
    [cart, cartOpen, cartCount, addToCart, setQty],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
