import { Link, useParams } from "react-router-dom";
import { teams } from "../data/teams";

interface Stat {
  label: string;
  value: string;
}

interface Driver {
  id: string;
  name: string;
  number: number;
  photo?: string;
  summary: Stat[];
  stats: Stat[];
}

const driversByTeam: Record<string, Driver[]> = {
  ferrari: [
    {
      id: "piloto-1",
      name: "Piloto 1",
      number: 16,
      summary: [
        { label: "Posição", value: "3º" },
        { label: "Pontos", value: "245" },
      ],
      stats: [
        { label: "Vitórias", value: "2" },
        { label: "Pódios", value: "8" },
        { label: "Poles", value: "3" },
      ],
    },
    {
      id: "piloto-2",
      name: "Piloto 2",
      number: 44,
      summary: [
        { label: "Posição", value: "5º" },
        { label: "Pontos", value: "198" },
      ],
      stats: [
        { label: "Vitórias", value: "1" },
        { label: "Pódios", value: "6" },
        { label: "Poles", value: "1" },
      ],
    },
  ],
};

function DriverCard({ driver, color }: { driver: Driver; color: string }) {
  return (
    <article className="flex flex-col gap-4">
      <div
        className="flex items-center justify-between rounded-2xl bg-[#1E2025] px-5 py-4"
        style={{ borderLeft: `4px solid ${color}` }}
      >
        <div>
          <h2 className="font-body text-lg font-semibold text-white">{driver.name}</h2>
          <p className="font-body text-sm text-[#B7BAC1]">#{driver.number}</p>
        </div>
        <div className="flex gap-6">
          {driver.summary.map((item) => (
            <div key={item.label} className="text-right">
              <p className="font-body text-xl font-bold text-white">{item.value}</p>
              <p className="font-body text-xs text-[#B7BAC1]">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div
        className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-[#1E2025]"
        style={{ boxShadow: `inset 0 -6px 0 ${color}` }}
      >
        {driver.photo ? (
          <img src={driver.photo} alt={`Foto de ${driver.name}`} className="h-full w-full object-cover" />
        ) : (
          <span className="font-body text-6xl font-bold" style={{ color }} aria-hidden="true">
            {driver.name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>

      <dl className="divide-y divide-[#2A2D33] rounded-2xl bg-[#1E2025] px-5">
        {driver.stats.map((item) => (
          <div key={item.label} className="flex justify-between py-3">
            <dt className="font-body text-sm text-[#B7BAC1]">{item.label}</dt>
            <dd className="font-body text-sm font-semibold text-white">{item.value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

export default function TeamPage() {
  const { teamId } = useParams<{ teamId: string }>();
  const team = teams.find((t) => t.id === teamId);

  if (!team) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-carbon px-6 text-center">
        <h1 className="font-body text-4xl font-bold text-white">404</h1>
        <p className="font-body text-[#B7BAC1]">Não encontramos essa equipe.</p>
        <Link
          to="/"
          className="rounded-full bg-[#1E2025] px-4 py-2 font-body text-sm font-medium text-white transition-colors hover:bg-[#2A2D33]"
        >
          Voltar para a página inicial
        </Link>
      </main>
    );
  }

  const drivers = driversByTeam[team.id] ?? [];

  return (
    <main className="min-h-screen bg-carbon px-6 py-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex items-center justify-between gap-4">
          <Link
            to="/"
            aria-label="Voltar para a página inicial"
            className="rounded-md bg-[#E10600] px-3 py-1.5 font-body text-lg font-extrabold italic text-white"
          >
            F1
          </Link>
          <h1 className="font-body text-xl font-semibold text-white sm:text-2xl">
            {team.name}
            <span className="ml-2 font-normal text-[#B7BAC1]">· Estatísticas dos pilotos</span>
          </h1>
          <span className="w-12" aria-hidden="true" />
        </header>

        {drivers.length === 0 ? (
          <p className="font-body text-[#B7BAC1]">Ainda não há pilotos cadastrados para esta equipe.</p>
        ) : (
          <section className="grid gap-8 md:grid-cols-2">
            {drivers.map((driver) => (
              <DriverCard key={driver.id} driver={driver} color={team.color} />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

