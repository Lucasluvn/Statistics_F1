/**
 * Integração com a API Jolpica (sucessora da Ergast).
 * Documentação: https://api.jolpi.ca/
 *
 * Toda a temporada é buscada de uma vez (com paginação, já que a API
 * limita cada resposta a 100 itens) e filtrada pela equipe selecionada,
 * para que os números de vitórias/pódios/poles sejam consistentes.
 */

const BASE_URL = "https://api.jolpi.ca/ergast/f1";
const PAGE_SIZE = 100;

// Temporada usada pela aplicação (o card principal também mostra "2025 SEASON").
// Troque por "current" para acompanhar a temporada em andamento.
const SEASON = "2025";

/** Mapeia os ids usados no site para os `constructorId` da API. */
const constructorByTeamId: Record<string, string> = {
  mclaren: "mclaren",
  ferrari: "ferrari",
  "red-bull": "red_bull",
  mercedes: "mercedes",
  haas: "haas",
  "aston-martin": "aston_martin",
  williams: "williams",
  alpine: "alpine",
  rb: "rb",
  sauber: "sauber",
};

interface ApiDriver {
  driverId: string;
  permanentNumber?: string;
  code?: string;
  givenName: string;
  familyName: string;
  nationality: string;
  url?: string;
}

interface DriverStanding {
  position: string;
  points: string;
  wins: string;
  Driver: ApiDriver;
  Constructors: Array<{ constructorId: string }>;
}

interface RaceEntry {
  position: string;
  Driver: { driverId: string };
  Constructor: { constructorId: string };
}

interface StandingsResponse {
  MRData: {
    StandingsTable: {
      StandingsLists: Array<{ DriverStandings: DriverStanding[] }>;
    };
  };
}

interface RacesResponse {
  MRData: {
    total: string;
    RaceTable: {
      Races: Array<{ Results?: RaceEntry[]; QualifyingResults?: RaceEntry[] }>;
    };
  };
}

/** Resposta da API de pageimages da Wikipedia (usada para buscar as fotos). */
interface WikipediaResponse {
  query?: {
    normalized?: Array<{ from: string; to: string }>;
    redirects?: Array<{ from: string; to: string }>;
    pages: Record<string, { title: string; thumbnail?: { source: string } }>;
  };
}

