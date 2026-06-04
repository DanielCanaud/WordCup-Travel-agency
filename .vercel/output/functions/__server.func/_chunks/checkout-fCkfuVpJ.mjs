import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { d as Link, f as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_lucide_react } from "../_libs/lucide-react.mjs";
import { R as Route$2, g as getSession } from "./router-DoAxwh5p.mjs";
import { n as fmtBRL, r as pacotes } from "./data-PKpvZrBP.mjs";
//#region dist/server/assets/checkout-fCkfuVpJ.js
var import_jsx_runtime = require_jsx_runtime();
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_lucide_react = require_lucide_react();
function CheckoutPage() {
	const { pkg } = Route$2.useSearch();
	const pacote = pacotes.find((p) => p.id === pkg) ?? pacotes[0];
	const navigate = useNavigate();
	const [done, setDone] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		nome: "",
		email: "",
		cartao: "",
		validade: "",
		cvv: ""
	});
	(0, import_react.useEffect)(() => {
		const s = getSession();
		if (s) setForm((f) => ({
			...f,
			nome: s.name,
			email: s.email
		}));
	}, []);
	const submit = (e) => {
		e.preventDefault();
		const reservas = JSON.parse(localStorage.getItem("wcv_reservas") || "[]");
		reservas.push({
			id: crypto.randomUUID(),
			pacote: pacote.id,
			nome: pacote.nome,
			cidade: pacote.cidade,
			preco: pacote.preco,
			data: (/* @__PURE__ */ new Date()).toISOString(),
			email: form.email
		});
		localStorage.setItem("wcv_reservas", JSON.stringify(reservas));
		setDone(true);
		setTimeout(() => navigate({ to: "/dashboard" }), 2e3);
	};
	if (done) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-xl mx-auto px-4 py-32 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-16 h-16 rounded-full gradient-gold mx-auto flex items-center justify-center mb-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Check, { className: "w-8 h-8 text-primary-foreground" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold",
				children: "Reserva confirmada!"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted-foreground",
				children: "Redirecionando ao seu painel…"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid md:grid-cols-[1fr_400px] gap-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl md:text-4xl font-bold",
				children: "Finalizar reserva"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted-foreground",
				children: "Dados simulados — nenhuma cobrança real é feita."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "mt-8 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Nome completo",
						value: form.nome,
						onChange: (v) => setForm({
							...form,
							nome: v
						}),
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "E-mail",
						type: "email",
						value: form.email,
						onChange: (v) => setForm({
							...form,
							email: v
						}),
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Número do cartão",
						value: form.cartao,
						onChange: (v) => setForm({
							...form,
							cartao: v
						}),
						placeholder: "0000 0000 0000 0000",
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Validade",
							value: form.validade,
							onChange: (v) => setForm({
								...form,
								validade: v
							}),
							placeholder: "MM/AA",
							required: true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "CVV",
							value: form.cvv,
							onChange: (v) => setForm({
								...form,
								cvv: v
							}),
							placeholder: "123",
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "submit",
						className: "w-full gradient-gold text-primary-foreground py-3.5 rounded-full font-medium shadow-lux flex items-center justify-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.CreditCard, { className: "w-4 h-4" }),
							" Pagar ",
							fmtBRL(pacote.preco)
						]
					})
				]
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "rounded-2xl border border-border bg-card p-6 h-fit sticky top-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "aspect-[4/3] rounded-lg overflow-hidden mb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: pacote.imagem,
						alt: pacote.cidade,
						className: "w-full h-full object-cover"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-widest text-gold uppercase",
					children: pacote.cidade
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-xl font-semibold mt-1",
					children: pacote.nome
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: [
						pacote.hotel,
						" · ",
						pacote.noites,
						" noites"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 pt-4 border-t border-border flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted-foreground",
						children: "Total"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-gradient-gold text-2xl font-bold",
						children: fmtBRL(pacote.preco)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/pacotes",
					className: "block mt-4 text-xs text-center text-muted-foreground hover:text-gold",
					children: "← Trocar pacote"
				})
			]
		})]
	});
}
function Field({ label, value, onChange, type = "text", placeholder, required }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm text-foreground/80",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type,
			value,
			onChange: (e) => onChange(e.target.value),
			placeholder,
			required,
			className: "mt-1 w-full bg-input border border-border rounded-lg px-4 py-3 outline-none focus:border-gold transition"
		})]
	});
}
//#endregion
export { CheckoutPage as component };
