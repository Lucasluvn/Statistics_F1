import {teamLogos} from "../data/logos"

export interface F1Team {
  id: string;
  name: string;
  fullName: string;
  color: string;
  position: number;
  points: number;
}

export const teams: F1Team[] = [
   { id: "mclaren", name: "McLaren", fullName: "McLaren F1 Team", color: "#FF8000", position: 1, points: 714 },
  
   { id: "ferrari", name: "Ferrari", fullName: "Scuderia Ferrari HP", color: "#DC0000", position: 2, points: 652 },

   { id: "red-bull", name: "Red Bull", fullName: "Oracle Red Bull Racing", color: "#1E3A8A", position: 3, points: 589 },
  
   { id: "mercedes", name: "Mercedes", fullName: "Mercedes-AMG Petronas F1", color: "#00A19C", position: 4, points: 468 },

   { id: "haas", name: "Haas", fullName: "MoneyGram Haas F1 Team", color: "#B6BABD", position: 5, points: 58 },
 
  { id: "aston-martin", name: "Aston Martin", fullName: "Aston Martin Aramco F1", color: "#229971", position: 6, points: 94 },

   { id: "williams", name: "Williams", fullName: "Williams Racing", color: "#64C4FF", position: 7, points: 111 },
  
  { id: "alpine", name: "Alpine", fullName: "BWT Alpine F1 Team", color: "#2293D1", position: 8, points: 65 },
  
  { id: "rb", name: "RB", fullName: "Visa Cash App RB", color: "#6C98FF", position: 9, points: 78 },
  
  { id: "sauber", name: "Kick Sauber", fullName: "Stake F1 Team Kick Sauber", color: "#52E252", position: 10, points: 55 },
  
];

export const exampleTeam = teams[0];
