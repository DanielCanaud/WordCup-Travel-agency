import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tanstackStart({
      server: { entry: "server" },
    }),
    // Nitro detecta a Vercel automaticamente no build e gera o .vercel/output
    // (Build Output API) — habilita o SSR do TanStack Start na Vercel.
    nitro(),
    react(),
    tailwindcss(),
    tsConfigPaths(),
  ],
});
