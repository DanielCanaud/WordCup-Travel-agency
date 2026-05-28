import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Crown } from "lucide-react";
import { getSession, logout } from "@/lib/auth";

const links = [
  { to: "/", label: "Início" },
  { to: "/destinos", label: "Destinos" },
  { to: "/pacotes", label: "Pacotes" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<ReturnType<typeof getSession>>(null);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setSession(getSession());
  }, [pathname]);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    logout();
    setSession(null);
    navigate({ to: "/" });
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Crown className="w-6 h-6 text-gold transition-transform group-hover:scale-110" />
          <span className="font-serif text-lg tracking-wide">
            <span className="text-gradient-gold font-bold">Atlas</span>
            <span className="text-foreground/90"> Voyages</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm tracking-wide text-foreground/80 hover:text-gold transition-colors"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
          {session ? (
            <>
              <Link
                to="/dashboard"
                className="text-sm text-foreground/80 hover:text-gold"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-foreground/60 hover:text-gold"
              >
                Sair
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="gradient-gold text-primary-foreground px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition shadow-lux"
            >
              Entrar
            </Link>
          )}
        </div>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <div className="px-4 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="py-2 text-foreground/90 hover:text-gold"
                activeProps={{ className: "text-gold" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            {session ? (
              <>
                <Link
                  to="/dashboard"
                  className="py-2 text-foreground/90 hover:text-gold"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="py-2 text-left text-foreground/60"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="py-2 text-foreground/90 hover:text-gold"
                >
                  Entrar
                </Link>
                <Link to="/cadastro" className="py-2 text-gold">
                  Criar conta
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
