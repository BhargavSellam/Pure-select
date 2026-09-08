import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Pure Select Groceries" },
      {
        name: "description",
        content:
          "Review the Pure Select staples in your cart — raw peanuts, roasted chana dal and premium dals — then place your order.",
      },
      { property: "og:title", content: "Your Cart — Pure Select Groceries" },
      {
        property: "og:description",
        content: "Review your Pure Select grocery picks and buy now.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, total, count, setQty, remove, clear } = useCart();
  const [placed, setPlaced] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-5 md:py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Continue shopping
        </Link>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">
          Your cart
        </h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          {count > 0 ? `${count} item${count > 1 ? "s" : ""} ready to go` : "Nothing here yet."}
        </p>

        {placed ? (
          <div className="surface-card mt-10 rounded-2xl border border-border/70 p-8 text-center">
            <ShoppingBag className="mx-auto h-10 w-10 text-leaf" />
            <h2 className="mt-4 text-xl font-semibold text-primary">Order placed!</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Thank you for choosing Pure Select. We'll be in touch shortly.
            </p>
            <Link
              to="/"
              className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
            >
              Back to home
            </Link>
          </div>
        ) : items.length === 0 ? (
          <div className="surface-card mt-10 rounded-2xl border border-border/70 p-8 text-center">
            <p className="text-sm text-muted-foreground">Your cart is empty.</p>
            <Link
              to="/"
              hash="products"
              className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
            <ul className="space-y-4">
              {items.map(({ product, qty }) => (
                <li
                  key={product.id}
                  className="surface-card flex flex-col gap-4 rounded-2xl border border-border/70 p-4 sm:flex-row sm:items-center"
                >
                  <img
                    src={product.image}
                    alt={`Pure Select ${product.name}`}
                    className="h-24 w-24 shrink-0 rounded-xl object-cover"
                    width={200}
                    height={200}
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <h2 className="text-base font-bold text-primary sm:text-lg">{product.name}</h2>
                    <p className="text-xs text-muted-foreground">{product.local}</p>
                    <p className="mt-1 text-sm font-semibold text-leaf">
                      ₹{product.price} · {product.weight}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-3 sm:justify-end">
                    <div className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-secondary p-1">
                      <button
                        aria-label={`Decrease ${product.name}`}
                        onClick={() => setQty(product.id, qty - 1)}
                        className="rounded-full p-1.5 text-secondary-foreground transition-colors hover:bg-background"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold text-primary">{qty}</span>
                      <button
                        aria-label={`Increase ${product.name}`}
                        onClick={() => setQty(product.id, qty + 1)}
                        className="rounded-full p-1.5 text-secondary-foreground transition-colors hover:bg-background"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <button
                      aria-label={`Remove ${product.name}`}
                      onClick={() => remove(product.id)}
                      className="rounded-full p-2 text-muted-foreground transition-colors hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="surface-card h-fit rounded-2xl border border-border/70 p-6 lg:sticky lg:top-24">
              <h2 className="text-lg font-semibold text-primary">Order summary</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <dt>Items</dt>
                  <dd>{count}</dd>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <dt>Delivery</dt>
                  <dd>Free</dd>
                </div>
                <div className="flex justify-between border-t border-border/70 pt-3 text-base font-bold text-primary">
                  <dt>Total</dt>
                  <dd>₹{total}</dd>
                </div>
              </dl>
              <button
                onClick={() => {
                  clear();
                  setPlaced(true);
                }}
                className="mt-6 w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:scale-[1.02]"
              >
                Buy now
              </button>
              <button
                onClick={clear}
                className="mt-3 w-full rounded-full border border-border px-6 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Clear cart
              </button>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}
