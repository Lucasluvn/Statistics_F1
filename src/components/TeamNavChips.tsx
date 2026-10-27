import { teams} from "../data/teams";

interface TeamNavChipsProps {
activeId: string
onChange: (id:string) => void
}

/**
 * Fileira de chips com as 10 equipes da temporada.*/
export default function TeamNavChips ({activeId,onChange })  {
  return (
    <div className="relative">
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
            {/* Placeholder do logo da equipe — círculo com iniciais*/}
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
{/* div com o gradient no carrosel com o nome das equipes */}
    <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-carbon to-transparent z-10"></div>
    <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-carbon to-transparent z-10"></div>
    </div>
  );
}