export interface DriverStats {
  id: string;
  name: string;
  code: string;
  number: string;
  nationality: string;
  position: string;
  points: string;
  wins: string;
  podiums: number;
  poles: number;
  photo?: string;
  url?: string;
}

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}/${SEASON}/${path}`);
  if (!response.ok) {
    throw new Error(`Falha ao consultar a API Jolpica (${response.status}).`);
  }
  return (await response.json()) as T;
}

/** Busca todas as páginas de um recurso de corridas e devolve uma lista plana. */
async function getAllEntries(resource: "results" | "qualifying", key: "Results" | "QualifyingResults"): Promise<RaceEntry[]> {
  const first = await getJson<RacesResponse>(`${resource}.json?limit=${PAGE_SIZE}`);
  const total = Number(first.MRData.total);
  const pages = Math.ceil(total / PAGE_SIZE);

  const remaining = await Promise.all(
    Array.from({ length: Math.max(0, pages - 1) }, (_, i) =>
      getJson<RacesResponse>(`${resource}.json?limit=${PAGE_SIZE}&offset=${(i + 1) * PAGE_SIZE}`),
    ),
  );

  return [first, ...remaining].flatMap((page) =>
    page.MRData.RaceTable.Races.flatMap((race) => race[key] ?? []),
  );
}

function countByDriver(entries: RaceEntry[], constructorId: string, isQualifying: boolean): Map<string, number> {
  const counts = new Map<string, number>();
  for (const entry of entries) {
    if (entry.Constructor.constructorId !== constructorId) continue;
    const qualifies = isQualifying ? entry.position === "1" : Number(entry.position) <= 3;
    if (!qualifies) continue;
    counts.set(entry.Driver.driverId, (counts.get(entry.Driver.driverId) ?? 0) + 1);
  }
  return counts;
}

// Cache simples para evitar novas requisições ao voltar entre equipes.
const cache = new Map<string, DriverStats[]>();
const photoCache = new Map<string, string | undefined>();

/**
 * A Jolpica não fornece fotos, mas cada piloto vem com o link da Wikipédia.
 * Uma única requisição em lote busca a imagem de capa de todos os pilotos.
 */
async function getDriverPhotos(drivers: ApiDriver[]): Promise<Map<string, string>> {
  const photos = new Map<string, string>();
  const missing = drivers.filter((driver) => driver.url && !photoCache.has(driver.driverId));

  if (missing.length > 0) {
    const titles = missing.map((driver) => {
      const title = driver.url!.split("/wiki/")[1] ?? "";
      return decodeURIComponent(title.split("#")[0].split("?")[0]).replace(/_/g, " ");
    });

    const params = new URLSearchParams({
      action: "query",
      prop: "pageimages",
      format: "json",
      pithumbsize: "600",
      redirects: "1",
      origin: "*",
      titles: titles.join("|"),
    });

    try {
      const response = await fetch(`https://en.wikipedia.org/w/api.php?${params}`);
      if (!response.ok) throw new Error(`Wikipedia ${response.status}`);
      const data = (await response.json()) as WikipediaResponse;

      const normalized = new Map((data.query?.normalized ?? []).map((item) => [item.from, item.to]));
      const redirects = new Map((data.query?.redirects ?? []).map((item) => [item.from, item.to]));
      const byTitle = new Map<string, string>();
      for (const page of Object.values(data.query?.pages ?? {})) {
        if (page.thumbnail?.source) byTitle.set(page.title, page.thumbnail.source);
      }

      // Alguns pilotos têm o artigo em outro título (ex.: "Alexander Albon" → "Alex Albon").
      const resolveTitle = (title: string) => {
        const seen = new Set<string>();
        let current = title;
        while (redirects.has(current) && !seen.has(current)) {
          seen.add(current);
          current = redirects.get(current)!;
        }
        return current;
      };

      missing.forEach((driver, i) => {
        const title = resolveTitle(normalized.get(titles[i]) ?? titles[i]);
        photoCache.set(driver.driverId, byTitle.get(title));
      });
    } catch {
      // Se as fotos falharem, os dados dos pilotos ainda são exibidos.
      for (const driver of missing) photoCache.set(driver.driverId, undefined);
    }
  }

  for (const driver of drivers) {
    const photo = photoCache.get(driver.driverId);
    if (photo) photos.set(driver.driverId, photo);
  }
  return photos;
}

export async function getDriversByTeam(teamId: string): Promise<DriverStats[]> {
  const constructorId = constructorByTeamId[teamId];
  if (!constructorId) return [];

  const cached = cache.get(constructorId);
  if (cached) return cached;

  const [standings, results, qualifying] = await Promise.all([
    getJson<StandingsResponse>("driverstandings.json?limit=100"),
    getAllEntries("results", "Results"),
    getAllEntries("qualifying", "QualifyingResults"),
  ]);

  const podiums = countByDriver(results, constructorId, false);
  const poles = countByDriver(qualifying, constructorId, true);

  const classifications = standings.MRData.StandingsTable.StandingsLists[0]?.DriverStandings ?? [];

  const entries = classifications.filter((entry) =>
    entry.Constructors.some((c) => c.constructorId === constructorId),
  );
  const photos = await getDriverPhotos(entries.map((entry) => entry.Driver));

  const drivers = entries.map<DriverStats>((entry) => ({
    id: entry.Driver.driverId,
    name: `${entry.Driver.givenName} ${entry.Driver.familyName}`,
    code: entry.Driver.code ?? "",
    number: entry.Driver.permanentNumber ?? "",
    nationality: entry.Driver.nationality,
    position: entry.position,
    points: entry.points,
    wins: entry.wins,
    podiums: podiums.get(entry.Driver.driverId) ?? 0,
    poles: poles.get(entry.Driver.driverId) ?? 0,
    photo: photos.get(entry.Driver.driverId),
    url: entry.Driver.url,
  }));

  cache.set(constructorId, drivers);
  return drivers;
}
