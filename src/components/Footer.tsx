import { Crown } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Crown className="w-5 h-5 text-gold" />
            <span className="font-serif text-lg">
              <span className="text-gradient-gold font-bold">Atlas</span> Voyages
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Experiências exclusivas para a Copa do Mundo 2026. Viaje como nunca antes.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gold mb-3">Contato</h4>
          <p className="text-sm text-muted-foreground">contato@atlasvoyages.com</p>
          <p className="text-sm text-muted-foreground">+55 11 99999-9999</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gold mb-3">Atlas Voyages</h4>
          <p className="text-sm text-muted-foreground">Av. Paulista, 1000 — São Paulo</p>
          <p className="text-xs text-muted-foreground/70 mt-4">
            © {new Date().getFullYear()} Atlas Voyages. Projeto fictício para portfólio.
          </p>
        </div>
      </div>
    </footer>
  );
}
