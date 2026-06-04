import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_lucide_react } from "../_libs/lucide-react.mjs";
import { n as fmtBRL, r as pacotes, t as destinos } from "./data-PKpvZrBP.mjs";
//#region dist/server/assets/index-CJqpGupX.js
var import_jsx_runtime = require_jsx_runtime();
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_lucide_react = require_lucide_react();
function Index() {
	const [idx, setIdx] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const t = setInterval(() => setIdx((i) => (i + 1) % destinos.length), 6e3);
		return () => clearInterval(t);
	}, []);
	const current = destinos[idx];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative h-[88vh] min-h-[560px] overflow-hidden",
			children: [
				destinos.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `absolute inset-0 transition-opacity duration-1000 ${i === idx ? "opacity-100" : "opacity-0"}`,
					style: {
						backgroundImage: `url(${d.imagem})`,
						backgroundSize: "cover",
						backgroundPosition: "center"
					}
				}, d.id)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-20 md:pb-32",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2 text-gold text-xs tracking-[0.3em] uppercase mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Sparkles, { className: "w-4 h-4" }), " Copa do Mundo 2026"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "text-4xl md:text-7xl font-bold leading-tight max-w-4xl",
							children: [
								"Viva ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-gradient-gold",
									children: current.cidade
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"como nunca antes."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-xl text-base md:text-lg text-foreground/80",
							children: current.descricao
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/pacotes",
								className: "gradient-gold text-primary-foreground px-7 py-3 rounded-full font-medium shadow-lux flex items-center gap-2 hover:opacity-90",
								children: ["Ver pacotes ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ArrowRight, { className: "w-4 h-4" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/destinos",
								className: "border border-gold/40 text-foreground px-7 py-3 rounded-full font-medium hover:bg-gold/10",
								children: "Explorar destinos"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-12 flex gap-2",
							children: destinos.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setIdx(i),
								className: `h-1 rounded-full transition-all ${i === idx ? "w-12 bg-gold" : "w-6 bg-foreground/30"}`,
								"aria-label": d.cidade
							}, d.id))
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-3 gap-8",
			children: [
				{
					icon: import_lucide_react.Plane,
					t: "Voos executivos",
					d: "Conforto premium em todas as etapas da sua jornada."
				},
				{
					icon: import_lucide_react.ShieldCheck,
					t: "Ingressos garantidos",
					d: "Acesso oficial aos jogos com camarotes exclusivos."
				},
				{
					icon: import_lucide_react.Sparkles,
					t: "Concierge 24/7",
					d: "Atendimento dedicado antes, durante e após a viagem."
				}
			].map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-8 rounded-2xl border border-border bg-card hover:border-gold/50 transition",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(v.icon, { className: "w-8 h-8 text-gold mb-4" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xl font-semibold mb-2",
						children: v.t
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground text-sm",
						children: v.d
					})
				]
			}, v.t))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between mb-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-gold text-xs tracking-[0.3em] uppercase",
					children: "Seleção curada"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl md:text-5xl font-bold mt-2",
					children: "Pacotes em destaque"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/pacotes",
					className: "hidden md:flex items-center gap-2 text-gold hover:underline",
					children: ["Todos os pacotes ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ArrowRight, { className: "w-4 h-4" })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid md:grid-cols-3 gap-6",
				children: pacotes.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/checkout",
					search: { pkg: p.id },
					className: "group rounded-2xl overflow-hidden border border-border bg-card hover:shadow-lux transition",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-[4/3] overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: p.imagem,
							alt: p.cidade,
							className: "w-full h-full object-cover group-hover:scale-105 transition duration-700"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-widest text-gold uppercase",
								children: p.cidade
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-2xl font-semibold mt-1",
								children: p.nome
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground mt-2",
								children: [
									p.hotel,
									" · ",
									p.noites,
									" noites"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-gradient-gold text-xl font-bold",
									children: fmtBRL(p.preco)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-gold",
									children: "Reservar →"
								})]
							})
						]
					})]
				}, p.id))
			})]
		})
	] });
}
//#endregion
export { Index as component };
