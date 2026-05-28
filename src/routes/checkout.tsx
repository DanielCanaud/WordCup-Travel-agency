import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { pacotes, fmtBRL } from "@/lib/data";
import { getSession } from "@/lib/auth";
import { Check, CreditCard } from "lucide-react";

type Search = { pkg?: string };

export const Route = createFileRoute("/checkout")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    pkg: typeof s.pkg === "string" ? s.pkg : undefined,
  }),
  head: () => ({ meta: [{ title: "Checkout · Atlas Voyages" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { pkg } = Route.useSearch();
  const pacote = pacotes.find((p) => p.id === pkg) ?? pacotes[0];
  const navigate = useNavigate();
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "", cartao: "", validade: "", cvv: "" });

  useEffect(() => {
    const s = getSession();
    if (s) setForm((f) => ({ ...f, nome: s.name, email: s.email }));
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const reservas = JSON.parse(localStorage.getItem("wcv_reservas") || "[]");
    reservas.push({
      id: crypto.randomUUID(),
      pacote: pacote.id,
      nome: pacote.nome,
      cidade: pacote.cidade,
      preco: pacote.preco,
      data: new Date().toISOString(),
      email: form.email,
    });
    localStorage.setItem("wcv_reservas", JSON.stringify(reservas));
    setDone(true);
    setTimeout(() => navigate({ to: "/dashboard" }), 2000);
  };

  if (done) {
    return (
      <div className="max-w-xl mx-auto px-4 py-32 text-center">
        <div className="w-16 h-16 rounded-full gradient-gold mx-auto flex items-center justify-center mb-6">
          <Check className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold">Reserva confirmada!</h1>
        <p className="mt-3 text-muted-foreground">Redirecionando ao seu painel…</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid md:grid-cols-[1fr_400px] gap-10">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold">Finalizar reserva</h1>
        <p className="mt-2 text-muted-foreground">
          Dados simulados — nenhuma cobrança real é feita.
        </p>

        <form onSubmit={submit} className="mt-8 space-y-5">
          <Field
            label="Nome completo"
            value={form.nome}
            onChange={(v) => setForm({ ...form, nome: v })}
            required
          />
          <Field
            label="E-mail"
            type="email"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
            required
          />
          <Field
            label="Número do cartão"
            value={form.cartao}
            onChange={(v) => setForm({ ...form, cartao: v })}
            placeholder="0000 0000 0000 0000"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Validade"
              value={form.validade}
              onChange={(v) => setForm({ ...form, validade: v })}
              placeholder="MM/AA"
              required
            />
            <Field
              label="CVV"
              value={form.cvv}
              onChange={(v) => setForm({ ...form, cvv: v })}
              placeholder="123"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full gradient-gold text-primary-foreground py-3.5 rounded-full font-medium shadow-lux flex items-center justify-center gap-2"
          >
            <CreditCard className="w-4 h-4" /> Pagar {fmtBRL(pacote.preco)}
          </button>
        </form>
      </div>

      <aside className="rounded-2xl border border-border bg-card p-6 h-fit sticky top-24">
        <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4">
          <img src={pacote.imagem} alt={pacote.cidade} className="w-full h-full object-cover" />
        </div>
        <p className="text-xs tracking-widest text-gold uppercase">{pacote.cidade}</p>
        <h3 className="text-xl font-semibold mt-1">{pacote.nome}</h3>
        <p className="text-sm text-muted-foreground">
          {pacote.hotel} · {pacote.noites} noites
        </p>
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total</span>
          <span className="text-gradient-gold text-2xl font-bold">{fmtBRL(pacote.preco)}</span>
        </div>
        <Link
          to="/pacotes"
          className="block mt-4 text-xs text-center text-muted-foreground hover:text-gold"
        >
          ← Trocar pacote
        </Link>
      </aside>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm text-foreground/80">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="mt-1 w-full bg-input border border-border rounded-lg px-4 py-3 outline-none focus:border-gold transition"
      />
    </label>
  );
}
