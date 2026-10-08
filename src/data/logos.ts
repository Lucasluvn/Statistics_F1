// Importando os dados das imagnes do logo para o vite

import ferrariLogo from "../assests/logo_f1/scuderia-ferrari-logo-brandlogos.net_mudh9xgcl.svg"
import alpineLogo from "../assests/logo_f1/alpine-f1-team-logo.svg"
import astonMartinLogo from "../assests/logo_f1/Aston_Martin_Aramco_Formula1_logo.svg"
import mclarenLogo from "../assests/logo_f1/McLaren_Formula_1_logo.svg"
import mercedesLogo from "../assests/logo_f1/Mercedes-AMG_Petronas_Logo.svg"
import redBullLogo from "../assests/logo_f1/Red_Bull_Racinglogo.svg"

/* import HassLogo from "../assestes/logo_f1"
   import WilliamsLogo from "../assestes/logo_f1"
   import KickSauberLogo from "../assestes/logo_f1"*/

// criando o "dicionario" para o teamcard.ts saber qual imagem mostrar quando selecionado

export const teamLogos = {
  ferrari: ferrariLogo,
  alpine: alpineLogo,
  "aston-martin": astonMartinLogo,
  mclaren: mclarenLogo,
  mercedes: mercedesLogo,
  "red-bull": redBullLogo,

}