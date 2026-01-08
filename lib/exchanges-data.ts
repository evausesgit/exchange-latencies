// Financial Markets and Data Centers with GPS coordinates
export type Continent = "europe" | "north-america";

export type Exchange = {
  id: string;
  name: string;
  shortName: string;
  city: string;
  country: string;
  continent: Continent;
  coordinates: [number, number]; // [longitude, latitude]
  type: "exchange" | "datacenter";
  description?: string;
};

export type LatencyConnection = {
  id: string;
  from: string; // exchange id
  to: string; // exchange id
  fiberLatencyMs: number; // one-way latency in milliseconds
  microwaveLatencyMs: number | null; // one-way latency in milliseconds (null if not available)
  distanceKm: number;
  isTransatlantic?: boolean;
};

// Major European exchanges and data centers
export const europeanExchanges: Exchange[] = [
  // United Kingdom
  {
    id: "ld4",
    name: "Equinix LD4",
    shortName: "LD4",
    city: "Slough",
    country: "UK",
    continent: "europe",
    coordinates: [-0.5883, 51.5074],
    type: "datacenter",
    description: "Primary London Stock Exchange data center",
  },
  {
    id: "lse",
    name: "London Stock Exchange",
    shortName: "LSE",
    city: "London",
    country: "UK",
    continent: "europe",
    coordinates: [-0.0877, 51.5144],
    type: "exchange",
  },

  // Germany
  {
    id: "fr2",
    name: "Equinix FR2",
    shortName: "FR2",
    city: "Frankfurt",
    country: "Germany",
    continent: "europe",
    coordinates: [8.6821, 50.1109],
    type: "datacenter",
    description: "Deutsche Börse / Eurex data center",
  },
  {
    id: "xetra",
    name: "Deutsche Börse (XETRA)",
    shortName: "XETRA",
    city: "Frankfurt",
    country: "Germany",
    continent: "europe",
    coordinates: [8.6724, 50.1095],
    type: "exchange",
  },

  // France
  {
    id: "pa3",
    name: "Equinix PA3",
    shortName: "PA3",
    city: "Paris",
    country: "France",
    continent: "europe",
    coordinates: [2.3417, 48.9342],
    type: "datacenter",
    description: "Euronext Paris data center",
  },
  {
    id: "euronext-paris",
    name: "Euronext Paris",
    shortName: "ENX Paris",
    city: "Paris",
    country: "France",
    continent: "europe",
    coordinates: [2.3414, 48.8698],
    type: "exchange",
  },

  // Netherlands
  {
    id: "am3",
    name: "Equinix AM3",
    shortName: "AM3",
    city: "Amsterdam",
    country: "Netherlands",
    continent: "europe",
    coordinates: [4.9041, 52.3676],
    type: "datacenter",
    description: "Euronext Amsterdam data center",
  },
  {
    id: "euronext-amsterdam",
    name: "Euronext Amsterdam",
    shortName: "ENX Amsterdam",
    city: "Amsterdam",
    country: "Netherlands",
    continent: "europe",
    coordinates: [4.8979, 52.3702],
    type: "exchange",
  },

  // Switzerland
  {
    id: "zh4",
    name: "Equinix ZH4",
    shortName: "ZH4",
    city: "Zurich",
    country: "Switzerland",
    continent: "europe",
    coordinates: [8.5417, 47.3769],
    type: "datacenter",
    description: "SIX Swiss Exchange data center",
  },
  {
    id: "six",
    name: "SIX Swiss Exchange",
    shortName: "SIX",
    city: "Zurich",
    country: "Switzerland",
    continent: "europe",
    coordinates: [8.5394, 47.3667],
    type: "exchange",
  },

  // Italy
  {
    id: "ml2",
    name: "Equinix ML2",
    shortName: "ML2",
    city: "Milan",
    country: "Italy",
    continent: "europe",
    coordinates: [9.1905, 45.4642],
    type: "datacenter",
    description: "Borsa Italiana data center",
  },
  {
    id: "borsa-italiana",
    name: "Borsa Italiana",
    shortName: "BIT",
    city: "Milan",
    country: "Italy",
    continent: "europe",
    coordinates: [9.1895, 45.4654],
    type: "exchange",
  },

  // Spain
  {
    id: "md2",
    name: "Equinix MD2",
    shortName: "MD2",
    city: "Madrid",
    country: "Spain",
    continent: "europe",
    coordinates: [-3.7038, 40.4168],
    type: "datacenter",
    description: "Bolsa de Madrid data center",
  },
  {
    id: "bolsa-madrid",
    name: "Bolsa de Madrid",
    shortName: "BME",
    city: "Madrid",
    country: "Spain",
    continent: "europe",
    coordinates: [-3.6953, 40.4167],
    type: "exchange",
  },

  // Sweden
  {
    id: "sk1",
    name: "Equinix SK1",
    shortName: "SK1",
    city: "Stockholm",
    country: "Sweden",
    continent: "europe",
    coordinates: [18.0686, 59.3293],
    type: "datacenter",
    description: "NASDAQ Nordic data center",
  },
  {
    id: "nasdaq-nordic",
    name: "NASDAQ Nordic",
    shortName: "NASDAQ OMX",
    city: "Stockholm",
    country: "Sweden",
    continent: "europe",
    coordinates: [18.0649, 59.3326],
    type: "exchange",
  },
];

