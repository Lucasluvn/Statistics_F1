import { Car, TrendingUp } from "lucide-react";
import type { F1Team } from "../data/teams";

interface TeamCardProps {
  team: F1Team;
}

/**
 * Card central do carrossel: nome da equipe, imagem do carro (placeholder)
 * e estatísticas. Sem lógica — os dados vêm fixos via props, mesmo que
 * hoje só receba a equipe de exemplo.
 *
 * A imagem do carro é o ponto de entrada para a futura página de pilotos
 * (você vai adicionar a navegação depois — aqui só deixei o cursor e o
 * hover já preparados visualmente).
 */
export default function TeamCard({ team }: TeamCardProps) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-edge bg-surface">
      {/* Faixa lateral com a cor da equipe */}
      <div
        className="absolute left-0 top-0 h-full w-1.5 sm:w-2"
        style={{ backgroundColor: team.color }}
        aria-hidden="true"
      />

      <div className="flex flex-1 flex-col gap-6 p-6 pl-8 sm:p-10 sm:pl-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            {/* Placeholder do logo da equipe — não é o logo oficial, ver nota no README */}
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-dashed text-sm font-bold sm:h-14 sm:w-14"
              style={{ borderColor: team.color, color: team.color }}
              aria-label={`Logo da equipe ${team.name} (placeholder)`}
            >
              {team.name.slice(0, 2).toUpperCase()}
            </div>

            <div>
              <span className="mb-2 inline-block rounded-full border border-edge px-3 py-1 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                Temporada 2025 · Dados de exemplo
              </span>
              <h2 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                {team.fullName}
              </h2>
            </div>
          </div>

          {/* Métrica de desempenho — destaque em verde-água elétrico */}
          <div className="flex items-center gap-2 rounded-xl border border-electric-teal/30 bg-electric-teal/10 px-4 py-2">
            <TrendingUp size={16} className="text-electric-teal" />
            <span className="font-mono text-sm font-semibold text-electric-teal">
              P{team.position} · {team.points} pts
            </span>
          </div>
        </div>

        {/* Imagem do carro (placeholder — vira o link pra página de pilotos) */}
        <div
          role="button"
          tabIndex={0}
          className="flex h-56 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-edge bg-surface-alt text-ink-faint transition-colors hover:border-electric-teal hover:text-electric-teal sm:h-64"
        >
          <Car size={28} />
          <span className="font-body text-xs font-medium">
            Imagem do carro — clique para ver os pilotos
          </span>
        </div>
      </div>
    </div>
  );
}
