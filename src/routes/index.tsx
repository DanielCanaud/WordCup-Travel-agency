import { createFileRoute, Link } from "@tanstack/react-router";
import { pacotes, destinos } from "@/lib/data";
import { ArrowRight, Plane, ShieldCheck, Sparkles, Map as MapIcon } from "lucide-react";
import { PackageCard } from "@/components/ui/PackageCard";
import { LuxuryMap } from "@/components/LuxuryMap";

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
  return (
    <div>
      {/* HERO CINEMÁTICO */}
      <section className="relative h-[92vh] min-h-[600px] overflow-hidden">
        {/* Background estático: estádio da Copa (viagens + Copa do Mundo) */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=1920&q=80&auto=format&fit=crop"
            alt="Estádio de futebol lotado à noite durante a Copa do Mundo"
            className="w-full h-full object-cover scale-105"
            loading="eager"
          />
          {/* Overlays para profundidade e legibilidade do texto */}
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background" />
        </div>

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center pt-20">
          <div className="max-w-4xl space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <span className="inline-flex items-center gap-2 text-gold text-xs md:text-sm tracking-[0.4em] uppercase font-semibold">
              <Sparkles className="w-4 h-4" /> Próxima Parada: Copa do Mundo 2026
            </span>
            <h1 className="text-5xl md:text-8xl font-bold leading-[1.1] tracking-tight">
              A Grandeza do Futebol
              <br />
              <span className="text-gradient-gold">Em Nível Executivo.</span>
            </h1>
            <p className="max-w-xl text-lg md:text-xl text-foreground/80 leading-relaxed">
              Curadoria exclusiva de destinos sede: Los Angeles, Miami e o palco da abertura na Cidade do México. Onde o esporte encontra a sofisticação absoluta.
            </p>
            <div className="pt-6 flex flex-wrap gap-5">
              <Link
                to="/pacotes"
                className="gradient-gold text-primary-foreground px-10 py-4 rounded-full font-bold shadow-lux flex items-center gap-2 hover:scale-105 transition-transform"
              >
                Explorar Pacotes <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/destinos"
                className="bg-white/5 backdrop-blur-md border border-white/10 text-foreground px-10 py-4 rounded-full font-bold hover:bg-white/10 transition"
              >
                Cidades Sede
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-gold rounded-full" />
          </div>
        </div>
      </section>

      {/* VALORES / DIFERENCIAIS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Plane,
              t: "Logística Impecável",
              d: "Voos em cabines executivas e transfer privativo em todas as cidades sede.",
            },
            {
              icon: ShieldCheck,
              t: "Acesso Privilegiado",
              d: "Ingressos de categoria 1 e hospitalidade em camarotes exclusivos da FIFA.",
            },
            {
              icon: Sparkles,
              t: "Concierge Pessoal",
              d: "Atendimento bilíngue dedicado 24h para reservas em restaurantes e tours.",
            },
          ].map((v) => (
            <div
              key={v.t}
              className="p-10 rounded-3xl border border-border bg-card/50 backdrop-blur-sm hover:border-gold/30 hover:shadow-lux transition-all duration-500 group"
            >
              <div className="w-14 h-14 bg-gold/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                <v.icon className="w-7 h-7 text-gold" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{v.t}</h3>
              <p className="text-muted-foreground leading-relaxed">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MAPA INTERATIVO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-gold text-xs tracking-[0.3em] uppercase font-bold">Localizador</span>
          <h2 className="text-4xl md:text-6xl font-bold italic">Explore os Continentes</h2>
          <p className="text-muted-foreground text-lg">
            Navegue pelos nossos hubs oficiais e visualize as conexões exclusivas preparadas para a Copa 2026.
          </p>
        </div>
        <LuxuryMap />
      </section>

      {/* PACOTES DESTAQUE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <span className="text-gold text-xs tracking-[0.3em] uppercase font-bold flex items-center gap-2">
              <MapIcon className="w-4 h-4" /> Seleção Premium
            </span>
            <h2 className="text-4xl md:text-6xl font-bold">
              Pacotes em <span className="italic">Destaque</span>
            </h2>
          </div>
          <Link
            to="/pacotes"
            className="group flex items-center gap-2 text-gold font-semibold hover:gap-3 transition-all"
          >
            Ver catálogo completo <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {pacotes.map((p) => (
            <PackageCard key={p.id} packageData={p} />
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="relative rounded-[40px] overflow-hidden p-12 md:p-24 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-gold/20 via-gold/5 to-gold/20" />
          <div className="absolute inset-0 bg-card border border-gold/20" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold">Garanta seu lugar na história.</h2>
            <p className="text-muted-foreground text-lg">
              As vagas para pacotes com camarote na final em New York / New Jersey são limitadíssimas. Entre em contato com nossos especialistas hoje.
            </p>
            <Link
              to="/pacotes"
              className="inline-block gradient-gold text-primary-foreground px-12 py-5 rounded-full font-bold text-lg shadow-lux hover:scale-105 transition-transform"
            >
              Falar com Consultor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

