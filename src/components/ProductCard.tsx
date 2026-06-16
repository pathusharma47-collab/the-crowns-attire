import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { type Product } from "@/lib/products";
import { useShop, formatINR } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist, addToCart } = useShop();
  const isWished = wishlist.includes(product.id);
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div className="group">
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="relative block aspect-[3/4] overflow-hidden bg-white"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
        />
        {product.badge && (
          <span
            className={cn(
              "absolute top-3 left-3 px-2 py-1 text-[9px] font-bold uppercase tracking-wider",
              product.badge === "Best Seller" && "bg-white text-royal",
              product.badge === "New" && "bg-royal text-white",
              product.badge === "Limited" && "bg-gold text-royal",
            )}
          >
            {product.badge}
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-royal backdrop-blur transition hover:scale-110"
          aria-label="Wishlist"
        >
          <Heart className={cn("h-4 w-4", isWished && "fill-gold text-gold")} />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            addToCart({
              productId: product.id,
              name: product.name,
              image: product.image,
              price: product.price,
              mrp: product.mrp,
              size: product.sizes[Math.floor(product.sizes.length / 2)],
              color: product.colors[0].name,
            });
          }}
          className="font-button absolute right-3 bottom-3 left-3 translate-y-2 bg-royal py-3 text-[10px] font-medium tracking-widest text-white uppercase opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-gold hover:text-royal"
        >
          Quick Add +
        </button>
      </Link>
      <div className="mt-4 px-1">
        <p className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
          {product.categoryLabel}
        </p>
        <Link
          to="/product/$id"
          params={{ id: product.id }}
          className="mt-1 block text-sm font-medium text-royal hover:text-gold transition-colors"
        >
          {product.name}
        </Link>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-semibold text-royal">{formatINR(product.price)}</span>
          <span className="text-xs text-muted-foreground line-through">{formatINR(product.mrp)}</span>
          <span className="text-[10px] font-bold tracking-wider text-gold uppercase">
            {discount}% Off
          </span>
        </div>
      </div>
    </div>
  );
}
