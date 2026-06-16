import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="bg-royal pt-20 pb-28 text-cream lg:pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <h3 className="font-heading text-2xl italic">The Crown&apos;s Attire</h3>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/60">
              Luxury menswear, tailored in Coimbatore. Shipped across India.
            </p>
            <div className="mt-6 text-sm text-cream/70">
              <p>360 Alagesan Road, Saibaba Colony</p>
              <p>Coimbatore, Tamil Nadu 641011</p>
              <p className="mt-2 text-gold">+91 95005 55953</p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm">
              <span className="text-gold">★ 4.9</span>
              <span className="text-cream/50">based on 611 verified reviews</span>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-bold tracking-[0.25em] text-gold uppercase">
              Shop
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-cream/70">
              <li><Link to="/shop" className="hover:text-gold">New Arrivals</Link></li>
              <li><Link to="/shop/$category" params={{ category: "shirts" }} className="hover:text-gold">Shirts</Link></li>
              <li><Link to="/shop/$category" params={{ category: "trousers" }} className="hover:text-gold">Trousers</Link></li>
              <li><Link to="/shop/$category" params={{ category: "blazers" }} className="hover:text-gold">Blazers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold tracking-[0.25em] text-gold uppercase">
              Join the Circle
            </h4>
            <p className="mt-5 text-sm text-cream/60">
              Early access to drops & private events.
            </p>
            <form className="mt-4 flex border-b border-cream/20 pb-2">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="flex-1 bg-transparent text-[11px] tracking-[0.15em] uppercase placeholder:text-cream/30 focus:outline-none"
              />
              <button className="text-[11px] font-bold tracking-[0.15em] text-gold">JOIN</button>
            </form>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-cream/10 pt-8 text-[10px] tracking-[0.2em] text-cream/40 uppercase md:flex-row">
          <span>© 2026 The Crown&apos;s Attire</span>
          <span>Tailored in Coimbatore · Shipped Across India</span>
        </div>
      </div>
    </footer>
  );
}
