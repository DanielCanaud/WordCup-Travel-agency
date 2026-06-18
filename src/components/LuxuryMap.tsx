import { useEffect, useState, useRef, useCallback } from "react";
import { MapPin, Plane, Trophy, Sparkles, Building, Calendar, ArrowRight, Play, X } from "lucide-react";
import { Link } from "@tanstack/react-router";

// Dynamically check if window is available for Leaflet SSR safety
const isServer = typeof window === "undefined";

interface CityData {
  id: string;
  name: string;
  country: string;
  stadium: string;
  matches: string;
  highlight: string;
  latLng: [number, number]; // Real street map coordinates
  hotel: string;
  previewImg: string;
  videoUrl: string; // Dynamic conversion teaser video
}

const cities: CityData[] = [
  {
    id: "los-angeles",
    name: "Los Angeles",
    country: "Estados Unidos",
    stadium: "SoFi Stadium",
    matches: "Fase de Grupos & Quartas de Final",
    highlight: "Acesso total a camarotes VIP da ala oeste e hospedagem no Beverly Hilton.",
    latLng: [33.9534, -118.3390], // SoFi Stadium location
    hotel: "The Beverly Hilton",
    previewImg: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&q=80&auto=format&fit=crop",
    videoUrl: "/videos/LA.mp4"
  },
  {
    id: "miami",
    name: "Miami",
    country: "Estados Unidos",
    stadium: "Hard Rock Stadium",
    matches: "Fase de Grupos & Decisão do 3º Lugar",
    highlight: "Cabines exclusivas à beira-mar e assentos na linha de campo VIP.",
    latLng: [25.9580, -80.2389], // Hard Rock Stadium location
    hotel: "Faena Hotel Miami Beach",
    previewImg: "https://images.unsplash.com/photo-1535498730771-e735b998cd64?w=400&q=80&auto=format&fit=crop",
    videoUrl: "" // Miami has no video as requested
  },
  {
    id: "cidade-do-mexico",
    name: "Cidade do México",
    country: "México",
    stadium: "Estádio Azteca",
    matches: "Grande Jogo de Abertura Histórica da Copa 2026",
    highlight: "Assentos na Tribuna de Honra oficial e jantares premiados Michelin.",
    latLng: [19.3030, -99.1505], // Estadio Azteca location
    hotel: "Four Seasons CDMX",
    previewImg: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?w=400&q=80&auto=format&fit=crop",
    videoUrl: "/videos/mexico.mp4"
  },
];

