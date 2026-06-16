import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, ShoppingBag, Star, Truck, RotateCcw, ShieldCheck, Minus, Plus } from "lucide-react";
import { getProduct, products } from "@/lib/products";
import { useShop, formatINR } from "@/lib/store";
import { ProductCard } from "@/components/ProductCard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$id")({
  head: ({ params }) => {
    const p = getProduct(params.id);
    return {
      meta: [
        { title: `${p?.name ?? "Product"} — The Crown's Attire` },
        { name: "description", content: p?.description ?? "" },
        { property: "og:title", content: p?.name },
        { property: "og:image", content: p?.image },
      ],
    };
  },
  loader: ({ params }) => {
    const p = getProduct(params.id);
    if (!p) throw notFound();
    return { product: p };
  },
  component: PDP,
});

function PDP() {
  const { id } = Route.useParams();
  const product = getProduct(id)!;

  const [size, setSize] = useState(product.sizes[Math.floor(product.sizes.length / 2)]);
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [pincode, setPincode] = useState("");
  const [pincodeMsg, setPincodeMsg] = useState<string | null>(null);

  const { addToCart, wishlist, toggleWishlist, setCartOpen } = useShop();
  const wished = wishlist.includes(product.id);
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      mrp: product.mrp,
      size,
      color: color.name,
      qty,
    });
  };

  const checkPin = () => {
    if (!/^\d{6}$/.test(pincode)) {
      setPincodeMsg("Enter a valid 6-digit pincode");
      return;
    }
    setPincodeMsg(`✓ Delivery in 3-5 days. COD available.`);
  };

  return (
    <div className="bg-cream">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-6 pt-6 text-[11px] tracking-wider text-muted-foreground uppercase lg:px-8">
        <Link to="/" className="hover:text-royal">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/shop/$category" params={{ category: product.category }} className="hover:text-royal">
          {product.categoryLabel}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-royal">{product.name}</span>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-14">
        {/* Gallery */}
        <div>
          <div className="aspect-[3/4] overflow-hidden bg-white">
            <img
              src={product.images[activeImg]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-3 flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={cn(
                  "h-20 w-16 overflow-hidden bg-white",
                  activeImg === i ? "ring-2 ring-gold" : "opacity-60",
                )}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <p className="font-button text-[11px] tracking-[0.3em] text-gold uppercase">
            {product.categoryLabel}
          </p>
          <h1 className="font-heading mt-3 text-3xl text-royal lg:text-4xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-gold text-gold" />
              <span className="font-semibold text-royal">{product.rating}</span>
            </div>
            <span className="text-muted-foreground">· {product.reviews} reviews</span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-heading text-3xl text-royal">{formatINR(product.price)}</span>
            <span className="text-sm text-muted-foreground line-through">{formatINR(product.mrp)}</span>
            <span className="font-button text-xs font-bold tracking-wider text-gold uppercase">
              {discount}% Off
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Inclusive of all taxes</p>

          {/* Color */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold tracking-widest text-royal uppercase">
                Color · {color.name}
              </p>
            </div>
            <div className="mt-3 flex gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c)}
                  className={cn(
                    "h-9 w-9 rounded-full border-2 transition",
                    color.name === c.name ? "border-gold scale-110" : "border-royal/15",
                  )}
                  style={{ background: c.hex }}
                  aria-label={c.name}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mt-7">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold tracking-widest text-royal uppercase">
                Select Size
              </p>
              <button className="text-[11px] tracking-wider text-gold underline uppercase">
                Size Guide
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={cn(
                    "font-button min-w-12 border px-4 py-3 text-xs tracking-wider uppercase transition",
                    size === s
                      ? "border-royal bg-royal text-cream"
                      : "border-royal/15 bg-white text-royal hover:border-royal/40",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-7">
            <p className="text-[11px] font-semibold tracking-widest text-royal uppercase">Quantity</p>
            <div className="mt-3 inline-flex items-center border border-royal/15 bg-white">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="grid h-11 w-11 place-items-center hover:bg-royal/5"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-10 text-center text-sm font-semibold">{qty}</span>
              <button
                onClick={() => setQty(Math.min(10, qty + 1))}
                className="grid h-11 w-11 place-items-center hover:bg-royal/5"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Actions (desktop) */}
          <div className="mt-8 hidden gap-3 lg:flex">
            <button
              onClick={handleAdd}
              className="font-button flex flex-1 items-center justify-center gap-2 border border-royal bg-white py-4 text-[11px] tracking-[0.25em] text-royal uppercase hover:bg-royal hover:text-cream"
            >
              <ShoppingBag className="h-4 w-4" /> Add to Bag
            </button>
            <button
              onClick={() => {
                handleAdd();
                setTimeout(() => setCartOpen(false), 100);
              }}
              className="font-button flex-1 bg-gold py-4 text-[11px] tracking-[0.25em] text-royal uppercase hover:bg-royal hover:text-cream"
            >
              Buy It Now
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className="grid w-14 place-items-center border border-royal/15 bg-white hover:border-royal"
              aria-label="Wishlist"
            >
              <Heart className={cn("h-5 w-5", wished && "fill-gold text-gold")} />
            </button>
          </div>

          {/* Pincode */}
          <div className="mt-8 border border-royal/10 bg-white p-5">
            <p className="text-[11px] font-semibold tracking-widest text-royal uppercase">
              Check Delivery
            </p>
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter pincode"
                className="flex-1 border border-royal/15 px-3 py-3 text-sm focus:border-gold focus:outline-none"
              />
              <button
                onClick={checkPin}
                className="font-button bg-royal px-5 text-[11px] tracking-widest text-cream uppercase hover:bg-gold hover:text-royal"
              >
                Check
              </button>
            </div>
            {pincodeMsg && (
              <p className="mt-2 text-xs text-muted-foreground">{pincodeMsg}</p>
            )}
          </div>

          {/* Trust */}
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <div className="border border-royal/10 bg-white p-3">
              <Truck className="mx-auto h-5 w-5 text-gold" />
              <p className="mt-2 text-[10px] tracking-widest text-royal uppercase">Free Shipping</p>
            </div>
            <div className="border border-royal/10 bg-white p-3">
              <RotateCcw className="mx-auto h-5 w-5 text-gold" />
              <p className="mt-2 text-[10px] tracking-widest text-royal uppercase">7-Day Returns</p>
            </div>
            <div className="border border-royal/10 bg-white p-3">
              <ShieldCheck className="mx-auto h-5 w-5 text-gold" />
              <p className="mt-2 text-[10px] tracking-widest text-royal uppercase">100% Original</p>
            </div>
          </div>

          {/* Details */}
          <dl className="mt-10 divide-y divide-royal/10 border-t border-royal/10">
            {[
              ["Fabric", product.fabric],
              ["Fit", product.fit],
              ["Country of Origin", "India"],
              ["Wash Care", "Machine wash cold, line dry"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-3 text-sm">
                <dt className="font-medium text-royal/60">{k}</dt>
                <dd className="text-royal">{v}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
        </div>
      </div>

      {/* Related */}
      <section className="border-t border-royal/10 bg-white px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-heading text-2xl text-royal lg:text-3xl">You may also love</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Sticky mobile bottom bar */}
      <div className="fixed right-0 bottom-16 left-0 z-30 flex items-center gap-2 border-t border-royal/10 bg-white p-3 shadow-lg lg:hidden">
        <button
          onClick={() => toggleWishlist(product.id)}
          className="grid h-12 w-12 place-items-center border border-royal/15"
          aria-label="Wishlist"
        >
          <Heart className={cn("h-5 w-5", wished && "fill-gold text-gold")} />
        </button>
        <button
          onClick={handleAdd}
          className="font-button flex flex-1 items-center justify-center gap-2 bg-royal py-3.5 text-[11px] tracking-widest text-cream uppercase"
        >
          Add to Bag · {formatINR(product.price)}
        </button>
      </div>
    </div>
  );
}
