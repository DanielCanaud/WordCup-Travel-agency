import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { c as lazyRouteComponent, d as Link, f as useNavigate, i as useRouterState, l as createFileRoute, n as Scripts, o as createRouter, p as useRouter, r as HeadContent, s as Outlet, u as createRootRouteWithContext } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as require_lucide_react } from "../_libs/lucide-react.mjs";
//#region dist/server/assets/router-DoAxwh5p.js
var import_jsx_runtime = require_jsx_runtime();
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_lucide_react = require_lucide_react();
const appCss = "/assets/styles-CiBAcST2.css";
const USERS_KEY = "wcv_users";
const SESSION_KEY = "wcv_session";
const isBrowser = () => typeof window !== "undefined";
function getUsers() {
	if (!isBrowser()) return [];
	try {
		return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
	} catch {
		return [];
	}
}
function registerUser(user) {
	if (!isBrowser()) return {
		ok: false,
		error: "Indisponível"
	};
	const users = getUsers();
	if (users.find((u) => u.email === user.email)) return {
		ok: false,
		error: "E-mail já cadastrado"
	};
	users.push(user);
	localStorage.setItem(USERS_KEY, JSON.stringify(users));
	localStorage.setItem(SESSION_KEY, JSON.stringify({
		email: user.email,
		name: user.name
	}));
	return { ok: true };
}
function loginUser(email, password) {
	if (!isBrowser()) return { ok: false };
	const user = getUsers().find((u) => u.email === email && u.password === password);
	if (!user) return {
		ok: false,
		error: "Credenciais inválidas"
	};
	localStorage.setItem(SESSION_KEY, JSON.stringify({
		email: user.email,
		name: user.name
	}));
	return { ok: true };
}
function logout() {
	if (!isBrowser()) return;
	localStorage.removeItem(SESSION_KEY);
}
function getSession() {
	if (!isBrowser()) return null;
	try {
		return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
	} catch {
		return null;
	}
}
const links = [
	{
		to: "/",
		label: "Início"
	},
	{
		to: "/destinos",
		label: "Destinos"
	},
	{
		to: "/pacotes",
		label: "Pacotes"
	}
];
function Navbar() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [session, setSession] = (0, import_react.useState)(null);
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	(0, import_react.useEffect)(() => {
		setSession(getSession());
	}, [pathname]);
	(0, import_react.useEffect)(() => {
		setOpen(false);
	}, [pathname]);
	const handleLogout = () => {
		logout();
		setSession(null);
		navigate({ to: "/" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2 group",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Crown, { className: "w-6 h-6 text-gold transition-transform group-hover:scale-110" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-serif text-lg tracking-wide",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-gradient-gold font-bold",
							children: "Atlas"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-foreground/90",
							children: " Voyages"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden md:flex items-center gap-8",
					children: [links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						className: "text-sm tracking-wide text-foreground/80 hover:text-gold transition-colors",
						activeProps: { className: "text-gold" },
						activeOptions: { exact: l.to === "/" },
						children: l.label
					}, l.to)), session ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/dashboard",
						className: "text-sm text-foreground/80 hover:text-gold",
						children: "Dashboard"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: handleLogout,
						className: "text-sm text-foreground/60 hover:text-gold",
						children: "Sair"
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						className: "gradient-gold text-primary-foreground px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition shadow-lux",
						children: "Entrar"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "md:hidden p-2 text-foreground",
					onClick: () => setOpen((v) => !v),
					"aria-label": "Abrir menu",
					children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.X, { className: "w-6 h-6" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Menu, { className: "w-6 h-6" })
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "md:hidden border-t border-border bg-background/95 backdrop-blur-md",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4 py-4 flex flex-col gap-3",
				children: [links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: l.to,
					className: "py-2 text-foreground/90 hover:text-gold",
					activeProps: { className: "text-gold" },
					activeOptions: { exact: l.to === "/" },
					children: l.label
				}, l.to)), session ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/dashboard",
					className: "py-2 text-foreground/90 hover:text-gold",
					children: "Dashboard"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: handleLogout,
					className: "py-2 text-left text-foreground/60",
					children: "Sair"
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					className: "py-2 text-foreground/90 hover:text-gold",
					children: "Entrar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/cadastro",
					className: "py-2 text-gold",
					children: "Criar conta"
				})] })]
			})
		})]
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-border mt-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-8 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Crown, { className: "w-5 h-5 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-serif text-lg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gradient-gold font-bold",
								children: "Atlas"
							}),
							" ",
							"Voyages"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Experiências exclusivas para a Copa do Mundo 2026. Viaje como nunca antes."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-sm font-semibold text-gold mb-3",
						children: "Contato"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "contato@atlasvoyages.com"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "+55 11 99999-9999"
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-sm font-semibold text-gold mb-3",
						children: "Atlas Voyages"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Av. Paulista, 1000 — São Paulo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground/70 mt-4",
						children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" Atlas Voyages. Projeto fictício para portfólio."
						]
					})
				] })
			]
		})
	});
}
function WhatsAppButton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href: `https://wa.me/5511999999999?text=${encodeURIComponent("Olá! Tenho interesse nos pacotes da Copa 2026.")}`,
		target: "_blank",
		rel: "noopener noreferrer",
		"aria-label": "Falar no WhatsApp",
		className: "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1faa50] text-white flex items-center justify-center shadow-lux transition-transform hover:scale-110",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			viewBox: "0 0 24 24",
			fill: "currentColor",
			className: "w-7 h-7",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.15-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" })
		})
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router2 = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router2.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
const Route$7 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Atlas Voyages — Copa do Mundo 2026" },
			{
				name: "description",
				content: "Pacotes exclusivos para a Copa do Mundo 2026"
			},
			{
				property: "og:title",
				content: "Atlas Voyages — Copa do Mundo 2026"
			},
			{
				property: "og:description",
				content: "Pacotes exclusivos para a Copa do Mundo 2026"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@500;700;900&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$7.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "pt-16 min-h-screen",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppButton, {})
		]
	});
}
const $$splitComponentImporter$6 = () => import("./pacotes-CXqFciiJ.mjs");
const Route$6 = createFileRoute("/pacotes")({
	head: () => ({ meta: [{ title: "Pacotes · Atlas Voyages" }, {
		name: "description",
		content: "Pacotes high ticket para a Copa do Mundo 2026."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./login-Cvpn1agC.mjs");
const Route$5 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "Entrar · Atlas Voyages" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./destinos-C4OTnb8N.mjs");
const Route$4 = createFileRoute("/destinos")({
	head: () => ({ meta: [{ title: "Destinos · Atlas Voyages" }, {
		name: "description",
		content: "Cidades-sede da Copa 2026: Los Angeles, Miami e Cidade do México."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./dashboard-DU5lDgzd.mjs");
const Route$3 = createFileRoute("/dashboard")({
	head: () => ({ meta: [{ title: "Dashboard · Atlas Voyages" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./checkout-fCkfuVpJ.mjs");
const Route$2 = createFileRoute("/checkout")({
	validateSearch: (s) => ({ pkg: typeof s.pkg === "string" ? s.pkg : void 0 }),
	head: () => ({ meta: [{ title: "Checkout · Atlas Voyages" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./cadastro-AeAoNft4.mjs");
const Route$1 = createFileRoute("/cadastro")({
	head: () => ({ meta: [{ title: "Cadastro · Atlas Voyages" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-CJqpGupX.mjs");
const Route = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Atlas Voyages — Copa do Mundo 2026" },
		{
			name: "description",
			content: "Pacotes exclusivos high ticket para Los Angeles, Miami e Cidade do México na Copa 2026."
		},
		{
			property: "og:title",
			content: "Atlas Voyages — Copa 2026"
		},
		{
			property: "og:description",
			content: "Viva a Copa do Mundo 2026 em experiências de luxo."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
const PacotesRoute = Route$6.update({
	id: "/pacotes",
	path: "/pacotes",
	getParentRoute: () => Route$7
});
const LoginRoute = Route$5.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$7
});
const DestinosRoute = Route$4.update({
	id: "/destinos",
	path: "/destinos",
	getParentRoute: () => Route$7
});
const DashboardRoute = Route$3.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => Route$7
});
const CheckoutRoute = Route$2.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => Route$7
});
const CadastroRoute = Route$1.update({
	id: "/cadastro",
	path: "/cadastro",
	getParentRoute: () => Route$7
});
const rootRouteChildren = {
	IndexRoute: Route.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$7
	}),
	CadastroRoute,
	CheckoutRoute,
	DashboardRoute,
	DestinosRoute,
	LoginRoute,
	PacotesRoute
};
const routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
	__proto__: null,
	getRouter
}, Symbol.toStringTag, { value: "Module" }));
//#endregion
export { Route$2 as R, router as a, getSession as g, loginUser as l, registerUser as r };
