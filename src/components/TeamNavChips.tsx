import { teams} from "../data/teams";
import { useEffect,useRef } from "react";

interface TeamNavChipsProps {
activeId: string
onChange: (id:string) => void
}

/**
 * Fileira de chips com as 10 equipes da temporada.*/
export default function TeamNavChips ({activeId,onChange })  {
  /* uma ref pra guardar os botões*/
const chipsRefs = useRef<Record<string,HTMLButtonElement | null>>({});
/*  Criar o useEffect (o "efeito" do título") */

useEffect(() => {
  chipsRefs.current[activeId]?.scrollIntoView({
    behavior: "smooth",
    inline: "center",
    block: "nearest",
  });
}, [activeId]);

  return (
    <div className="relative">
    <nav aria-label="Season Teams" className="no-scrollbar flex gap-2 overflow-x-auto pb-2">
      {teams.map((team) => {
        const isActive = team.id === activeId;
        return (
          
          <button onClick={() => onChange(team.id)}
           ref={(el) => { chipsRefs.current[team.id] = el; }}
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

    </div>
  );
}



  

