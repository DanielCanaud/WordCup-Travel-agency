import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { loginUser } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Entrar · Atlas Voyages" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = loginUser(email, password);
    if (!r.ok) return setErr(r.error || "Erro");
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-lux">
        <h1 className="text-3xl font-bold">Bem-vindo de volta</h1>
        <p className="mt-2 text-sm text-muted-foreground">Acesse sua conta Atlas Voyages.</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm">E-mail</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full bg-input border border-border rounded-lg px-4 py-3 outline-none focus:border-gold"
            />
          </label>
          <label className="block">
            <span className="text-sm">Senha</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full bg-input border border-border rounded-lg px-4 py-3 outline-none focus:border-gold"
            />
          </label>
          {err && <p className="text-sm text-destructive">{err}</p>}
          <button className="w-full gradient-gold text-primary-foreground py-3 rounded-full font-medium shadow-lux">
            Entrar
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-muted-foreground">
          Não tem conta?{" "}
          <Link to="/cadastro" className="text-gold hover:underline">
            Criar agora
          </Link>
        </p>
      </div>
    </div>
  );
}