// Major US exchanges and data centers
export const usExchanges: Exchange[] = [
  // New Jersey - Primary US financial hub
  {
    id: "ny5",
    name: "Equinix NY5",
    shortName: "NY5",
    city: "Secaucus",
    country: "USA",
    continent: "north-america",
    coordinates: [-74.0566, 40.7895],
    type: "datacenter",
    description: "NASDAQ primary data center",
  },
  {
    id: "nasdaq",
    name: "NASDAQ",
    shortName: "NASDAQ",
    city: "New York",
    country: "USA",
    continent: "north-america",
    coordinates: [-73.986, 40.7569],
    type: "exchange",
  },
  {
    id: "ny4",
    name: "Equinix NY4",
    shortName: "NY4",
    city: "Secaucus",
    country: "USA",
    continent: "north-america",
    coordinates: [-74.0576, 40.7885],
    type: "datacenter",
    description: "NYSE primary data center",
  },
  {
    id: "nyse",
    name: "New York Stock Exchange",
    shortName: "NYSE",
    city: "New York",
    country: "USA",
    continent: "north-america",
    coordinates: [-74.0113, 40.7069],
    type: "exchange",
  },
  {
    id: "nj2",
    name: "Equinix NJ2",
    shortName: "NJ2",
    city: "Weehawken",
    country: "USA",
    continent: "north-america",
    coordinates: [-74.0201, 40.7684],
    type: "datacenter",
    description: "BATS/CBOE data center",
  },

  // Chicago - Derivatives hub
  {
    id: "ch4",
    name: "Equinix CH4",
    shortName: "CH4",
    city: "Chicago",
    country: "USA",
    continent: "north-america",
    coordinates: [-87.9401, 41.8628],
    type: "datacenter",
    description: "CME Group primary data center",
  },
  {
    id: "cme",
    name: "CME Group",
    shortName: "CME",
    city: "Chicago",
    country: "USA",
    continent: "north-america",
    coordinates: [-87.6324, 41.8823],
    type: "exchange",
    description: "Chicago Mercantile Exchange - Futures & Options",
  },
  {
    id: "cboe",
    name: "CBOE",
    shortName: "CBOE",
    city: "Chicago",
    country: "USA",
    continent: "north-america",
    coordinates: [-87.6321, 41.8819],
    type: "exchange",
    description: "Chicago Board Options Exchange",
  },

  // Other US locations
  {
    id: "dc5",
    name: "Equinix DC5",
    shortName: "DC5",
    city: "Ashburn",
    country: "USA",
    continent: "north-america",
    coordinates: [-77.4875, 39.0438],
    type: "datacenter",
    description: "Major internet exchange point",
  },
  {
    id: "sv5",
    name: "Equinix SV5",
    shortName: "SV5",
    city: "San Jose",
    country: "USA",
    continent: "north-america",
    coordinates: [-121.8863, 37.3382],
    type: "datacenter",
    description: "West Coast financial data center",
  },

  // Toronto
  {
    id: "tr2",
    name: "Equinix TR2",
    shortName: "TR2",
    city: "Toronto",
    country: "Canada",
    continent: "north-america",
    coordinates: [-79.3832, 43.6532],
    type: "datacenter",
    description: "TMX Group data center",
  },
  {
    id: "tsx",
    name: "Toronto Stock Exchange",
    shortName: "TSX",
    city: "Toronto",
    country: "Canada",
    continent: "north-america",
    coordinates: [-79.3795, 43.6481],
    type: "exchange",
  },
];

