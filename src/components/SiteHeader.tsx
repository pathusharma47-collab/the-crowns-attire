import { Link } from "@tanstack/react-router";
import { Search, Heart, ShoppingBag, User, Menu } from "lucide-react";
import { useShop } from "@/lib/store";


export function SiteHeader() {
  const { cart, setCartOpen } = useShop();
  const count = cart.reduce((n, c) => n + c.qty, 0);

  return (
    <header className="sticky top-0 z-40 border-b border-royal/10 bg-cream/90 backdrop-blur-md">
      <div className="bg-royal py-2 text-center text-[10px] tracking-[0.25em] text-cream uppercase">
        Free shipping pan-India · 7-day easy returns · ⭐ 4.9 · 611 reviews
      </div>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <div className="flex flex-1 items-center gap-8">
          <button className="-ml-2 p-2 lg:hidden" aria-label="Menu">
            <Menu className="h-5 w-5 text-royal" />
          </button>
          <div className="hidden items-center gap-7 text-[11px] font-medium tracking-[0.18em] text-royal uppercase lg:flex">
            <Link to="/shop" className="hover:text-gold transition-colors">New</Link>
            <Link to="/shop/$category" params={{ category: "shirts" }} className="hover:text-gold transition-colors">Shirts</Link>
            <Link to="/shop/$category" params={{ category: "trousers" }} className="hover:text-gold transition-colors">Trousers</Link>
            <Link to="/shop/$category" params={{ category: "blazers" }} className="hover:text-gold transition-colors">Blazers</Link>
            <Link to="/shop" className="hover:text-gold transition-colors">Collections</Link>
          </div>
        </div>

        <Link to="/" className="flex-none flex items-center gap-2">
          <img
            src="/logo.png"
            alt="The Crown's Attire"
            className="h-10 w-auto lg:h-12"
          />
          <span className="hidden lg:inline font-heading text-royal text-sm tracking-[0.15em] font-medium uppercase">
            THE CROWNS ATTIRE
          </span>
        </Link>

        <div className="flex flex-1 items-center justify-end gap-4 text-royal">
          <button className="hidden p-2 hover:text-gold lg:block" aria-label="Search">
            <Search className="h-5 w-5" />
          </button>
          <Link to="/account" className="hidden p-2 hover:text-gold lg:block" aria-label="Account">
            <User className="h-5 w-5" />
          </Link>
          <Link to="/wishlist" className="p-2 hover:text-gold" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
          </Link>
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2 hover:text-gold"
            aria-label="Cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[9px] font-bold text-royal">
                {count}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
