import Header from "./components/Header";
import TeamNavChips from "./components/TeamNavChips";
import NavArrow from "./components/NavArrow";
import TeamCard from "./components/TeamCard";
import { exampleTeam } from "./data/teams";

/**
 * Página raiz — só compõe os componentes, sem estado nem lógica.
 * O carrossel está "congelado" na equipe de exemplo (McLaren);
 * a troca de card, o clique nas setas e nos chips ficam por sua conta.
 */
export default function App() {
  return (
    <div className="min-h-screen w-full bg-carbon text-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-8 sm:py-12">
        <Header />

        <TeamNavChips />

        <div className="flex items-center gap-3 sm:gap-6">
          <NavArrow direction="prev" label="Equipe anterior" />

          <div className="h-[460px] w-full sm:h-[420px]">
            <TeamCard team={exampleTeam} />
          </div>

          <NavArrow direction="next" label="Próxima equipe" />
        </div>

        {/* Indicadores (dots) */}
        <div className="flex justify-center gap-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === 3 ? "22px" : "8px",
                backgroundColor: i === 3 ? exampleTeam.color : "#2A2D34",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
