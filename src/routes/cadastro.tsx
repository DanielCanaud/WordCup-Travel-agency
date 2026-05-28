import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { registerUser } from "@/lib/auth";

export const Route = createFileRoute("/cadastro")({
  head: () => ({ meta: [{ title: "Cadastro · Atlas Voyages" }] }),
  component: CadastroPage,
});

function CadastroPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password.length < 6)
      return setErr("Senha deve ter ao menos 6 caracteres");
    const r = registerUser(form);
    if (!r.ok) return setErr(r.error || "Erro");
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-lux">
        <h1 className="text-3xl font-bold">Crie sua conta</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Comece sua jornada para a Copa 2026.
        </p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm">Nome</span>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 w-full bg-input border border-border rounded-lg px-4 py-3 outline-none focus:border-gold"
            />
          </label>
          <label className="block">
            <span className="text-sm">E-mail</span>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1 w-full bg-input border border-border rounded-lg px-4 py-3 outline-none focus:border-gold"
            />
          </label>
          <label className="block">
            <span className="text-sm">Senha</span>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="mt-1 w-full bg-input border border-border rounded-lg px-4 py-3 outline-none focus:border-gold"
            />
          </label>
          {err && <p className="text-sm text-destructive">{err}</p>}
          <button className="w-full gradient-gold text-primary-foreground py-3 rounded-full font-medium shadow-lux">
            Criar conta
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-muted-foreground">
          Já tem conta?{" "}
          <Link to="/login" className="text-gold hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
