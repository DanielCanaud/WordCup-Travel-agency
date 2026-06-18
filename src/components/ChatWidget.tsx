import { useEffect, useRef, useState, useCallback } from "react";
import { X, Send, Sparkles } from "lucide-react";
import { pacotes, fmtBRL } from "@/lib/data";

// 👉 Troque pelo número real (formato internacional, só dígitos): DDI + DDD + número
const WHATSAPP_NUMBER = "5511999999999";

const waLink = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

/** Ícone de bola de futebol (substitui o antigo ícone do WhatsApp) */
function SoccerBall({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9.5" />
      <polygon
        points="12,8.7 15.14,10.98 13.94,14.67 10.06,14.67 8.86,10.98"
        fill="currentColor"
        stroke="currentColor"
      />
      <path d="M12 8.7V2.8M15.14 10.98l5.6-2.2M13.94 14.67l3.4 4.8M10.06 14.67l-3.4 4.8M8.86 10.98l-5.6-2.2" />
    </svg>
  );
}

type Cta = { label: string; text: string };
type Msg = { id: number; role: "bot" | "user"; text: string; cta?: Cta };

const QUICK_REPLIES = [
  { label: "💰 Ver preços", key: "precos" },
  { label: "📅 Como reservar", key: "reservar" },
  { label: "✈️ Pacotes", key: "pacotes" },
  { label: "💬 Falar no WhatsApp", key: "whatsapp" },
];

const GREETING: Msg = {
  id: 0,
  role: "bot",
  text: "Olá! 👋 Sou o concierge virtual da Atlas Voyages. Posso te ajudar com preços, reservas e detalhes dos pacotes da Copa 2026. O que você gostaria de saber?",
};