export function LuxuryMap() {
  const [activeCity, setActiveCity] = useState<CityData>(cities[2]); // Default: Mexico
  const [videoState, setVideoState] = useState<{ isOpen: boolean; url: string; title: string; poster?: string }>({
    isOpen: false,
    url: "",
    title: "",
    poster: undefined
  });
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const LRef = useRef<any>(null);
  const [mapCreated, setMapCreated] = useState(false);
  const [tilesLoaded, setTilesLoaded] = useState(false);

  const closeVideo = useCallback(() => {
    setVideoState((s) => ({ ...s, isOpen: false }));
  }, []);

  // Fecha o modal com Esc e trava o scroll do body enquanto aberto
  useEffect(() => {
    if (!videoState.isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeVideo();
    };
    document.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [videoState.isOpen, closeVideo]);

  // 1) Cria o mapa UMA vez e o destrói corretamente no unmount (evita o leak
  //    e o erro "Map container is already initialized" em hot-reload/navegação)
  useEffect(() => {
    if (isServer) return;
    let cancelled = false;

    const initMap = async () => {
      if (!document.getElementById("leaflet-css")) {
        const link = document.createElement("link");
        link.id = "leaflet-css";
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }

      const L = await import("leaflet");
      if (cancelled || mapRef.current) return;
      LRef.current = L;

      const isMobile = L.Browser.mobile;
      const map = L.map("real-street-luxury-map", {
        center: cities[2].latLng,
        zoom: 13,
        zoomControl: false,
        scrollWheelZoom: false, // não sequestra o scroll da página (desktop)
        dragging: !isMobile, // no mobile, libera o scroll vertical da página
        touchZoom: !isMobile,
        attributionControl: true, // atribuição OSM/CARTO exigida por licença
      });
      mapRef.current = map;

      const tiles = L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        subdomains: "abcd",
        maxZoom: 20,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }).addTo(map);

      L.control.zoom({ position: "bottomright" }).addTo(map);

      tiles.on("load", () => !cancelled && setTilesLoaded(true));
      // fallback: garante que o overlay some mesmo se 'load' não disparar
      setTimeout(() => !cancelled && setTilesLoaded(true), 2000);
      setMapCreated(true);
    };

    initMap();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      markersRef.current = [];
      setMapCreated(false);
    };
  }, []);

  // 2) Atualiza o marker e voa suavemente para a cidade ativa
  useEffect(() => {
    const L = LRef.current;
    const map = mapRef.current;
    if (!L || !map || !mapCreated) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const luxuryIcon = L.divIcon({
      className: "luxury-leaflet-marker",
      html: `
        <div style="position: relative; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
          <span style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background-color: var(--gold); opacity: 0.25; transform: scale(1.8); animation: ping 1.5s infinite ease-in-out;"></span>
          <div style="width: 12px; height: 12px; border-radius: 50%; background-color: var(--gold); border: 2px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.5);"></div>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

    const marker = L.marker(activeCity.latLng, { icon: luxuryIcon })
      .addTo(map)
      .bindTooltip(
        `<b style="font-family: sans-serif; padding: 2px 4px; color: var(--gold); font-size: 11px;">${activeCity.stadium}</b>`,
        { permanent: true, direction: "top", className: "bg-black text-gold border-gold rounded p-1 shadow-xl", offset: [0, -10] },
      );

    markersRef.current.push(marker);
    map.flyTo(activeCity.latLng, 14, { duration: 1.2 });
  }, [activeCity, mapCreated]);

  // Troca de cidade — o reposicionamento é tratado pelo efeito acima
  const handleCityChange = (city: CityData) => setActiveCity(city);

  return (
    <div className="w-full bg-card rounded-3xl border border-border overflow-hidden p-4 md:p-8 relative transition-all duration-500 hover:border-gold/20 shadow-xl space-y-6">
      
      {/* GLOBAL HIGH-CONVERSION CINEMATIC BANNER */}
      <button
        type="button"
        aria-label="Assistir ao trailer geral da Copa 2026"
        onClick={() => setVideoState({ isOpen: true, url: "/videos/geral.mp4", title: "América do Norte 2026", poster: cities[0].previewImg })}
        className="w-full text-left bg-gradient-to-r from-zinc-950 via-zinc-900 to-black border border-gold/30 hover:border-gold/60 focus-visible:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 p-4 md:p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 cursor-pointer group/global relative overflow-hidden transition-all duration-300 shadow-lg"
      >
        <div className="absolute -inset-y-0 -inset-x-40 bg-gradient-to-r from-transparent via-gold/5 to-transparent skew-x-12 translate-x-[-100%] group-hover/global:animate-shine duration-1000" />
        
        <div className="flex items-center gap-4 z-10 text-center md:text-left flex-col md:flex-row">
          <div className="w-12 h-12 rounded-full bg-gold text-primary-foreground flex items-center justify-center shadow-lux group-hover/global:scale-110 transition-transform duration-300 shrink-0">
            <Play className="w-5 h-5 fill-primary-foreground ml-0.5 animate-pulse" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-[0.2em] text-gold uppercase bg-gold/10 border border-gold/20 px-2.5 py-0.5 rounded-full inline-block font-bold">
              Teaser Oficial Exclusivo
            </span>
            <h3 className="text-lg md:text-xl font-bold text-foreground tracking-tight group-hover/global:text-gold transition-colors">
              Uma Jornada Lendária: Miami, Los Angeles & México
            </h3>
            <p className="text-xs text-muted-foreground max-w-2xl">
              Sinta a atmosfera pulsante dos três maiores palcos da Copa do Mundo de 2026 em um único filme cinematográfico ultra-premium. Inspire-se antes de reservar.
            </p>
          </div>
        </div>

        <div className="z-10 bg-gold/10 border border-gold/30 group-hover/global:bg-gold group-hover/global:text-primary-foreground text-gold text-xs font-bold px-5 py-2.5 rounded-full transition-all shrink-0 uppercase tracking-wider shadow-md">
          Assistir Trailer Geral 🎥
        </div>
      </button>

      <div className="grid lg:grid-cols-12 gap-8 items-stretch">
        
        {/* REAL STREET MAP WRAPPER PANEL */}
        <div className="lg:col-span-7 rounded-2xl relative overflow-hidden flex flex-col justify-between p-4 min-h-[380px] md:min-h-[480px] select-none">
          
          {/* Header Dashboard Controls */}
          <div className="z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-3 relative">
            <span className="text-[10px] font-mono tracking-[0.3em] text-gold uppercase bg-black/80 border border-border px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-md shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" /> Localização
            </span>
            <div className="flex gap-1.5 bg-black/85 p-1 rounded-full border border-border backdrop-blur-md self-end sm:self-auto shadow-2xl">
              {cities.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleCityChange(c)}
                  className={`text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full transition-all ${activeCity.id === c.id ? "bg-gold text-primary-foreground shadow-lux" : "text-foreground/70 hover:text-foreground"}`}
                >
                  {c.id === "cidade-do-mexico" ? "MÉXICO" : c.name.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Leaflet Raw Mount DOM Node */}
          <div
            id="real-street-luxury-map"
            role="application"
            aria-label={`Mapa de ${activeCity.name} — ${activeCity.stadium}`}
            className="absolute inset-0 z-10 bg-background/20 rounded-xl"
            style={{ filter: "contrast(1.08) brightness(0.95)" }}
          />

          {/* Loading overlay enquanto os tiles carregam */}
          {!tilesLoaded && (
            <div className="absolute inset-0 z-[15] flex flex-col items-center justify-center gap-3 bg-background/70 backdrop-blur-sm rounded-xl animate-fade-in">
              <div className="w-8 h-8 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold">Carregando mapa</span>
            </div>
          )}

          {/* Bottom Specifications Ribbon */}
          <div className="z-20 w-fit max-w-[calc(100%-60px)] bg-black/90 border border-border/80 p-3 rounded-xl flex items-center gap-2.5 text-xs backdrop-blur-md shadow-2xl relative">
            <div className="w-2 h-2 rounded-full bg-gold animate-pulse shrink-0" />
            <span className="font-bold text-foreground">{activeCity.name}</span>
            <span className="text-border">·</span>
            <span className="text-muted-foreground font-medium truncate">{activeCity.stadium}</span>
          </div>
        </div>

        {/* PREMIUM RICH SPECIFICATION SIDE PANEL */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6 lg:p-2">
          
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold flex items-center gap-1.5">
                <MapPin className="w-4 h-4" /> {activeCity.country}
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest bg-gold/10 text-gold px-2.5 py-1 rounded-full border border-gold/20 font-bold animate-pulse">
                • Experiência Viva
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                {activeCity.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {activeCity.highlight}
              </p>
            </div>

            {/* Stadium Details with Immersive Video Play CTA Trigger */}
            <button
              type="button"
              disabled={!activeCity.videoUrl}
              aria-label={activeCity.videoUrl ? `Assistir vídeo do ${activeCity.stadium}` : `${activeCity.stadium} — vídeo em breve`}
              onClick={() => activeCity.videoUrl && setVideoState({ isOpen: true, url: activeCity.videoUrl, title: activeCity.name, poster: activeCity.previewImg })}
              className={`w-full text-left p-4 bg-gradient-to-r from-background/80 to-background/40 border border-border rounded-2xl flex gap-4 items-center group/stadium transition-all duration-300 shadow-md relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 ${activeCity.videoUrl ? 'hover:border-gold/40 cursor-pointer' : 'opacity-80 cursor-default'}`}
            >
              {activeCity.videoUrl ? (
                <div className="absolute top-0 right-0 p-1 bg-gold/10 rounded-bl-xl border-l border-b border-gold/20 opacity-0 group-hover/stadium:opacity-100 transition-opacity duration-300">
                  <span className="text-[9px] text-gold font-mono uppercase px-1 font-bold">Aventurar-se 🎥</span>
                </div>
              ) : (
                <div className="absolute top-0 right-0 p-1 bg-muted/30 rounded-bl-xl border-l border-b border-border">
                  <span className="text-[9px] text-muted-foreground font-mono uppercase px-1 font-bold">Vídeo em breve</span>
                </div>
              )}
              
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-border bg-card shrink-0 relative flex items-center justify-center">
                <img
                  src={activeCity.previewImg}
                  alt={activeCity.stadium}
                  className={`w-full h-full object-cover transition-transform duration-500 ${activeCity.videoUrl ? 'group-hover/stadium:scale-110 brightness-75' : 'brightness-90'}`}
                />
                {activeCity.videoUrl && (
                  <div className="absolute inset-0 bg-black/30 group-hover/stadium:bg-black/10 transition-all flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-gold/90 text-primary-foreground flex items-center justify-center shadow-lux group-hover/stadium:scale-110 transition-transform duration-300">
                      <Play className="w-4 h-4 fill-primary-foreground ml-0.5" />
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-0.5 z-10">
                <span className="text-[10px] text-gold uppercase tracking-wider font-bold flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-gold animate-bounce" /> {activeCity.videoUrl ? 'Assista à Experiência Viva' : 'Arena Oficial FIFA'}
                </span>
                <h4 className={`font-bold text-foreground text-base transition-colors ${activeCity.videoUrl ? 'group-hover/stadium:text-gold' : ''}`}>{activeCity.stadium}</h4>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-gold" /> {activeCity.matches}
                </p>
              </div>
            </button>

            {/* Hotel Details */}
            <div className="p-4 bg-background/60 border border-border rounded-2xl flex gap-4 items-center">
              <div className="w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center text-gold shrink-0">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Hospedagem Sede</span>
                <h4 className="font-bold text-foreground text-sm mt-0.5">{activeCity.hotel}</h4>
                <p className="text-xs text-gold font-medium">Diamond Premium Executive Class</p>
              </div>
            </div>
          </div>

          {/* Action Buttons with High-Converting Glow */}
          <div className="pt-4 grid sm:grid-cols-2 gap-3">
            <Link
              to="/pacotes"
              className="gradient-gold text-primary-foreground text-center font-bold px-6 py-3.5 rounded-full text-sm shadow-lux hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group/btn relative overflow-hidden before:absolute before:inset-0 before:bg-white/10 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
            >
              <span>Garantir Meu Lugar</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
            <Link
              to="/destinos"
              className="border border-border text-center hover:border-gold/40 hover:bg-gold/5 font-semibold px-6 py-3.5 rounded-full text-sm transition-all flex items-center justify-center gap-1.5"
            >
              <Plane className="w-4 h-4 text-gold" />
              <span>Explorar Guia</span>
            </Link>
          </div>

        </div>
      </div>

      {/* CINEMATIC EXPERIENTIAL VIDEO MODAL (HIGH CONVERSION GATILHO) */}
      {videoState.isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Vídeo: ${videoState.title}`}
          onClick={closeVideo}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-zinc-950 border border-gold/30 rounded-2xl overflow-hidden shadow-2xl shadow-gold/10"
          >

            {/* Top Bar Info */}
            <div className="p-4 bg-zinc-900/80 border-b border-border/60 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold animate-spin-slow" />
                <span className="font-mono text-gold uppercase tracking-widest font-bold">Experiência Copa 2026 — {videoState.title}</span>
              </div>
              <button
                onClick={closeVideo}
                aria-label="Fechar vídeo"
                className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-gold/20 hover:text-gold text-foreground transition-all flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Premium Video Container */}
            <div className="relative aspect-video w-full bg-black">
              <video
                src={videoState.url}
                poster={videoState.poster}
                autoPlay
                controls
                loop
                className="w-full h-full object-cover"
                style={{ filter: "contrast(1.05) brightness(1.02)" }}
              />
              
              {/* Floating conversion action ribbon inside the experience */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/80 border border-gold/20 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3 animate-slide-up">
                <div className="text-center sm:text-left">
                  <p className="text-white font-bold text-sm">Viva o extraordinário em {videoState.title}</p>
                  <p className="text-[11px] text-gold font-medium">Restam poucas vagas exclusivas com serviços de concierge Diamond.</p>
                </div>
                <Link
                  to="/pacotes"
                  onClick={closeVideo}
                  className="w-full sm:w-auto gradient-gold text-primary-foreground font-bold px-5 py-2.5 rounded-full text-xs transition-all hover:scale-105 shadow-lux text-center"
                >
                  Reservar Pacote VIP
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

