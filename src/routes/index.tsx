import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { destinos, pacotes, fmtBRL } from "@/lib/data";
import { ArrowRight, Plane, ShieldCheck, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Atlas Voyages — Copa do Mundo 2026" },
      {
        name: "description",
        content:
          "Pacotes exclusivos high ticket para Los Angeles, Miami e Cidade do México na Copa 2026.",
      },
      { property: "og:title", content: "Atlas Voyages — Copa 2026" },
      {
        property: "og:description",
        content: "Viva a Copa do Mundo 2026 em experiências de luxo.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % destinos.length), 6000);
    return () => clearInterval(t);
  }, []);
  const current = destinos[idx];

  return (
    <div>
      {/* HERO */}
      <section className="relative h-[88vh] min-h-[560px] overflow-hidden">
        {destinos.map((d, i) => (
          <div
            key={d.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === idx ? "opacity-100" : "opacity-0"}`}
            style={{
              backgroundImage: `url(${d.imagem})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-20 md:pb-32">
          <span className="inline-flex items-center gap-2 text-gold text-xs tracking-[0.3em] uppercase mb-4">
            <Sparkles className="w-4 h-4" /> Copa do Mundo 2026
          </span>
          <h1 className="text-4xl md:text-7xl font-bold leading-tight max-w-4xl">
            Viva <span className="text-gradient-gold">{current.cidade}</span>
            <br />
            como nunca antes.
          </h1>
          <p className="mt-6 max-w-xl text-base md:text-lg text-foreground/80">
            {current.descricao}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/pacotes"
              className="gradient-gold text-primary-foreground px-7 py-3 rounded-full font-medium shadow-lux flex items-center gap-2 hover:opacity-90"
            >
              Ver pacotes <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/destinos"
              className="border border-gold/40 text-foreground px-7 py-3 rounded-full font-medium hover:bg-gold/10"
            >
              Explorar destinos
            </Link>
          </div>

          <div className="mt-12 flex gap-2">
            {destinos.map((d, i) => (
              <button
                key={d.id}
                onClick={() => setIdx(i)}
                className={`h-1 rounded-full transition-all ${i === idx ? "w-12 bg-gold" : "w-6 bg-foreground/30"}`}
                aria-label={d.cidade}
              />
            ))}
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-3 gap-8">
        {[
          {
            icon: Plane,
            t: "Voos executivos",
            d: "Conforto premium em todas as etapas da sua jornada.",
          },
          {
            icon: ShieldCheck,
            t: "Ingressos garantidos",
            d: "Acesso oficial aos jogos com camarotes exclusivos.",
          },
          {
            icon: Sparkles,
            t: "Concierge 24/7",
            d: "Atendimento dedicado antes, durante e após a viagem.",
          },
        ].map((v) => (
          <div
            key={v.t}
            className="p-8 rounded-2xl border border-border bg-card hover:border-gold/50 transition"
          >
            <v.icon className="w-8 h-8 text-gold mb-4" />
            <h3 className="text-xl font-semibold mb-2">{v.t}</h3>
            <p className="text-muted-foreground text-sm">{v.d}</p>
          </div>
        ))}
      </section>

      {/* PACOTES DESTAQUE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-gold text-xs tracking-[0.3em] uppercase">
              Seleção curada
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2">
              Pacotes em destaque
            </h2>
          </div>
          <Link
            to="/pacotes"
            className="hidden md:flex items-center gap-2 text-gold hover:underline"
          >
            Todos os pacotes <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {pacotes.map((p) => (
            <Link
              key={p.id}
              to="/checkout"
              search={{ pkg: p.id }}
              className="group rounded-2xl overflow-hidden border border-border bg-card hover:shadow-lux transition"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={p.imagem}
                  alt={p.cidade}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
              </div>
              <div className="p-6">
                <p className="text-xs tracking-widest text-gold uppercase">
                  {p.cidade}
                </p>
                <h3 className="text-2xl font-semibold mt-1">{p.nome}</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {p.hotel} · {p.noites} noites
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-gradient-gold text-xl font-bold">
                    {fmtBRL(p.preco)}
                  </span>
                  <span className="text-sm text-gold">Reservar →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