/** Motor de respostas baseado em palavras-chave. Retorna 1+ balões. */
function getBotReply(raw: string): Msg[] {
  const t = raw
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, ""); // remove acentos
  const id = () => Date.now() + Math.random();
  const has = (...words: string[]) => words.some((w) => t.includes(w));

  // Cidade específica
  const cidadeMatch = pacotes.find((p) => {
    const c = p.cidade
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "");
    return t.includes(c) || (c.includes("mexico") && has("mexico", "azteca"));
  });

  // Saudação
  if (has("oi", "ola", "bom dia", "boa tarde", "boa noite", "hello", "hey")) {
    return [{ id: id(), role: "bot", text: GREETING.text }];
  }

  // Preços
  if (has("preco", "preço", "valor", "quanto", "custa", "investimento", "orcamento")) {
    const lista = pacotes
      .map((p) => `• ${p.nome} (${p.cidade}) — ${fmtBRL(p.preco)} · ${p.noites} noites`)
      .join("\n");
    return [
      {
        id: id(),
        role: "bot",
        text: `Nossos pacotes para a Copa 2026:\n\n${lista}\n\nValores por pessoa, com voo, hospedagem 5★ e ingressos oficiais inclusos. ✨`,
      },
      {
        id: id(),
        role: "bot",
        text: "Quer que um consultor confirme disponibilidade e condições de pagamento por WhatsApp?",
        cta: {
          label: "Ver disponibilidade no WhatsApp",
          text: "Olá! Vi os preços no site e gostaria de saber a disponibilidade dos pacotes da Copa 2026.",
        },
      },
    ];
  }

  // Reserva
  if (has("reserv", "comprar", "garantir", "agendar", "pagamento", "parcel", "como faco", "fechar")) {
    return [
      {
        id: id(),
        role: "bot",
        text: "Para reservar é simples: como os ingressos e tarifas têm disponibilidade limitada, a reserva é confirmada diretamente com um de nossos consultores — respondemos em minutos. 🙌",
        cta: {
          label: "Quero reservar agora",
          text: "Olá! Quero reservar um pacote para a Copa do Mundo 2026. Pode me ajudar?",
        },
      },
    ];
  }

  // Cidade específica
  if (cidadeMatch) {
    return [
      {
        id: id(),
        role: "bot",
        text: `Pacote ${cidadeMatch.nome} — ${cidadeMatch.cidade}:\n\n💰 ${fmtBRL(
          cidadeMatch.preco,
        )} · ${cidadeMatch.noites} noites no ${cidadeMatch.hotel}\n\nInclui:\n${cidadeMatch.inclui
          .map((i) => `• ${i}`)
          .join("\n")}`,
        cta: {
          label: `Falar sobre ${cidadeMatch.cidade}`,
          text: `Olá! Tenho interesse no pacote ${cidadeMatch.nome} (${cidadeMatch.cidade}) da Copa 2026.`,
        },
      },
    ];
  }

  // Pacotes / destinos / o que inclui
  if (has("pacote", "destino", "cidade", "onde", "inclui", "incluso", "o que tem", "leva")) {
    return [
      {
        id: id(),
        role: "bot",
        text: "Operamos as 3 cidades-sede mais desejadas da Copa 2026:\n\n🇺🇸 Los Angeles · 🇺🇸 Miami · 🇲🇽 Cidade do México (jogo de abertura)\n\nTodos incluem voo executivo/first, hospedagem 5★, ingressos oficiais e transfers privativos. Digite o nome de uma cidade para ver os detalhes, ou peça os preços. 💬",
      },
    ];
  }

  // WhatsApp direto
  if (has("whatsapp", "whats", "telefone", "contato", "atendente", "consultor", "falar")) {
    return [
      {
        id: id(),
        role: "bot",
        text: "Perfeito! Clique abaixo e fale agora com um consultor especialista. 👇",
        cta: {
          label: "Abrir conversa no WhatsApp",
          text: "Olá! Vim pelo site e gostaria de falar com um consultor sobre a Copa 2026.",
        },
      },
    ];
  }

  // Fallback
  return [
    {
      id: id(),
      role: "bot",
      text: "Boa pergunta! Para te dar a resposta mais precisa, um de nossos consultores pode te atender agora mesmo pelo WhatsApp. 😉",
      cta: {
        label: "Falar com um consultor",
        text: "Olá! Tenho uma dúvida sobre os pacotes da Copa 2026.",
      },
    },
  ];
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => setIsOpen(false), []);

  // Esc fecha o chat
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    inputRef.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  // Auto-scroll para a última mensagem
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isOpen]);

  const send = useCallback((text: string) => {
    const value = text.trim();
    if (!value) return;
    const userMsg: Msg = { id: Date.now(), role: "user", text: value };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    // pequena latência simulando "digitando"
    setTimeout(() => {
      setMessages((prev) => [...prev, ...getBotReply(value)]);
    }, 350);
  }, []);

  const handleQuick = (key: string) => {
    const map: Record<string, string> = {
      precos: "Quais os preços?",
      reservar: "Como faço para reservar?",
      pacotes: "Quais pacotes vocês têm?",
      whatsapp: "Quero falar no WhatsApp",
    };
    send(map[key]);
  };

  return (
    <>
      {/* PAINEL DO CHAT */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Chat de atendimento Atlas Voyages"
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] h-[560px] max-h-[calc(100vh-7rem)] flex flex-col bg-zinc-950 border border-gold/30 rounded-3xl overflow-hidden shadow-2xl shadow-gold/10 animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-3 p-4 bg-gradient-to-r from-zinc-900 to-black border-b border-border/60">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-gold text-zinc-950 flex items-center justify-center shrink-0">
                <SoccerBall className="w-6 h-6" />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-zinc-950" />
              </div>
              <div className="leading-tight">
                <p className="font-bold text-foreground text-sm flex items-center gap-1.5">
                  Atlas Concierge <Sparkles className="w-3.5 h-3.5 text-gold" />
                </p>
                <p className="text-[11px] text-green-400 font-medium">Online · responde na hora</p>
              </div>
            </div>
            <button
              onClick={close}
              aria-label="Fechar chat"
              className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-gold/20 hover:text-gold text-foreground transition-all flex items-center justify-center shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Mensagens */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-line ${
                    m.role === "user"
                      ? "bg-gold text-zinc-950 font-medium rounded-br-md"
                      : "bg-zinc-900 border border-border/60 text-foreground rounded-bl-md"
                  }`}
                >
                  {m.text}
                  {m.cta && (
                    <a
                      href={waLink(m.cta.text)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2.5 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1faa50] text-white font-bold px-4 py-2 rounded-full text-xs transition-all hover:scale-[1.02]"
                    >
                      <SoccerBall className="w-4 h-4" /> {m.cta.label}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quick replies */}
          <div className="px-3 pb-2 flex flex-wrap gap-1.5">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q.key}
                onClick={() => handleQuick(q.key)}
                className="text-[11px] font-medium px-3 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold hover:bg-gold/15 transition-colors"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="p-3 border-t border-border/60 flex items-center gap-2 bg-zinc-900/50"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua pergunta..."
              className="flex-1 bg-zinc-900 border border-border rounded-full px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 transition-colors"
            />
            <button
              type="submit"
              aria-label="Enviar mensagem"
              disabled={!input.trim()}
              className="w-10 h-10 rounded-full bg-gold text-zinc-950 flex items-center justify-center shrink-0 transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* BOTÃO FLUTUANTE (BOLA DE FUTEBOL) */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Fechar chat" : "Abrir chat de atendimento"}
        aria-expanded={isOpen}
        className="fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-full gradient-gold text-zinc-950 flex items-center justify-center shadow-lux transition-transform hover:scale-110 active:scale-95"
      >
        {isOpen ? <X className="w-6 h-6" /> : <SoccerBall className="w-8 h-8" />}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-gold/40 animate-ping -z-10" />
        )}
      </button>
    </>
  );
}
