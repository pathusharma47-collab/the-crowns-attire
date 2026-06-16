import { Link } from "@tanstack/react-router";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useShop, formatINR } from "@/lib/store";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQty, removeFromCart } = useShop();
  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const mrpTotal = cart.reduce((s, c) => s + c.mrp * c.qty, 0);

  return (
    <>
      <div
        onClick={() => setCartOpen(false)}
        className={cn(
          "fixed inset-0 z-50 bg-royal/40 backdrop-blur-sm transition-opacity",
          cartOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <aside
        className={cn(
          "fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-500",
          cartOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <header className="flex items-center justify-between border-b border-royal/10 px-6 py-5">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.25em] text-gold uppercase">
              Your Bag
            </p>
            <h3 className="font-heading text-xl text-royal">
              {cart.length} {cart.length === 1 ? "item" : "items"}
            </h3>
          </div>
          <button onClick={() => setCartOpen(false)} aria-label="Close cart">
            <X className="h-5 w-5 text-royal" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="font-heading text-2xl text-royal">Your bag is empty</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Start exploring our latest edit.
              </p>
              <Link
                to="/shop"
                onClick={() => setCartOpen(false)}
                className="font-button mt-6 bg-royal px-8 py-3 text-[11px] tracking-widest text-cream uppercase hover:bg-gold hover:text-royal"
              >
                Explore Shop
              </Link>
            </div>
          ) : (
            <ul className="space-y-5">
              {cart.map((item) => (
                <li key={item.id} className="flex gap-4 border-b border-royal/5 pb-5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-28 w-20 object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-royal">{item.name}</p>
                        <p className="mt-1 text-[10px] tracking-wider text-muted-foreground uppercase">
                          {item.size} · {item.color}
                        </p>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} aria-label="Remove">
                        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-end justify-between">
                      <div className="flex items-center border border-royal/15">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="grid h-8 w-8 place-items-center hover:bg-royal/5"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-semibold">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="grid h-8 w-8 place-items-center hover:bg-royal/5"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="font-semibold text-royal">{formatINR(item.price * item.qty)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <footer className="border-t border-royal/10 bg-white px-6 py-5">
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>MRP</span>
                <span className="line-through">{formatINR(mrpTotal)}</span>
              </div>
              <div className="flex justify-between text-gold">
                <span>You save</span>
                <span>−{formatINR(mrpTotal - subtotal)}</span>
              </div>
              <div className="mt-3 flex justify-between border-t border-royal/10 pt-3 text-base font-semibold text-royal">
                <span>Subtotal</span>
                <span>{formatINR(subtotal)}</span>
              </div>
            </div>
            <Link
              to="/checkout"
              onClick={() => setCartOpen(false)}
              className="font-button mt-5 block bg-royal py-4 text-center text-[11px] tracking-[0.25em] text-cream uppercase transition hover:bg-gold hover:text-royal"
            >
              Secure Checkout
            </Link>
          </footer>
        )}
      </aside>
    </>
  );
}
