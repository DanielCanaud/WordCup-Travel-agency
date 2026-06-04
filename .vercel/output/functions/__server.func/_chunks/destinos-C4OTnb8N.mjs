import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_lucide_react } from "../_libs/lucide-react.mjs";
import { t as destinos } from "./data-PKpvZrBP.mjs";
//#region dist/server/assets/destinos-C4OTnb8N.js
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
function DestinosPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-gold text-xs tracking-[0.3em] uppercase",
				children: "Cidades-sede"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl md:text-6xl font-bold mt-2",
				children: "Destinos da Copa 2026"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-muted-foreground",
				children: "Três capitais mundiais. Três experiências únicas. Escolha a sua."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-16 space-y-24",
				children: destinos.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: `grid md:grid-cols-2 gap-8 md:gap-12 items-center ${i % 2 ? "md:[&>div:first-child]:order-2" : ""}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-2xl overflow-hidden aspect-[4/3] shadow-lux",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: d.imagem,
							alt: d.cidade,
							className: "w-full h-full object-cover"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-gold text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.MapPin, { className: "w-4 h-4" }),
								" ",
								d.pais
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl md:text-4xl font-bold mt-2",
							children: d.cidade
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-muted-foreground",
							children: d.descricao
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 grid grid-cols-3 gap-3",
							children: d.pontos.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg overflow-hidden border border-border",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "aspect-square overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: p.img,
										alt: p.nome,
										className: "w-full h-full object-cover"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs p-2 text-center text-foreground/80",
									children: p.nome
								})]
							}, p.nome))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/pacotes",
							className: "mt-6 inline-block gradient-gold text-primary-foreground px-6 py-2.5 rounded-full text-sm font-medium shadow-lux",
							children: ["Ver pacotes para ", d.cidade]
						})
					] })]
				}, d.id))
			})
		]
	});
}
//#endregion
export { DestinosPage as component };
