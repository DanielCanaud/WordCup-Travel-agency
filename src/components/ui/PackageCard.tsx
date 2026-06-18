import { Link } from "@tanstack/react-router";
import { Pacote, fmtBRL } from "@/lib/data";
import { Check, ArrowRight } from "lucide-react";

interface PackageCardProps {
  packageData: Pacote;
  showFeatures?: boolean;
}

export function PackageCard({ packageData: p, showFeatures = false }: PackageCardProps) {
  return (
    <div className="group rounded-2xl overflow-hidden border border-border bg-card flex flex-col hover:border-gold/40 hover:shadow-lux transition-all duration-500">
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={p.imagem}
          alt={p.cidade}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <span className="text-xs tracking-widest text-gold uppercase font-medium">
          {p.cidade}
        </span>
        <h3 className="text-2xl font-semibold mt-1 group-hover:text-gold transition-colors duration-300">
          {p.nome}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {p.hotel} · {p.noites} noites
        </p>

        {showFeatures && p.inclui && (
          <ul className="mt-5 space-y-2.5 flex-1">
            {p.inclui.map((inc) => (
              <li
                key={inc}
                className="flex items-start gap-2.5 text-sm text-foreground/80"
              >
                <Check className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <span>{inc}</span>
              </li>
            ))}
          </ul>
        )}

        {!showFeatures && <div className="flex-1 min-h-[20px]" />}

        <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">A partir de</p>
            <p className="text-gradient-gold text-2xl font-bold">
              {fmtBRL(p.preco)}
            </p>
          </div>
          <Link
            to="/checkout"
            search={{ pkg: p.id }}
            className="gradient-gold text-primary-foreground px-5 py-2.5 rounded-full text-sm font-medium shadow-lux flex items-center gap-1.5 hover:opacity-90 transition-opacity"
          >
            <span>Reservar</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
