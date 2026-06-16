import { Link, useRouterState } from "@tanstack/react-router";
import { Home, LayoutGrid, Heart, ShoppingBag, User } from "lucide-react";
import { useShop } from "@/lib/store";
import { cn } from "@/lib/utils";

export function MobileBottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { cart, setCartOpen } = useShop();
  const count = cart.reduce((n, c) => n + c.qty, 0);

  const items = [
    { to: "/", label: "Home", icon: Home },
    { to: "/shop", label: "Shop", icon: LayoutGrid },
    { to: "/wishlist", label: "Wishlist", icon: Heart },
    { to: null, label: "Cart", icon: ShoppingBag, onClick: () => setCartOpen(true) },
    { to: "/account", label: "Account", icon: User },
  ];

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-40 flex h-16 items-center justify-around border-t border-royal/10 bg-cream/95 backdrop-blur-md lg:hidden">
      {items.map((it) => {
        const active = it.to && (it.to === "/" ? pathname === "/" : pathname.startsWith(it.to));
        const Icon = it.icon;
        const content = (
          <>
            <div className="relative">
              <Icon className={cn("h-5 w-5", active ? "text-gold" : "text-royal")} />
              {it.label === "Cart" && count > 0 && (
                <span className="absolute -top-1 -right-2 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[9px] font-bold text-royal">
                  {count}
                </span>
              )}
            </div>
            <span
              className={cn(
                "text-[9px] font-bold tracking-wider uppercase",
                active ? "text-gold" : "text-royal/60",
              )}
            >
              {it.label}
            </span>
          </>
        );
        return it.to ? (
          <Link key={it.label} to={it.to} className="flex flex-col items-center gap-1">
            {content}
          </Link>
        ) : (
          <button key={it.label} onClick={it.onClick} className="flex flex-col items-center gap-1">
            {content}
          </button>
        );
      })}
    </nav>
  );
}
