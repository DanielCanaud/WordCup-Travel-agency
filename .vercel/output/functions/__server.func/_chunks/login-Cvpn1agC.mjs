import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { d as Link, f as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as loginUser } from "./router-DoAxwh5p.mjs";
//#region dist/server/assets/login-Cvpn1agC.js
var import_jsx_runtime = require_jsx_runtime();
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function LoginPage() {
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [err, setErr] = (0, import_react.useState)("");
	const submit = (e) => {
		e.preventDefault();
		const r = loginUser(email, password);
		if (!r.ok) return setErr(r.error || "Erro");
		navigate({ to: "/dashboard" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-[80vh] flex items-center justify-center px-4 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-lux",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-bold",
					children: "Bem-vindo de volta"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Acesse sua conta Atlas Voyages."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "mt-6 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: "E-mail"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								required: true,
								value: email,
								onChange: (e) => setEmail(e.target.value),
								className: "mt-1 w-full bg-input border border-border rounded-lg px-4 py-3 outline-none focus:border-gold"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: "Senha"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								required: true,
								value: password,
								onChange: (e) => setPassword(e.target.value),
								className: "mt-1 w-full bg-input border border-border rounded-lg px-4 py-3 outline-none focus:border-gold"
							})]
						}),
						err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-destructive",
							children: err
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "w-full gradient-gold text-primary-foreground py-3 rounded-full font-medium shadow-lux",
							children: "Entrar"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 text-sm text-center text-muted-foreground",
					children: [
						"Não tem conta?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/cadastro",
							className: "text-gold hover:underline",
							children: "Criar agora"
						})
					]
				})
			]
		})
	});
}
//#endregion
export { LoginPage as component };
