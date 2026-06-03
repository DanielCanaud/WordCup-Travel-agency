# Atlas Voyages — Copa do Mundo 2026

Site institucional + e-commerce hoteleiro de uma agência de viagens fictícia focada na Copa do Mundo 2026 (Los Angeles, Miami e Cidade do México). Projeto de portfólio com visual luxuoso *high ticket*, totalmente responsivo e simulando uma experiência real (sem backend).

##  Features

- **Home** com hero rotativo entre as 3 cidades-sede
- **Destinos** com pontos turísticos de cada cidade
- **Pacotes** premium com detalhes e preço
- **Checkout** simulado (gera reserva no `localStorage`)
- **Autenticação** local (cadastro / login / logout) via `localStorage`
- **Dashboard** protegido com histórico de reservas do usuário logado
- **Menu hambúrguer** responsivo
- **Botão flutuante do WhatsApp**
- Imagens via **Unsplash** (URLs diretas, sem chave de API)
- Design dark com paleta dourada e tipografia Playfair Display + Inter

##  Stack

- **React 19 + TypeScript**
- **TanStack Start** (SSR + file-based routing — equivalente a Next.js)
- **Tailwind CSS v4**
- **Vite 7**
- **lucide-react** (ícones)


##  Como rodar

```bash
bun install      # ou npm install
bun dev          # ou npm run dev
```

Abra `http://localhost:8080`.

##  Estrutura

```
src/
├── components/        # Navbar, Footer, WhatsAppButton
├── lib/
│   ├── auth.ts        # cadastro/login via localStorage
│   └── data.ts        # destinos e pacotes
├── routes/            # file-based routing
│   ├── __root.tsx     # layout global
│   ├── index.tsx      # home (hero rotativo)
│   ├── destinos.tsx
│   ├── pacotes.tsx
│   ├── checkout.tsx
│   ├── login.tsx
│   ├── cadastro.tsx
│   └── dashboard.tsx
└── styles.css         # design system (tokens oklch)
```

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
