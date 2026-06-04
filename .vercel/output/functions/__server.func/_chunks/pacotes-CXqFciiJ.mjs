import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_lucide_react } from "../_libs/lucide-react.mjs";
import { n as fmtBRL, r as pacotes } from "./data-PKpvZrBP.mjs";
//#region dist/server/assets/pacotes-CXqFciiJ.js
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
function PacotesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-gold text-xs tracking-[0.3em] uppercase",
				children: "Experiências exclusivas"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl md:text-6xl font-bold mt-2",
				children: "Nossos pacotes"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-muted-foreground",
				children: "Curadoria completa: voos, hospedagem 5★, ingressos e concierge dedicado."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid md:grid-cols-3 gap-6",
				children: pacotes.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl overflow-hidden border border-border bg-card flex flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-[4/3] overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: p.imagem,
							alt: p.cidade,
							className: "w-full h-full object-cover"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6 flex-1 flex flex-col",
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
								className: "text-sm text-muted-foreground mt-1",
								children: [
									p.hotel,
									" · ",
									p.noites,
									" noites"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-4 space-y-2 flex-1",
								children: p.inclui.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-2 text-sm text-foreground/80",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Check, { className: "w-4 h-4 text-gold mt-0.5 shrink-0" }),
										" ",
										i
									]
								}, i))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 pt-6 border-t border-border flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "A partir de"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-gradient-gold text-2xl font-bold",
									children: fmtBRL(p.preco)
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/checkout",
									search: { pkg: p.id },
									className: "gradient-gold text-primary-foreground px-5 py-2.5 rounded-full text-sm font-medium shadow-lux",
									children: "Reservar"
								})]
							})
						]
					})]
				}, p.id))
			})
		]
	});
}
//#endregion
export { PacotesPage as component };
