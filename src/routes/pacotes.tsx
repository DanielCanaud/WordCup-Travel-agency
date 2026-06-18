import { createFileRoute } from "@tanstack/react-router";
import { pacotes } from "@/lib/data";
import { PackageCard } from "@/components/ui/PackageCard";

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

      <div className="mt-12 grid md:grid-cols-3 gap-8">
        {pacotes.map((p) => (
          <PackageCard key={p.id} packageData={p} showFeatures={true} />
        ))}
      </div>
    </div>
  );
}
