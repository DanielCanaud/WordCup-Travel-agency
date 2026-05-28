import { createFileRoute, Link } from "@tanstack/react-router";
import { pacotes, fmtBRL } from "@/lib/data";
import { Check } from "lucide-react";

export const Route = createFileRoute("/pacotes")({
  head: () => ({
    meta: [
      { title: "Pacotes · Atlas Voyages" },
      {
        name: "description",
        content: "Pacotes high ticket para a Copa do Mundo 2026.",
      },
    ],
  }),
  component: PacotesPage,
});

function PacotesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <span className="text-gold text-xs tracking-[0.3em] uppercase">
        Experiências exclusivas
      </span>
      <h1 className="text-4xl md:text-6xl font-bold mt-2">Nossos pacotes</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Curadoria completa: voos, hospedagem 5★, ingressos e concierge dedicado.
      </p>

      <div className="mt-12 grid md:grid-cols-3 gap-6">
        {pacotes.map((p) => (
          <div
            key={p.id}
            className="rounded-2xl overflow-hidden border border-border bg-card flex flex-col"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={p.imagem}
                alt={p.cidade}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <p className="text-xs tracking-widest text-gold uppercase">
                {p.cidade}
              </p>
              <h3 className="text-2xl font-semibold mt-1">{p.nome}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {p.hotel} · {p.noites} noites
              </p>
              <ul className="mt-4 space-y-2 flex-1">
                {p.inclui.map((i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-foreground/80"
                  >
                    <Check className="w-4 h-4 text-gold mt-0.5 shrink-0" /> {i}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">A partir de</p>
                  <p className="text-gradient-gold text-2xl font-bold">
                    {fmtBRL(p.preco)}
                  </p>
                </div>
                <Link
                  to="/checkout"
                  search={{ pkg: p.id }}
                  className="gradient-gold text-primary-foreground px-5 py-2.5 rounded-full text-sm font-medium shadow-lux"
                >
                  Reservar
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
