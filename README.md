# Atlas Voyages — Copa do Mundo 2026

Site institucional + e-commerce hoteleiro de uma agência de viagens fictícia focada na Copa do Mundo 2026 (Los Angeles, Miami e Cidade do México). Projeto de portfólio com visual luxuoso *high ticket*, totalmente responsivo e simulando uma experiência real (sem backend).

##  Features

- **Home** com hero cinematográfico (estádio) e seções de valores, mapa e pacotes em destaque
- **Mapa interativo de luxo** (`LuxuryMap`) com **Leaflet** + tiles dark da CartoDB, coordenadas reais dos estádios, troca de cidade com voo suave (`flyTo`) e **modais de vídeo** por cidade
- **Chatbot flutuante** (`ChatWidget`, ícone de bola de futebol ⚽) que responde sobre **preços, reservas e pacotes** e encaminha para o **WhatsApp** com mensagem pré-preenchida
- **Destinos** com pontos turísticos de cada cidade
- **Pacotes** premium com detalhes e preço
- **Checkout** simulado (gera reserva no `localStorage`)
- **Autenticação** local (cadastro / login / logout) via `localStorage`
- **Dashboard** protegido com histórico de reservas do usuário logado
- **Menu hambúrguer** responsivo
- **Acessibilidade**: foco visível, `aria-label`s, modais que fecham com `Esc`/clique fora e suporte a `prefers-reduced-motion`
- Imagens via **Unsplash** (URLs diretas, sem chave de API)
- Design dark com paleta dourada e tipografia Playfair Display + Inter

##  Stack

- **React 19 + TypeScript**
- **TanStack Start** (SSR + file-based routing — equivalente a Next.js)
- **Tailwind CSS v4**
- **Vite 7**
- **Leaflet** (mapa interativo, carregado sob demanda)
- **lucide-react** (ícones)


##  Como rodar

```bash
bun install      # ou npm install
bun dev          # ou npm run dev
```

Abra `http://localhost:5173`.

##  Estrutura

```
public/
└── videos/            # vídeos dos modais do mapa (geral, LA, mexico)
src/
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ChatWidget.tsx   # chatbot flutuante (⚽) + CTA WhatsApp
│   ├── LuxuryMap.tsx    # mapa interativo (Leaflet) + modais de vídeo
│   └── ui/PackageCard.tsx
├── lib/
│   ├── auth.ts        # cadastro/login via localStorage
│   └── data.ts        # destinos e pacotes
├── routes/            # file-based routing
│   ├── __root.tsx     # layout global (monta o ChatWidget)
│   ├── index.tsx      # home (hero + mapa + pacotes)
│   ├── destinos.tsx
│   ├── pacotes.tsx
│   ├── checkout.tsx
│   ├── login.tsx
│   ├── cadastro.tsx
│   └── dashboard.tsx
└── styles.css         # design system (tokens oklch)
```

> **Configuração do WhatsApp:** o número de contato fica em `WHATSAPP_NUMBER`,
> no topo de `src/components/ChatWidget.tsx` (formato internacional, só dígitos —
> ex.: `5511987654321`).

##  Persistência

Tudo é salvo no `localStorage` do navegador:

| Chave | Conteúdo |
|---|---|
| `wcv_users` | usuários cadastrados |
| `wcv_session` | sessão ativa |
| `wcv_reservas` | reservas feitas no checkout |

## 📸 Imagens

- **Cidades / pontos turísticos**: URLs diretas do Unsplash (`images.unsplash.com`) — sem chave de API.
- Para trocar, basta editar `src/lib/data.ts`.

## 📄 Licença

Projeto fictício para fins educacionais e de portfólio.