// All exchanges combined
export const allExchanges: Exchange[] = [...europeanExchanges, ...usExchanges];

// European latency connections
export const europeanConnections: LatencyConnection[] = [
  // London (LD4) connections
  {
    id: "ld4-fr2",
    from: "ld4",
    to: "fr2",
    distanceKm: 637,
    fiberLatencyMs: 4.17,
    microwaveLatencyMs: 2.1,
  },
  {
    id: "ld4-pa3",
    from: "ld4",
    to: "pa3",
    distanceKm: 459,
    fiberLatencyMs: 2.98,
    microwaveLatencyMs: 1.52,
  },
  {
    id: "ld4-am3",
    from: "ld4",
    to: "am3",
    distanceKm: 358,
    fiberLatencyMs: 2.33,
    microwaveLatencyMs: 1.18,
  },

  // Frankfurt (FR2) connections
  {
    id: "fr2-pa3",
    from: "fr2",
    to: "pa3",
    distanceKm: 479,
    fiberLatencyMs: 3.11,
    microwaveLatencyMs: 1.58,
  },
  {
    id: "fr2-am3",
    from: "fr2",
    to: "am3",
    distanceKm: 365,
    fiberLatencyMs: 2.37,
    microwaveLatencyMs: 1.2,
  },
  {
    id: "fr2-zh4",
    from: "fr2",
    to: "zh4",
    distanceKm: 306,
    fiberLatencyMs: 1.99,
    microwaveLatencyMs: 1.01,
  },
  {
    id: "fr2-ml2",
    from: "fr2",
    to: "ml2",
    distanceKm: 518,
    fiberLatencyMs: 3.37,
    microwaveLatencyMs: 1.71,
  },
  {
    id: "fr2-sk1",
    from: "fr2",
    to: "sk1",
    distanceKm: 1243,
    fiberLatencyMs: 8.08,
    microwaveLatencyMs: 4.1,
  },

  // Paris (PA3) connections
  {
    id: "pa3-am3",
    from: "pa3",
    to: "am3",
    distanceKm: 430,
    fiberLatencyMs: 2.79,
    microwaveLatencyMs: 1.42,
  },
  {
    id: "pa3-zh4",
    from: "pa3",
    to: "zh4",
    distanceKm: 489,
    fiberLatencyMs: 3.18,
    microwaveLatencyMs: 1.61,
  },
  {
    id: "pa3-ml2",
    from: "pa3",
    to: "ml2",
    distanceKm: 639,
    fiberLatencyMs: 4.15,
    microwaveLatencyMs: 2.11,
  },
  {
    id: "pa3-md2",
    from: "pa3",
    to: "md2",
    distanceKm: 1054,
    fiberLatencyMs: 6.85,
    microwaveLatencyMs: 3.48,
  },

  // Amsterdam (AM3) connections
  {
    id: "am3-sk1",
    from: "am3",
    to: "sk1",
    distanceKm: 1132,
    fiberLatencyMs: 7.36,
    microwaveLatencyMs: 3.74,
  },

  // Zurich (ZH4) connections
  {
    id: "zh4-ml2",
    from: "zh4",
    to: "ml2",
    distanceKm: 216,
    fiberLatencyMs: 1.4,
    microwaveLatencyMs: 0.71,
  },

  // Milan (ML2) connections
  {
    id: "ml2-md2",
    from: "ml2",
    to: "md2",
    distanceKm: 1189,
    fiberLatencyMs: 7.73,
    microwaveLatencyMs: 3.92,
  },
];

