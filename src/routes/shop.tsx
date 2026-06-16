import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All — The Crown's Attire" },
      { name: "description", content: "Shop the complete edit of premium menswear — shirts, trousers, blazers, polos & more." },
    ],
  }),
  component: ShopAll,
});

function ShopAll() {
  return <PLP title="All Products" subtitle="The Complete Edit" items={products} />;
}

export function PLP({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: typeof products;
}) {
  const [sort, setSort] = useState("featured");
  const sorted = [...items].sort((a, b) => {
    if (sort === "low") return a.price - b.price;
    if (sort === "high") return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="bg-cream">
      <div className="border-b border-royal/10 bg-white px-6 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <span className="font-button text-[11px] tracking-[0.3em] text-gold uppercase">
            {subtitle}
          </span>
          <h1 className="font-heading mt-3 text-4xl text-royal lg:text-5xl">{title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">{items.length} pieces</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="mb-8 flex items-center justify-between border-b border-royal/10 pb-4">
          <button className="font-button flex items-center gap-2 text-[11px] tracking-[0.2em] text-royal uppercase">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>
          <div className="flex items-center gap-3">
            <span className="text-[11px] tracking-wider text-muted-foreground uppercase">
              Sort
            </span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="font-button border border-royal/15 bg-white px-3 py-2 text-[11px] tracking-wider text-royal uppercase focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="low">Price: Low → High</option>
              <option value="high">Price: High → Low</option>
              <option value="rating">Best Rated</option>
            </select>
          </div>
        </div>

        <div className={cn(
          "grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-14",
        )}>
          {sorted.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
