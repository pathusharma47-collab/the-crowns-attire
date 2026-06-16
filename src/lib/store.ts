import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  mrp: number;
  size: string;
  color: string;
  qty: number;
};

type ShopState = {
  cart: CartItem[];
  wishlist: string[];
  cartOpen: boolean;
  addToCart: (item: Omit<CartItem, "id" | "qty"> & { qty?: number }) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  toggleWishlist: (productId: string) => void;
  setCartOpen: (open: boolean) => void;
  clearCart: () => void;
};

export const useShop = create<ShopState>()(
  persist(
    (set) => ({
      cart: [],
      wishlist: [],
      cartOpen: false,
      addToCart: (item) =>
        set((s) => {
          const id = `${item.productId}-${item.size}-${item.color}`;
          const existing = s.cart.find((c) => c.id === id);
          if (existing) {
            return {
              cart: s.cart.map((c) =>
                c.id === id ? { ...c, qty: c.qty + (item.qty ?? 1) } : c,
              ),
              cartOpen: true,
            };
          }
          return {
            cart: [...s.cart, { ...item, id, qty: item.qty ?? 1 }],
            cartOpen: true,
          };
        }),
      removeFromCart: (id) => set((s) => ({ cart: s.cart.filter((c) => c.id !== id) })),
      updateQty: (id, qty) =>
        set((s) => ({
          cart: s.cart
            .map((c) => (c.id === id ? { ...c, qty } : c))
            .filter((c) => c.qty > 0),
        })),
      toggleWishlist: (productId) =>
        set((s) => ({
          wishlist: s.wishlist.includes(productId)
            ? s.wishlist.filter((id) => id !== productId)
            : [...s.wishlist, productId],
        })),
      setCartOpen: (open) => set({ cartOpen: open }),
      clearCart: () => set({ cart: [] }),
    }),
    { name: "tca-shop" },
  ),
);

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