// US latency connections
export const usConnections: LatencyConnection[] = [
  // NY/NJ corridor (ultra-low latency)
  {
    id: "ny4-ny5",
    from: "ny4",
    to: "ny5",
    distanceKm: 1.2,
    fiberLatencyMs: 0.08,
    microwaveLatencyMs: 0.04,
  },
  {
    id: "ny4-nj2",
    from: "ny4",
    to: "nj2",
    distanceKm: 3.5,
    fiberLatencyMs: 0.12,
    microwaveLatencyMs: 0.06,
  },
  {
    id: "ny5-nj2",
    from: "ny5",
    to: "nj2",
    distanceKm: 2.8,
    fiberLatencyMs: 0.1,
    microwaveLatencyMs: 0.05,
  },

  // NY to Chicago (famous microwave route)
  {
    id: "ny4-ch4",
    from: "ny4",
    to: "ch4",
    distanceKm: 1145,
    fiberLatencyMs: 7.44,
    microwaveLatencyMs: 3.98,
  },
  {
    id: "ny5-ch4",
    from: "ny5",
    to: "ch4",
    distanceKm: 1145,
    fiberLatencyMs: 7.44,
    microwaveLatencyMs: 3.98,
  },
  {
    id: "nj2-ch4",
    from: "nj2",
    to: "ch4",
    distanceKm: 1140,
    fiberLatencyMs: 7.41,
    microwaveLatencyMs: 3.96,
  },

  // NY to DC
  {
    id: "ny4-dc5",
    from: "ny4",
    to: "dc5",
    distanceKm: 380,
    fiberLatencyMs: 2.47,
    microwaveLatencyMs: 1.25,
  },
  {
    id: "ny5-dc5",
    from: "ny5",
    to: "dc5",
    distanceKm: 380,
    fiberLatencyMs: 2.47,
    microwaveLatencyMs: 1.25,
  },

  // Chicago to other US
  {
    id: "ch4-dc5",
    from: "ch4",
    to: "dc5",
    distanceKm: 958,
    fiberLatencyMs: 6.23,
    microwaveLatencyMs: 3.16,
  },
  {
    id: "ch4-sv5",
    from: "ch4",
    to: "sv5",
    distanceKm: 2850,
    fiberLatencyMs: 18.53,
    microwaveLatencyMs: null, // Too far for microwave
  },

  // NY to Toronto
  {
    id: "ny4-tr2",
    from: "ny4",
    to: "tr2",
    distanceKm: 551,
    fiberLatencyMs: 3.58,
    microwaveLatencyMs: 1.82,
  },
  {
    id: "ny5-tr2",
    from: "ny5",
    to: "tr2",
    distanceKm: 551,
    fiberLatencyMs: 3.58,
    microwaveLatencyMs: 1.82,
  },

  // Chicago to Toronto
  {
    id: "ch4-tr2",
    from: "ch4",
    to: "tr2",
    distanceKm: 703,
    fiberLatencyMs: 4.57,
    microwaveLatencyMs: 2.32,
  },

  // West Coast connections
  {
    id: "sv5-dc5",
    from: "sv5",
    to: "dc5",
    distanceKm: 3850,
    fiberLatencyMs: 25.03,
    microwaveLatencyMs: null, // Too far for microwave
  },
];

