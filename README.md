# 🏎️ F1 Statistics Dashboard

Uma aplicação web moderna e interativa desenvolvida para explorar estatísticas detalhadas de equipes e pilotos da Fórmula 1. O projeto consome dados oficiais em tempo real através da **Jolpica F1 API**, oferecendo aos entusiastas do automobilismo uma experiência imersiva e precisa sobre a categoria.

---

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes tecnologias e ferramentas:

- **React:** Biblioteca JavaScript para construção da interface de usuário com componentes reutilizáveis.
- **TypeScript:** Utilização de tipagem estática para garantir maior robustez, clareza e qualidade no desenvolvimento.
- **Vite:** Ferramenta de build moderna e de altíssima performance para o ambiente de desenvolvimento front-end.
- **Tailwind CSS:** Framework CSS utilitário para estilização rápida, moderna e totalmente responsiva.
- **React Router DOM:** Gerenciamento de rotas e navegação dinâmica entre páginas (como o roteamento detalhado por equipe e pilotos).
- **Jolpica F1 API:** Integração com dados oficiais e históricos da Fórmula 1 via requisições assíncronas.
- **Git & GitHub:** Controle de versão e gerenciamento do código-fonte.

---

## 📝 Funcionalidades

A aplicação oferece os seguintes recursos:

- **Dados Reais e Atualizados:** Consumo dinâmico de informações de construtores, pilotos e temporadas diretamente da Jolpica F1 API.
- **Carrossel de Equipes:** Navegação interativa pelas principais equipes da Fórmula 1 com identidade visual dedicada.
- **Página de Detalhes Dinâmica:** Uso de rotas dinâmicas (`/times/:teamId`) para carregar informações específicas de cada construtor.
- **Estatísticas de Pilotos:** Cards dedicados exibindo posições, pontos, vitórias, pódios e poles obtidos nas etapas reais.
- **Design Responsivo:** Layout otimizado tanto para dispositivos móveis quanto para telas grandes, com tema escuro inspirado no visual moderno da categoria.

---

## 📚 Estrutura de Dados
- **Equipes:** Dados consumidos via API referentes aos construtores, posições no campeonato, pontuações e estatísticas oficiais.
- **Pilotos:** Informações de perfil, números, pontuações e métricas de desempenho extraídas dos grids reais da temporada.

---

## 🛠️ Configuração e Execução

Pré-requisitos:
- Node.js versão 16 ou superior instalado na máquina.
- npm ou yarn como gerenciador de pacotes.

Instalação:

1. Clone o repositório:
   ```bash
   git clone [https://github.com/Lucasluvn/Statistics_F1.git](https://github.com/Lucasluvn/Statistics_F1.git)

2. Acesse a pasta do projeto:

Bash
cd Statistics_F1

3. Instale as dependências:

Bash
npm install

4.Rodando a aplicação:

Ambiente de desenvolvimento:

Bash
npm run dev

5. Abra o navegador no endereço fornecido pelo Vite (geralmente http://localhost:5173)

## 📂 Estrutura do Projeto
Plaintext
Statistics_F1/
├── src/
│   ├── components/      # Componentes visuais reutilizáveis (Header, Cards, Nav, etc.)
│   ├── services/        # Configuração de requisições e integração com a Jolpica F1 API
│   ├── pages/           # Páginas principais da aplicação (Home e Estatísticas dos Pilotos)
│   ├── App.tsx          # Configuração principal de rotas e estrutura do app
│   └── main.tsx         # Ponto de entrada da aplicação React
├── package.json         # Dependências e scripts do projeto
└── tailwind.config.ts   # Configurações de estilização do Tailwind

## 👩‍💻 Contribuição
Este é um projeto de portfólio de código aberto. Sinta-se à vontade para contribuir com melhorias, correções de bugs ou novas funcionalidades! Para contribuir, siga os passos abaixo:

Faça o fork do repositório.

Crie uma branch para sua alteração (git checkout -b feature/nome-da-feature).

Realize suas modificações e faça um commit (git commit -m 'Adicionar nova feature').

Envie para o repositório remoto (git push origin feature/nome-da-feature).

Abra um Pull Request explicando suas mudanças.

## 📬 Contato
Para dúvidas ou sugestões, entre em contato com o desenvolvedor principal do projeto:

Email: animaalucas@gmail.com

GitHub: www.github.com/Lucasluvn
