import { driverPhotos } from "../data/driverPhotos";

const BASE_URL = "https://api.jolpi.ca/ergast/f1";
const OPENF1_URL = "https://api.openf1.org/v1";
const PAGE_SIZE = 100;

const SEASON: string = "2025";
const OPENF1_YEAR = SEASON === "current" ? String(new Date().getFullYear()) : SEASON;

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

interface OpenF1Driver {
  name_acronym: string;
  headshot_url: string | null;
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
}

async function getJsonFrom<T>(baseUrl: string, path: string): Promise<T> {
  const response = await fetch(`${baseUrl}/${path}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch driver data (${response.status}).`);
  }
  return (await response.json()) as T;
}

function getJson<T>(path: string): Promise<T> {
  return getJsonFrom<T>(`${BASE_URL}/${SEASON}`, path);
}

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

function normalizeHeadshot(url: string): string {
  return url
    .replace("https://media.formula1.com/d_driver_fallback_image.png", "https://media.formula1.com")
    .replace(/\.transform\/1col\/image\.png$/, "");
}

let headshotsPromise: Promise<Map<string, string>> | undefined;

function getExtraHeadshots(): Promise<Map<string, string>> {
  if (!headshotsPromise) {
    headshotsPromise = (async () => {
      const headshots = new Map<string, string>();
      try {
        const sessions = await getJsonFrom<Array<{ session_key: number }>>(
          OPENF1_URL,
          `sessions?year=${OPENF1_YEAR}`,
        );
        const keys = [
          sessions[0],
          sessions[Math.floor(sessions.length / 2)],
          sessions[sessions.length - 1],
        ].map((session) => session.session_key);

        const responses = await Promise.allSettled([
          ...keys.map((key) => getJsonFrom<OpenF1Driver[]>(OPENF1_URL, `drivers?session_key=${key}`)),
          getJsonFrom<OpenF1Driver[]>(OPENF1_URL, "drivers?session_key=latest"),
        ]);

        for (const response of responses) {
          if (response.status !== "fulfilled") continue;
          for (const driver of response.value) {
            if (driver.headshot_url && !headshots.has(driver.name_acronym)) {
              headshots.set(driver.name_acronym, normalizeHeadshot(driver.headshot_url));
            }
          }
        }
      } catch {
        return headshots;
      }
      return headshots;
    })();
  }
  return headshotsPromise;
}

async function getDriverPhotos(drivers: ApiDriver[]): Promise<Map<string, string>> {
  const photos = new Map<string, string>();
  const unknown: ApiDriver[] = [];

  for (const driver of drivers) {
    const photo = driverPhotos[driver.driverId];
    if (photo) photos.set(driver.driverId, photo);
    else unknown.push(driver);
  }

  if (unknown.length > 0) {
    const extra = await getExtraHeadshots();
    for (const driver of unknown) {
      const photo = driver.code ? extra.get(driver.code) : undefined;
      if (photo) photos.set(driver.driverId, photo);
    }
  }

  return photos;
}

const cache = new Map<string, DriverStats[]>();

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
  }));

  cache.set(constructorId, drivers);
  return drivers;
}
