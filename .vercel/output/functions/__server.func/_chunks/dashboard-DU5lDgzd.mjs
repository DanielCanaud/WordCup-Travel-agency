import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { d as Link, f as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_lucide_react } from "../_libs/lucide-react.mjs";
import { g as getSession } from "./router-DoAxwh5p.mjs";
import { n as fmtBRL } from "./data-PKpvZrBP.mjs";
//#region dist/server/assets/dashboard-DU5lDgzd.js
var import_jsx_runtime = require_jsx_runtime();
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_lucide_react = require_lucide_react();
function Dashboard() {
	const navigate = useNavigate();
	const [session, setSession] = (0, import_react.useState)(null);
	const [reservas, setReservas] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		const s = getSession();
		if (!s) {
			navigate({ to: "/login" });
			return;
		}
		setSession(s);
		setReservas(JSON.parse(localStorage.getItem("wcv_reservas") || "[]").filter((r) => r.email === s.email));
	}, [navigate]);
	if (!session) return null;
	const total = reservas.reduce((a, r) => a + r.preco, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-gold text-xs tracking-[0.3em] uppercase",
				children: "Painel exclusivo"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "text-4xl md:text-5xl font-bold mt-2",
				children: ["Olá, ", session.name.split(" ")[0]]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted-foreground",
				children: "Gerencie suas reservas Atlas Voyages."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid sm:grid-cols-3 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: import_lucide_react.Plane,
						label: "Reservas",
						value: String(reservas.length)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: import_lucide_react.MapPin,
						label: "Destinos",
						value: String(new Set(reservas.map((r) => r.cidade)).size)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: import_lucide_react.Calendar,
						label: "Investimento total",
						value: fmtBRL(total)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-semibold mb-4",
					children: "Minhas reservas"
				}), reservas.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-card p-10 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: "Você ainda não tem reservas."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/pacotes",
						className: "mt-4 inline-block gradient-gold text-primary-foreground px-6 py-2.5 rounded-full text-sm font-medium shadow-lux",
						children: "Ver pacotes"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: reservas.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-widest text-gold uppercase",
								children: r.cidade
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-semibold",
								children: r.nome
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: ["Reservado em ", new Date(r.data).toLocaleDateString("pt-BR")]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-gradient-gold text-xl font-bold",
							children: fmtBRL(r.preco)
						})]
					}, r.id))
				})]
			})
		]
	});
}
function Stat({ icon: Icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-border bg-card p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-6 h-6 text-gold mb-3" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-2xl font-bold mt-1",
				children: value
			})
		]
	});
}
//#endregion
export { Dashboard as component };