// Transatlantic connections
export const transatlanticConnections: LatencyConnection[] = [
  // London to NY (Hibernia Express - fastest submarine cable)
  {
    id: "ld4-ny4",
    from: "ld4",
    to: "ny4",
    distanceKm: 5570,
    fiberLatencyMs: 32.5,
    microwaveLatencyMs: null, // Not possible over ocean
    isTransatlantic: true,
  },
  {
    id: "ld4-ny5",
    from: "ld4",
    to: "ny5",
    distanceKm: 5570,
    fiberLatencyMs: 32.5,
    microwaveLatencyMs: null,
    isTransatlantic: true,
  },

  // Frankfurt to NY
  {
    id: "fr2-ny4",
    from: "fr2",
    to: "ny4",
    distanceKm: 6200,
    fiberLatencyMs: 36.8,
    microwaveLatencyMs: null,
    isTransatlantic: true,
  },

  // Amsterdam to NY
  {
    id: "am3-ny4",
    from: "am3",
    to: "ny4",
    distanceKm: 5870,
    fiberLatencyMs: 34.2,
    microwaveLatencyMs: null,
    isTransatlantic: true,
  },

  // London to Toronto
  {
    id: "ld4-tr2",
    from: "ld4",
    to: "tr2",
    distanceKm: 5720,
    fiberLatencyMs: 33.4,
    microwaveLatencyMs: null,
    isTransatlantic: true,
  },

  // London to Chicago
  {
    id: "ld4-ch4",
    from: "ld4",
    to: "ch4",
    distanceKm: 6350,
    fiberLatencyMs: 38.5,
    microwaveLatencyMs: null,
    isTransatlantic: true,
  },

  // Frankfurt to Chicago
  {
    id: "fr2-ch4",
    from: "fr2",
    to: "ch4",
    distanceKm: 7100,
    fiberLatencyMs: 42.8,
    microwaveLatencyMs: null,
    isTransatlantic: true,
  },
];

// All connections combined
export const allConnections: LatencyConnection[] = [
  ...europeanConnections,
  ...usConnections,
  ...transatlanticConnections,
];

// Helper function to get exchange by id
export function getExchangeById(id: string): Exchange | undefined {
  return allExchanges.find((e) => e.id === id);
}

// Helper function to get exchanges by continent
export function getExchangesByContinent(continent: Continent): Exchange[] {
  return allExchanges.filter((e) => e.continent === continent);
}

// Helper function to get all connections for an exchange
export function getConnectionsForExchange(
  exchangeId: string
): LatencyConnection[] {
  return allConnections.filter(
    (c) => c.from === exchangeId || c.to === exchangeId
  );
}

// Helper function to get connections by continent
export function getConnectionsByContinent(
  continent: Continent | "all" | "transatlantic"
): LatencyConnection[] {
  if (continent === "all") return allConnections;
  if (continent === "transatlantic") return transatlanticConnections;

  const exchangeIds = new Set(
    getExchangesByContinent(continent).map((e) => e.id)
  );
  return allConnections.filter(
    (c) =>
      exchangeIds.has(c.from) && exchangeIds.has(c.to) && !c.isTransatlantic
  );
}

// Helper to calculate the latency advantage of microwave over fiber in percentage
export function getMicrowaveAdvantage(
  connection: LatencyConnection
): number | null {
  if (connection.microwaveLatencyMs === null) return null;
  return Math.round(
    ((connection.fiberLatencyMs - connection.microwaveLatencyMs) /
      connection.fiberLatencyMs) *
      100
  );
}

// Continent display names
export const continentNames: Record<Continent | "all" | "transatlantic", string> = {
  europe: "Europe",
  "north-america": "North America",
  all: "All Regions",
  transatlantic: "Transatlantic",
};
