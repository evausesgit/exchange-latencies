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
  /** For exchanges: the associated datacenter ID (connections are between datacenters) */
  datacenterId?: string;
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
    datacenterId: "ld4",
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
    datacenterId: "fr2",
  },

  // Italy - Bergamo (Euronext)
  {
    id: "bg1",
    name: "Aruba IT3",
    shortName: "BG1",
    city: "Bergamo",
    country: "Italy",
    continent: "europe",
    coordinates: [9.6699, 45.6983],
    type: "datacenter",
    description: "Euronext data center",
  },
  {
    id: "euronext",
    name: "Euronext",
    shortName: "ENX",
    city: "Bergamo",
    country: "Italy",
    continent: "europe",
    coordinates: [9.6772, 45.6944],
    type: "exchange",
    datacenterId: "bg1",
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
    datacenterId: "zh4",
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
    datacenterId: "ml2",
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
    datacenterId: "md2",
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
    datacenterId: "sk1",
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
    datacenterId: "ny5",
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
    datacenterId: "ny4",
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
    datacenterId: "ch4",
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
    datacenterId: "ch4",
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
    datacenterId: "tr2",
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
    id: "ld4-bg1",
    from: "ld4",
    to: "bg1",
    distanceKm: 958,
    fiberLatencyMs: 6.23,
    microwaveLatencyMs: 3.16,
  },
  {
    id: "ld4-zh4",
    from: "ld4",
    to: "zh4",
    distanceKm: 778,
    fiberLatencyMs: 5.06,
    microwaveLatencyMs: 2.57,
  },
  {
    id: "ld4-ml2",
    from: "ld4",
    to: "ml2",
    distanceKm: 958,
    fiberLatencyMs: 6.23,
    microwaveLatencyMs: 3.16,
  },
  {
    id: "ld4-md2",
    from: "ld4",
    to: "md2",
    distanceKm: 1264,
    fiberLatencyMs: 8.22,
    microwaveLatencyMs: 4.17,
  },
  {
    id: "ld4-sk1",
    from: "ld4",
    to: "sk1",
    distanceKm: 1435,
    fiberLatencyMs: 9.33,
    microwaveLatencyMs: 4.74,
  },

  // Frankfurt (FR2) connections
  {
    id: "fr2-bg1",
    from: "fr2",
    to: "bg1",
    distanceKm: 415,
    fiberLatencyMs: 2.70,
    microwaveLatencyMs: 1.37,
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

  // Bergamo (BG1) connections
  {
    id: "bg1-zh4",
    from: "bg1",
    to: "zh4",
    distanceKm: 180,
    fiberLatencyMs: 1.17,
    microwaveLatencyMs: 0.59,
  },
  {
    id: "bg1-ml2",
    from: "bg1",
    to: "ml2",
    distanceKm: 52,
    fiberLatencyMs: 0.34,
    microwaveLatencyMs: 0.17,
  },
  {
    id: "bg1-md2",
    from: "bg1",
    to: "md2",
    distanceKm: 1320,
    fiberLatencyMs: 8.58,
    microwaveLatencyMs: 4.36,
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

// Helper function to get all connections for an exchange (uses datacenterId for exchanges)
export function getConnectionsForExchange(
  exchangeId: string
): LatencyConnection[] {
  const exchange = getExchangeById(exchangeId);
  // If it's an exchange with a datacenter, use the datacenter ID for connections
  const connectionId = exchange?.datacenterId || exchangeId;
  return allConnections.filter(
    (c) => c.from === connectionId || c.to === connectionId
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
