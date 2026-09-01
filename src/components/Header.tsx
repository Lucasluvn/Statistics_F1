import { Gauge } from "lucide-react";

/**
 * Cabeçalho: logo "F1 Statistics" à esquerda + título central.
 * Puramente visual — sem estado, sem lógica.
 */
export default function Header() {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="flex w-fit items-center gap-2 rounded-xl border border-racing-red px-4 py-2">
        <Gauge size={20} className="text-racing-red" />
        <span className="font-display text-lg font-bold tracking-wide">
          <span className="text-racing-red">F1</span>{" "}
          <span className="text-ink">STATISTICS</span>
        </span>
      </div>

      <h1 className="rounded-xl border border-edge px-6 py-2 text-center font-display text-base font-medium tracking-[0.08em] text-ink sm:flex-1 sm:text-lg">
        HUB DE ESTATÍSTICAS — TEMPORADA 2025
      </h1>
    </header>
  );
}
