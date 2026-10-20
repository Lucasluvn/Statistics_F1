import Header from "./components/Header";
import TeamNavChips from "./components/TeamNavChips";
import NavArrow from "./components/NavArrow";
import TeamCard from "./components/TeamCard";
import { teams} from "./data/teams";

//Importando o Usestate
import React,{useState} from 'react'


export default function App() {

// Logica das setas de mudança de cards

const [index,setIndex] = useState(0);
const currentTeam = teams[index]



const goPrevious = () => {setIndex(index === 0 ? 9: index - 1)}
const goNext = () => {setIndex(index === 9 ? 0: index +  1 )}
const goTo = (id) => {setIndex(teams.findIndex(t => t.id === id));}
return (
    <div className="min-h-screen w-full bg-carbon text-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-8 sm:py-12">
        <Header />

        <TeamNavChips activeId = {currentTeam.id} onChange = {goTo} />

        <div className="flex items-center gap-3 sm:gap-6">
          < NavArrow direction="prev" label="Previous Team" onClick = {goPrevious} />

          <div className="h-[460px] w-full sm:h-[420px]">
            <TeamCard team = {currentTeam} />
          </div>

          <NavArrow direction="next" label="Next Team" onClick = {goNext} />
        </div>

        {/* Indicadores (dots) */}
        <div className="flex justify-center gap-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === index ? "22px" : "8px",
                backgroundColor: i === index ? currentTeam.color : "#2A2D34"
                
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
