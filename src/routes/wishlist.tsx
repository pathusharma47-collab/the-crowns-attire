import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { useShop } from "@/lib/store";
import { products } from "@/lib/products";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — The Crown's Attire" }] }),
  component: Wishlist,
});

function Wishlist() {
  const { wishlist } = useShop();
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
      <span className="font-button text-[11px] tracking-[0.3em] text-gold uppercase">
        Saved for later
      </span>
      <h1 className="font-heading mt-3 text-4xl text-royal lg:text-5xl">Your Wishlist</h1>

      {items.length === 0 ? (
        <div className="mt-16 border border-royal/10 bg-white py-20 text-center">
          <p className="font-heading text-2xl text-royal">Nothing saved yet</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Tap the heart on any piece to save it here.
          </p>
          <Link
            to="/shop"
            className="font-button mt-6 inline-block bg-royal px-8 py-3 text-[11px] tracking-widest text-cream uppercase hover:bg-gold hover:text-royal"
          >
            Explore Shop
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-14">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
