import { createFileRoute, Link } from "@tanstack/react-router";
import { Leaf, ShieldCheck, Sparkles, Truck, ArrowRight, Clock, Plus, Check } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "@/assets/logo.png.asset.json";
import { SiteHeader } from "@/components/SiteHeader";
import { products, floatingItems } from "@/lib/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pure Select — Wholesome Everyday Groceries" },
      {
        name: "description",
        content:
          "Pure Select brings handpicked raw peanuts, roasted chana dal, toor, moong and urad dal — 100% natural, hygienically packed, zero preservatives.",
      },
      { property: "og:title", content: "Pure Select — Wholesome Everyday Groceries" },
      {
        property: "og:description",
        content: "Handpicked raw peanuts, roasted chana dal and premium dals. A promise of purity in every pack.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const promises = [
  { icon: Leaf, title: "100% Natural", text: "No additives, no shortcuts. Just clean, honest grocery." },
  { icon: Sparkles, title: "Rich in Protein", text: "Nutrient-dense staples for everyday Indian kitchens." },
  { icon: ShieldCheck, title: "Hygienically Packed", text: "Sealed for freshness with zero preservatives." },
  { icon: Truck, title: "Live on Blinkit", text: "Delivered to your door in minutes, across the city." },
];

function FloatingCluster({ mouse }: { mouse: { x: number; y: number } }) {
  return (
    <div className="relative mx-auto h-[280px] w-full max-w-sm sm:h-[400px] sm:max-w-md md:h-[460px] lg:h-[520px] lg:max-w-lg">
      {floatingItems.map((item) => (
        <div
          key={item.alt}
          className={`absolute ${item.position} transition-transform duration-300 ease-out`}
          style={{ transform: `translate(${mouse.x * item.depth}px, ${mouse.y * item.depth}px)` }}
        >
          <div className={`float-card ${item.size} ${item.animation}`}>
            <img
              src={item.image}
              alt={item.alt}
              className="h-full w-full object-cover"
              loading="lazy"
              width={400}
              height={400}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function AddToCartButton({ id, disabled }: { id: string; disabled?: boolean }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  if (disabled) {
    return (
      <button
        disabled
        className="mt-4 w-full cursor-not-allowed rounded-full border border-border bg-secondary/60 px-3 py-2 text-xs font-semibold text-muted-foreground"
      >
        Coming soon
      </button>
    );
  }

  return (
    <button
      onClick={() => {
        add(id);
        setAdded(true);
        setTimeout(() => setAdded(false), 1400);
      }}
      className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-transform hover:scale-[1.03] sm:text-sm"
    >
      {added ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
      {added ? "Added" : "Add to cart"}
    </button>
  );
}

function Index() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section id="top" className="hero-surface relative overflow-hidden">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-leaf/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />

        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 sm:gap-10 sm:px-6 sm:py-16 md:grid-cols-2 md:gap-12 md:py-24 lg:px-8 lg:py-28 2xl:max-w-7xl">
          <div className="animate-rise text-center md:text-left">
            <h1 className="text-[2.1rem] font-bold leading-[1.08] tracking-tight text-balance text-primary sm:text-5xl sm:leading-[1.05] md:text-[3.25rem] lg:text-6xl xl:text-7xl">
              <span className="block">A promise of purity</span>
              <span className="mt-1 block text-leaf sm:mt-2">in every pack</span>
            </h1>
            <p className="mx-auto mt-4 max-w-md text-pretty text-[0.95rem] leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg md:mx-0 lg:max-w-lg">
              Wholesome, natural staples — from handpicked peanuts and roasted chana to premium dals —
              sealed fresh for your kitchen.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3 sm:mt-8 md:justify-start">
              <Link
                to="/"
                hash="products"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:scale-105 sm:px-7 sm:py-3.5 sm:text-base"
              >
                Explore our products
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="relative animate-rise [animation-delay:150ms]">
            <FloatingCluster mouse={mouse} />
          </div>
        </div>

        <div className="deep-surface overflow-hidden py-3.5">
          <div className="animate-marquee flex w-max gap-6 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/85 sm:gap-10 sm:text-sm sm:tracking-[0.3em]">
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={i} className="flex gap-6 sm:gap-10">
                <span>100% Natural</span><span>•</span>
                <span>Zero Preservatives</span><span>•</span>
                <span>Expertly Sourced</span><span>•</span>
                <span>Hygienically Packed</span><span>•</span>
                <span>Now Live on Blinkit</span><span>•</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6 sm:py-16 md:py-24 lg:px-8 lg:py-28 2xl:max-w-7xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-leaf sm:text-xs">Our range</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">
          Five staples. Zero compromise.
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-12 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((p) => (
            <article
              key={p.id}
              className="surface-card flex flex-col overflow-hidden rounded-[1.25rem] border border-border/70"
            >
              <div className="overflow-hidden">
                <img
                  src={p.image}
                  alt={`Pure Select ${p.name}`}
                  className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                  width={400}
                  height={400}
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold leading-tight text-primary md:text-lg">{p.name}</h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">{p.local}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-[10px] font-semibold text-secondary-foreground">
                    {p.status === "available" ? (
                      p.weight
                    ) : (
                      <>
                        <Clock className="h-3 w-3" />
                        Soon
                      </>
                    )}
                  </span>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{p.note}</p>
                <p className="mt-3 text-sm font-bold text-leaf">₹{p.price}</p>
                <div className="mt-auto">
                  <AddToCartButton id={p.id} disabled={p.status !== "available"} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="promise" className="deep-surface scroll-mt-24 py-14 sm:py-16 md:py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 2xl:max-w-7xl">
          <h2 className="max-w-xl text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl md:text-5xl">
            Purity you can taste, quality you can trust.
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 md:mt-12 md:gap-6 lg:grid-cols-4">
            {promises.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-5 transition-colors hover:bg-primary-foreground/10 sm:p-6"
              >
                <Icon className="h-7 w-7 text-accent" />
                <h3 className="mt-4 text-lg font-semibold text-primary-foreground">{title}</h3>
                <p className="mt-2 text-sm text-primary-foreground/70">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="story" className="mx-auto max-w-4xl scroll-mt-24 px-4 py-14 text-center sm:px-6 sm:py-16 md:py-24 lg:py-28">
        <img src={logo.url} alt="Pure Select" className="animate-float mx-auto h-20 w-20 rounded-full sm:h-24 sm:w-24" />
        <h2 className="mt-8 text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">
          From honest farms to your kitchen
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Pure Select began with a simple belief — everyday groceries deserve the same care as
          special-occasion ingredients. Every batch is handpicked, quality-checked and sealed fresh,
          so what reaches your kitchen is nothing but goodness.
        </p>
      </section>

      <footer className="border-t border-border/70 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-center text-sm text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <img src={logo.url} alt="" className="h-7 w-7 rounded-full" />
            <span className="font-semibold tracking-[0.18em] text-primary">PURE SELECT</span>
          </div>
          <p>© {new Date().getFullYear()} Pure Select. Trusted for everyday groceries.</p>
        </div>
      </footer>
    </main>
  );
}
