import { teams} from "../data/teams";

interface TeamNavChipsProps {
activeId: string
onChange: (id:string) => void
}

/**
 * Fileira de chips com as 10 equipes da temporada.
 * Puramente visual — nenhum onClick, nenhum estado de equipe "ativa" real.

 */
export default function TeamNavChips ({activeId,onChange })  {
  return (
    <nav aria-label="Season Teams" className="no-scrollbar flex gap-2 overflow-x-auto pb-2">
      {teams.map((team) => {
        const isActive = team.id === activeId;
        return (
          <button onClick={() => onChange(team.id)}
            key={team.id}
            className="flex shrink-0 items-center gap-2 rounded-full px-3 py-2 font-body text-sm font-medium tracking-wide transition-colors"
            style={{
              backgroundColor: isActive ? team.color : "#1E2025",
              color: isActive ? "#0B0C0E" : "#B7BAC1",
            }}
          >
            {/* Placeholder do logo da equipe — círculo com iniciais, não o logo oficial */}
            <span
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-bold"
              style={{
                backgroundColor: isActive ? "#0B0C0E" : team.color,
                color: isActive ? team.color : "#0B0C0E",
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
