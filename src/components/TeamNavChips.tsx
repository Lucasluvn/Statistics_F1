import { teams, exampleTeam } from "../data/teams";

/**
 * Fileira de chips com as 10 equipes da temporada.
 * Puramente visual — nenhum onClick, nenhum estado de equipe "ativa" real.
 * O chip do exemplo (McLaren) está destacado só pra ilustrar o estado ativo.
 */
export default function TeamNavChips() {
  return (
    <nav aria-label="Equipes da temporada" className="no-scrollbar flex gap-2 overflow-x-auto pb-2">
      {teams.map((team) => {
        const isExampleActive = team.id === exampleTeam.id;
        return (
          <button
            key={team.id}
            className="flex shrink-0 items-center gap-2 rounded-full px-3 py-2 font-body text-sm font-medium tracking-wide transition-colors"
            style={{
              backgroundColor: isExampleActive ? team.color : "#1E2025",
              color: isExampleActive ? "#0B0C0E" : "#B7BAC1",
            }}
          >
            {/* Placeholder do logo da equipe — círculo com iniciais, não o logo oficial */}
            <span
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-bold"
              style={{
                backgroundColor: isExampleActive ? "#0B0C0E" : team.color,
                color: isExampleActive ? team.color : "#0B0C0E",
              }}
            >
              {team.name.slice(0, 1).toUpperCase()}
            </span>
            {team.name}
          </button>
        );
      })}
    </nav>
  );
}
