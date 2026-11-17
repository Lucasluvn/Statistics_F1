import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { teams } from "../data/teams";
import { getDriversByTeam, type DriverStats } from "../api/jolpica";

interface Stat {
  label: string;
  value: string;
}

function DriverPhoto({ driver, color }: { driver: DriverStats; color: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-[#1E2025]"
      style={{ boxShadow: `inset 0 -6px 0 ${color}` }}
    >
      {driver.photo && !failed ? (
        <img
          src={driver.photo}
          alt={`Foto de ${driver.name}`}
          className="h-full w-full object-cover object-top"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="font-body text-6xl font-bold" style={{ color }} aria-hidden="true">
          {driver.code || driver.name.slice(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  );
}

function DriverCard({ driver, color }: { driver: DriverStats; color: string }) {
  const summary: Stat[] = [
    { label: "Posição", value: `${driver.position}º` },
    { label: "Pontos", value: driver.points },
  ];

  const stats: Stat[] = [
    { label: "Vitórias", value: driver.wins },
    { label: "Pódios", value: String(driver.podiums) },
    { label: "Poles", value: String(driver.poles) },
  ];

  return (
    <article className="flex flex-col gap-4">
      <div
        className="flex items-center justify-between rounded-2xl bg-[#1E2025] px-5 py-4"
        style={{ borderLeft: `4px solid ${color}` }}
      >
        <div>
          <h2 className="font-body text-lg font-semibold text-white">{driver.name}</h2>
          <p className="font-body text-sm text-[#B7BAC1]">
            #{driver.number || "—"}
            {driver.code ? ` · ${driver.code}` : ""}
            {driver.nationality ? ` · ${driver.nationality}` : ""}
          </p>
        </div>
        <div className="flex gap-6">
          {summary.map((item) => (
            <div key={item.label} className="text-right">
              <p className="font-body text-xl font-bold text-white">{item.value}</p>
              <p className="font-body text-xs text-[#B7BAC1]">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <DriverPhoto driver={driver} color={color} />

      <dl className="divide-y divide-[#2A2D33] rounded-2xl bg-[#1E2025] px-5">
        {stats.map((item) => (
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

  const [drivers, setDrivers] = useState<DriverStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    if (!team) return;

    let active = true;
    setLoading(true);
    setError(null);

    getDriversByTeam(team.id)
      .then((data) => {
        if (active) setDrivers(data);
      })
      .catch((err: unknown) => {
        if (active) {
          setError(err instanceof Error ? err.message : "Não foi possível carregar os pilotos.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [team, reload]);

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
            <span className="ml-2 font-normal text-[#B7BAC1]">· Drivers Statistics</span>
          </h1>
          <span className="w-12" aria-hidden="true" />
        </header>

        {loading ? (
          <p className="font-body text-[#B7BAC1]">Carregando pilotos...</p>
        ) : error ? (
          <div className="flex flex-col items-start gap-4 rounded-2xl bg-[#1E2025] p-6">
            <p className="font-body text-sm text-[#B7BAC1]">{error}</p>
            <button
              type="button"
              onClick={() => setReload((n) => n + 1)}
              className="rounded-full bg-[#E10600] px-4 py-2 font-body text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Tentar novamente
            </button>
          </div>
        ) : drivers.length === 0 ? (
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
