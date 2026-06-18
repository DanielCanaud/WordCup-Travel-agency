export type Destino = {
  id: string;
  cidade: string;
  pais: string;
  descricao: string;
  imagem: string;
  pontos: { nome: string; img: string }[];
};

export type Pacote = {
  id: string;
  nome: string;
  destinoId: string;
  cidade: string;
  noites: number;
  hotel: string;
  preco: number;
  inclui: string[];
  imagem: string;
};

export const destinos: Destino[] = [
  {
    id: "los-angeles",
    cidade: "Los Angeles",
    pais: "Estados Unidos",
    descricao:
      "A cidade dos sonhos californiana recebe alguns dos maiores jogos da Copa 2026. Praias douradas, Hollywood e o icônico SoFi Stadium aguardam você.",
    imagem:
      "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=1600&q=80&auto=format&fit=crop",
    pontos: [
      {
        nome: "Hollywood Sign",
        img: "https://images.unsplash.com/photo-1549417229-aa67d3263c09?w=600&q=80&auto=format&fit=crop",
      },
      {
        nome: "Santa Monica Pier",
        img: "https://images.unsplash.com/photo-1505245208761-ba872912fac0?w=600&q=80&auto=format&fit=crop",
      },
      {
        nome: "SoFi Stadium",
        img: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&q=80&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "miami",
    cidade: "Miami",
    pais: "Estados Unidos",
    descricao:
      "Sol, neon e arquitetura art déco. Miami combina o calor latino com a sofisticação americana em uma experiência inesquecível.",
    imagem:
      "https://images.unsplash.com/photo-1535498730771-e735b998cd64?w=1600&q=80&auto=format&fit=crop",
    pontos: [
      {
        nome: "South Beach",
        img: "https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?w=600&q=80&auto=format&fit=crop",
      },
      {
        nome: "Wynwood Walls",
        img: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=600&q=80&auto=format&fit=crop",
      },
      {
        nome: "Hard Rock Stadium",
        img: "https://images.unsplash.com/photo-1445307806294-bff7f67ff225?w=600&q=80&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "cidade-do-mexico",
    cidade: "Cidade do México",
    pais: "México",
    descricao:
      "Capital vibrante que abrirá a Copa 2026 no histórico Estádio Azteca. Cultura milenar, gastronomia premiada e energia única.",
    imagem:
      "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=1600&q=80&auto=format&fit=crop",
    pontos: [
      {
        nome: "Estádio Azteca",
        img: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?w=600&q=80&auto=format&fit=crop",
      },
      {
        nome: "Zócalo",
        img: "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?w=600&q=80&auto=format&fit=crop",
      },
      {
        nome: "Teotihuacán",
        img: "https://images.unsplash.com/photo-1580982327559-c1202864eb05?w=600&q=80&auto=format&fit=crop",
      },
    ],
  },
];

export const pacotes: Pacote[] = [
  {
    id: "pkg-la-essence",
    nome: "LA Essence",
    destinoId: "los-angeles",
    cidade: "Los Angeles",
    noites: 5,
    hotel: "The Beverly Hilton",
    preco: 18900,
    inclui: [
      "Voo executivo",
      "5 noites 5★",
      "Ingresso fase de grupos",
      "Transfer privativo",
    ],
    imagem:
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "pkg-mia-vip",
    nome: "Miami VIP",
    destinoId: "miami",
    cidade: "Miami",
    noites: 6,
    hotel: "Faena Hotel Miami Beach",
    preco: 24500,
    inclui: [
      "Voo first class",
      "6 noites suíte oceano",
      "Camarote Hard Rock",
      "City tour premium",
    ],
    imagem:
      "https://images.unsplash.com/photo-1535498730771-e735b998cd64?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "pkg-mex-opening",
    nome: "Mexico Opening",
    destinoId: "cidade-do-mexico",
    cidade: "Cidade do México",
    noites: 4,
    hotel: "Four Seasons CDMX",
    preco: 15700,
    inclui: [
      "Voo executivo",
      "4 noites 5★",
      "Jogo de abertura Azteca",
      "Tour Teotihuacán",
    ],
    imagem:
      "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=800&q=80&auto=format&fit=crop",
  },
];

export const fmtBRL = (n: number) =>
  n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
