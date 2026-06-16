import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Star, Instagram, MapPin } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { products, occasions } from "@/lib/products";
import heroImg from "@/assets/hero.jpg";
import catShirts from "@/assets/cat-shirts.jpg";
import catTrousers from "@/assets/cat-trousers.jpg";
import catPolos from "@/assets/cat-polos.jpg";
import catBlazers from "@/assets/cat-blazers.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Crown's Attire — Luxury Menswear At India's Best Price" },
      { name: "description", content: "Discover premium men's shirts, trousers, blazers and more — tailored in Coimbatore, shipped pan-India. Rated 4.9★ by 611 customers." },
      { property: "og:title", content: "The Crown's Attire — Luxury Menswear" },
      { property: "og:description", content: "Premium tailored menswear, shipped pan-India." },
    ],
  }),
  component: Home,
});

const categoryTiles = [
  { slug: "shirts", label: "Premium Shirts", count: "240 styles", image: catShirts },
  { slug: "trousers", label: "Trousers & Chinos", count: "112 styles", image: catTrousers },
  { slug: "polos", label: "Textured Polos", count: "85 styles", image: catPolos },
  { slug: "blazers", label: "Tailored Blazers", count: "42 styles", image: catBlazers },
];

function Home() {
  const trending = products.slice(0, 4);
  const newArrivals = products.slice(2, 8);

  return (
    <div className="bg-cream">
      {/* HERO */}
      <section className="relative min-h-[88vh] flex items-center justify-center bg-royal">
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-store.jpg"
            alt="The Crown's Attire Flagship Store"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center px-6 py-20 text-center text-cream w-full">
          <div className="animate-fade-up max-w-2xl">
            <span className="font-button text-[11px] tracking-[0.35em] text-gold uppercase drop-shadow-md">
              Visit Our Flagship Store
            </span>
            <h1 className="font-heading mt-6 text-5xl leading-[1.05] text-balance lg:text-7xl drop-shadow-lg">
              Step Into
              <br />
              <span className="italic font-normal">Our Atelier</span>
            </h1>
            <p className="mt-6 mx-auto max-w-md text-base leading-relaxed text-cream/90 drop-shadow">
              Experience the finest collection of premium shirts, trousers, and tailored blazers in person. Discover your perfect fit with our expert styling.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                to="/shop"
                className="font-button group flex items-center gap-3 bg-gold px-8 py-4 text-[11px] tracking-[0.25em] text-royal uppercase transition hover:bg-cream"
              >
                Shop the Collection
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="mt-12 flex justify-center items-center gap-6 text-xs text-cream/90">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-gold" />
                <span className="font-semibold text-cream">Saibaba Colony, Coimbatore</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <span className="font-button text-[11px] tracking-[0.3em] text-gold uppercase">
                Wardrobe Essentials
              </span>
              <h2 className="font-heading mt-3 text-4xl text-royal lg:text-5xl">
                Curated Categories
              </h2>
            </div>
            <Link
              to="/shop"
              className="font-button hidden text-[11px] tracking-[0.25em] text-royal uppercase border-b border-gold pb-1 hover:text-gold sm:block"
            >
              Explore All
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {categoryTiles.map((c) => (
              <Link
                key={c.slug}
                to="/shop/$category"
                params={{ category: c.slug }}
                className="group block"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-white">
                  <img
                    src={c.image}
                    alt={c.label}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                </div>
                <h3 className="font-heading mt-4 text-lg text-royal">{c.label}</h3>
                <p className="mt-1 text-[10px] tracking-wider text-muted-foreground uppercase">
                  {c.count}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TRENDING */}
      <section className="bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <span className="font-button text-[11px] tracking-[0.3em] text-gold uppercase">
              This Week
            </span>
            <h2 className="font-heading mt-3 text-4xl text-royal lg:text-5xl">Trending Now</h2>
            <div className="mx-auto mt-6 h-px w-12 bg-gold" />
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-14">
            {trending.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* OCCASIONS */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-heading mb-12 text-center text-4xl text-royal italic lg:text-5xl">
            Crafted for the moment
          </h2>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
            {occasions.map((o) => (
              <Link
                key={o.slug}
                to="/shop"
                className="group relative flex aspect-[5/3] items-center justify-center overflow-hidden border border-royal/10 bg-royal text-cream transition-colors hover:bg-gold hover:text-royal"
              >
                <span className="font-heading text-xl tracking-wide italic lg:text-2xl">
                  {o.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex items-end justify-between">
            <div>
              <span className="font-button text-[11px] tracking-[0.3em] text-gold uppercase">
                Fresh In
              </span>
              <h2 className="font-heading mt-3 text-4xl text-royal lg:text-5xl">New Arrivals</h2>
            </div>
            <Link
              to="/shop"
              className="font-button text-[11px] tracking-[0.25em] text-royal uppercase border-b border-gold pb-1 hover:text-gold"
            >
              View All
            </Link>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible no-scrollbar">
            {newArrivals.map((p) => (
              <div key={p.id} className="min-w-[260px] lg:min-w-0">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-royal px-6 py-24 text-cream lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-gold text-gold" />
            ))}
          </div>
          <p className="font-heading mt-8 text-2xl leading-relaxed italic lg:text-3xl">
            &ldquo;The cut of their blazers rivals brands that cost five times as much. Finally, a
            Coimbatore brand taking over the national stage.&rdquo;
          </p>
          <div className="mt-10">
            <p className="text-sm font-semibold text-gold">Karthik R. · Verified Buyer</p>
            <p className="mt-2 text-xs tracking-widest text-cream/40 uppercase">
              4.9 / 5 · 611 Google reviews
            </p>
          </div>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="bg-cream py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 text-center">
            <Instagram className="mx-auto h-6 w-6 text-gold" />
            <h2 className="font-heading mt-4 text-3xl text-royal lg:text-4xl">
              @thecrownsattire_official
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Tag us in your looks to be featured.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6">
            {[heroImg, catShirts, catPolos, catBlazers, catTrousers, heroImg].map((src, i) => (
              <div
                key={i}
                className="group relative aspect-square overflow-hidden bg-white"
              >
                <img
                  src={src}
                  alt="Instagram look"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-royal/0 transition-colors group-hover:bg-royal/40" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORE LOCATOR */}
      <section className="border-t border-royal/10 bg-white px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div>
            <MapPin className="h-6 w-6 text-gold" />
            <h2 className="font-heading mt-4 text-3xl text-royal lg:text-4xl">
              Visit our flagship store
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Step into our Coimbatore atelier for personal styling, tailoring sessions and the
              full collection in person.
            </p>
            <address className="font-heading mt-6 text-lg text-royal not-italic">
              360 Alagesan Road,<br />
              Saibaba Colony,<br />
              Coimbatore — 641011
            </address>
            <a
              href="tel:+919500555953"
              className="font-button mt-6 inline-block bg-royal px-8 py-4 text-[11px] tracking-[0.25em] text-cream uppercase hover:bg-gold hover:text-royal"
            >
              Call +91 95005 55953
            </a>
          </div>
          <div className="aspect-[4/3] bg-royal/5">
            <iframe
              title="Store location"
              src="https://www.google.com/maps?q=Saibaba+Colony+Coimbatore&output=embed"
              className="h-full w-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
