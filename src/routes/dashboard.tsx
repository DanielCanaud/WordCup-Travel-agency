import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getSession } from "@/lib/auth";
import { fmtBRL } from "@/lib/data";
import { Calendar, MapPin, Plane } from "lucide-react";

type Reserva = {
  id: string;
  nome: string;
  cidade: string;
  preco: number;
  data: string;
  email: string;
};

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard · Atlas Voyages" }] }),
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();
  const [session, setSession] = useState<ReturnType<typeof getSession>>(null);
  const [reservas, setReservas] = useState<Reserva[]>([]);

  useEffect(() => {
    const s = getSession();
    if (!s) {
      navigate({ to: "/login" });
      return;
    }
    setSession(s);
    const all: Reserva[] = JSON.parse(localStorage.getItem("wcv_reservas") || "[]");
    setReservas(all.filter((r) => r.email === s.email));
  }, [navigate]);

  if (!session) return null;

  const total = reservas.reduce((a, r) => a + r.preco, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <span className="text-gold text-xs tracking-[0.3em] uppercase">Painel exclusivo</span>
      <h1 className="text-4xl md:text-5xl font-bold mt-2">Olá, {session.name.split(" ")[0]}</h1>
      <p className="mt-2 text-muted-foreground">Gerencie suas reservas Atlas Voyages.</p>

      <div className="mt-10 grid sm:grid-cols-3 gap-4">
        <Stat icon={Plane} label="Reservas" value={String(reservas.length)} />
        <Stat
          icon={MapPin}
          label="Destinos"
          value={String(new Set(reservas.map((r) => r.cidade)).size)}
        />
        <Stat icon={Calendar} label="Investimento total" value={fmtBRL(total)} />
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Minhas reservas</h2>
        {reservas.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-10 text-center">
            <p className="text-muted-foreground">Você ainda não tem reservas.</p>
            <Link
              to="/pacotes"
              className="mt-4 inline-block gradient-gold text-primary-foreground px-6 py-2.5 rounded-full text-sm font-medium shadow-lux"
            >
              Ver pacotes
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {reservas.map((r) => (
              <div
                key={r.id}
                className="rounded-xl border border-border bg-card p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between"
              >
                <div>
                  <p className="text-xs tracking-widest text-gold uppercase">{r.cidade}</p>
                  <h3 className="text-lg font-semibold">{r.nome}</h3>
                  <p className="text-xs text-muted-foreground">
                    Reservado em {new Date(r.data).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <span className="text-gradient-gold text-xl font-bold">{fmtBRL(r.preco)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof Plane; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <Icon className="w-6 h-6 text-gold mb-3" />
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}
