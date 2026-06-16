import { createFileRoute, Link } from "@tanstack/react-router";
import { Package, MapPin, Heart, Gift, LogOut, User } from "lucide-react";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "Account — The Crown's Attire" }] }),
  component: Account,
});

const tiles = [
  { icon: Package, label: "My Orders", desc: "Track, return or buy again" },
  { icon: Heart, label: "Wishlist", desc: "Pieces saved for later", to: "/wishlist" as const },
  { icon: MapPin, label: "Addresses", desc: "Manage delivery addresses" },
  { icon: Gift, label: "Rewards & Coupons", desc: "0 coins · 0 active coupons" },
];

function Account() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-14 lg:py-20">
      <div className="flex items-center gap-5 border-b border-royal/10 pb-8">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-royal text-cream">
          <User className="h-7 w-7" />
        </div>
        <div>
          <p className="font-button text-[11px] tracking-[0.25em] text-gold uppercase">
            Welcome back
          </p>
          <h1 className="font-heading text-3xl text-royal">Guest</h1>
          <Link to="/" className="mt-1 text-sm text-muted-foreground underline hover:text-royal">
            Sign in or create an account
          </Link>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {tiles.map((t) => {
          const Icon = t.icon;
          const Inner = (
            <div className="group flex items-start gap-4 border border-royal/10 bg-white p-5 transition hover:border-gold">
              <Icon className="mt-1 h-5 w-5 text-gold" />
              <div>
                <p className="font-heading text-lg text-royal">{t.label}</p>
                <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
              </div>
            </div>
          );
          return t.to ? (
            <Link key={t.label} to={t.to}>{Inner}</Link>
          ) : (
            <div key={t.label}>{Inner}</div>
          );
        })}
      </div>

      <button className="font-button mt-10 flex items-center gap-2 text-[11px] tracking-widest text-royal/60 uppercase hover:text-royal">
        <LogOut className="h-4 w-4" /> Sign out
      </button>
    </div>
  );
}
