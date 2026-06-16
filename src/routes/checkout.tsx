import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useShop, formatINR } from "@/lib/store";
import { Check, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — The Crown's Attire" }] }),
  component: Checkout,
});

function Checkout() {
  const { cart, clearCart } = useShop();
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [placed, setPlaced] = useState(false);

  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  if (placed) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold text-royal">
          <Check className="h-8 w-8" />
        </div>
        <h1 className="font-heading mt-6 text-4xl text-royal">Thank you</h1>
        <p className="mt-3 text-muted-foreground">
          Order #TCA{Math.floor(Math.random() * 90000 + 10000)} confirmed. Estimated delivery in 3–5
          days.
        </p>
        <Link
          to="/"
          onClick={() => clearCart()}
          className="font-button mt-8 inline-block bg-royal px-8 py-4 text-[11px] tracking-[0.25em] text-cream uppercase hover:bg-gold hover:text-royal"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="font-heading text-3xl text-royal">Your bag is empty</h1>
        <Link
          to="/shop"
          className="font-button mt-6 inline-block bg-royal px-8 py-3 text-[11px] tracking-widest text-cream uppercase"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 lg:py-14">
      <h1 className="font-heading text-3xl text-royal lg:text-4xl">Checkout</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          {/* Stepper */}
          <ol className="flex items-center gap-2 text-[11px] tracking-widest uppercase">
            {["Address", "Shipping", "Payment"].map((s, i) => {
              const n = (i + 1) as 1 | 2 | 3;
              return (
                <li key={s} className="flex items-center gap-2">
                  <span
                    className={cn(
                      "grid h-7 w-7 place-items-center rounded-full text-xs",
                      step >= n ? "bg-royal text-cream" : "bg-royal/10 text-royal/40",
                    )}
                  >
                    {n}
                  </span>
                  <span className={step >= n ? "text-royal" : "text-royal/40"}>{s}</span>
                  {n < 3 && <span className="w-6 border-t border-royal/20" />}
                </li>
              );
            })}
          </ol>

          {step === 1 && (
            <section className="border border-royal/10 bg-white p-6">
              <h2 className="font-heading text-xl text-royal">Shipping Address</h2>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <input className="col-span-2 border border-royal/15 px-3 py-3 text-sm focus:border-gold focus:outline-none" placeholder="Full Name" />
                <input className="border border-royal/15 px-3 py-3 text-sm focus:border-gold focus:outline-none" placeholder="Phone" />
                <input className="border border-royal/15 px-3 py-3 text-sm focus:border-gold focus:outline-none" placeholder="Email" />
                <input className="col-span-2 border border-royal/15 px-3 py-3 text-sm focus:border-gold focus:outline-none" placeholder="Address line 1" />
                <input className="col-span-2 border border-royal/15 px-3 py-3 text-sm focus:border-gold focus:outline-none" placeholder="Landmark (optional)" />
                <input className="border border-royal/15 px-3 py-3 text-sm focus:border-gold focus:outline-none" placeholder="City" />
                <input className="border border-royal/15 px-3 py-3 text-sm focus:border-gold focus:outline-none" placeholder="Pincode" />
              </div>
              <button
                onClick={() => setStep(2)}
                className="font-button mt-6 w-full bg-royal py-4 text-[11px] tracking-[0.25em] text-cream uppercase hover:bg-gold hover:text-royal"
              >
                Continue to Shipping
              </button>
            </section>
          )}

          {step === 2 && (
            <section className="border border-royal/10 bg-white p-6">
              <h2 className="font-heading text-xl text-royal">Delivery Method</h2>
              <div className="mt-5 space-y-3">
                {[
                  { label: "Standard Shipping", desc: "3-5 business days", price: shipping },
                  { label: "Express Shipping", desc: "1-2 business days", price: 199 },
                  { label: "Store Pickup · Coimbatore", desc: "Available next day", price: 0 },
                ].map((o, i) => (
                  <label key={o.label} className="flex cursor-pointer items-center justify-between border border-royal/15 bg-white p-4 hover:border-gold">
                    <div className="flex items-center gap-3">
                      <input type="radio" name="ship" defaultChecked={i === 0} className="accent-gold" />
                      <div>
                        <p className="font-medium text-royal">{o.label}</p>
                        <p className="text-xs text-muted-foreground">{o.desc}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-royal">
                      {o.price === 0 ? "FREE" : formatINR(o.price)}
                    </span>
                  </label>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                <button onClick={() => setStep(1)} className="font-button flex-1 border border-royal/20 py-4 text-[11px] tracking-widest text-royal uppercase">Back</button>
                <button onClick={() => setStep(3)} className="font-button flex-1 bg-royal py-4 text-[11px] tracking-[0.25em] text-cream uppercase hover:bg-gold hover:text-royal">Continue to Payment</button>
              </div>
            </section>
          )}

          {step === 3 && (
            <section className="border border-royal/10 bg-white p-6">
              <h2 className="font-heading text-xl text-royal flex items-center gap-2">
                <Lock className="h-4 w-4 text-gold" /> Payment
              </h2>
              <div className="mt-5 space-y-3">
                {["UPI · Google Pay / PhonePe", "Credit / Debit Card", "Net Banking", "Cash on Delivery"].map((m, i) => (
                  <label key={m} className="flex cursor-pointer items-center gap-3 border border-royal/15 bg-white p-4 hover:border-gold">
                    <input type="radio" name="pay" defaultChecked={i === 0} className="accent-gold" />
                    <span className="font-medium text-royal">{m}</span>
                  </label>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                <button onClick={() => setStep(2)} className="font-button flex-1 border border-royal/20 py-4 text-[11px] tracking-widest text-royal uppercase">Back</button>
                <button
                  onClick={() => setPlaced(true)}
                  className="font-button flex-1 bg-gold py-4 text-[11px] tracking-[0.25em] text-royal uppercase hover:bg-royal hover:text-cream"
                >
                  Place Order · {formatINR(total)}
                </button>
              </div>
            </section>
          )}
        </div>

        {/* Summary */}
        <aside className="h-fit border border-royal/10 bg-white p-6 lg:sticky lg:top-24">
          <h2 className="font-heading text-xl text-royal">Order Summary</h2>
          <ul className="mt-5 space-y-4">
            {cart.map((c) => (
              <li key={c.id} className="flex gap-3">
                <img src={c.image} alt={c.name} className="h-20 w-16 object-cover" />
                <div className="flex-1 text-sm">
                  <p className="font-medium text-royal">{c.name}</p>
                  <p className="mt-1 text-[10px] tracking-wider text-muted-foreground uppercase">
                    {c.size} · {c.color} · Qty {c.qty}
                  </p>
                  <p className="mt-2 text-royal">{formatINR(c.price * c.qty)}</p>
                </div>
              </li>
            ))}
          </ul>
          <dl className="mt-6 space-y-2 border-t border-royal/10 pt-4 text-sm">
            <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatINR(subtotal)}</dd></div>
            <div className="flex justify-between"><dt>Shipping</dt><dd>{shipping === 0 ? "FREE" : formatINR(shipping)}</dd></div>
            <div className="flex justify-between border-t border-royal/10 pt-3 text-base font-semibold text-royal">
              <dt>Total</dt><dd>{formatINR(total)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
