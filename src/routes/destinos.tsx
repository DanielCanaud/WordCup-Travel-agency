import { createFileRoute, Link } from "@tanstack/react-router";
import { destinos } from "@/lib/data";
import { MapPin } from "lucide-react";

export const Route = createFileRoute("/destinos")({
  head: () => ({
    meta: [
      { title: "Destinos · Atlas Voyages" },
      {
        name: "description",
        content: "Cidades-sede da Copa 2026: Los Angeles, Miami e Cidade do México.",
      },
    ],
  }),
  component: DestinosPage,
});

function DestinosPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <span className="text-gold text-xs tracking-[0.3em] uppercase">Cidades-sede</span>
      <h1 className="text-4xl md:text-6xl font-bold mt-2">Destinos da Copa 2026</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Três capitais mundiais. Três experiências únicas. Escolha a sua.
      </p>

      <div className="mt-16 space-y-24">
        {destinos.map((d, i) => (
          <article
            key={d.id}
            className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${i % 2 ? "md:[&>div:first-child]:order-2" : ""}`}
          >
            <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-lux">
              <img src={d.imagem} alt={d.cidade} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-gold text-sm">
                <MapPin className="w-4 h-4" /> {d.pais}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mt-2">{d.cidade}</h2>
              <p className="mt-4 text-muted-foreground">{d.descricao}</p>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {d.pontos.map((p) => (
                  <div key={p.nome} className="rounded-lg overflow-hidden border border-border">
                    <div className="aspect-square overflow-hidden">
                      <img src={p.img} alt={p.nome} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-xs p-2 text-center text-foreground/80">{p.nome}</p>
                  </div>
                ))}
              </div>
              <Link
                to="/pacotes"
                className="mt-6 inline-block gradient-gold text-primary-foreground px-6 py-2.5 rounded-full text-sm font-medium shadow-lux"
              >
                Ver pacotes para {d.cidade}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
