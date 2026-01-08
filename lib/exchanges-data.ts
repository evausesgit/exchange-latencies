// European Financial Markets and Data Centers with GPS coordinates
export type Exchange = {
  id: string;
  name: string;
  shortName: string;
  city: string;
  country: string;
  coordinates: [number, number]; // [longitude, latitude]
  type: "exchange" | "datacenter";
  description?: string;
};

export type LatencyConnection = {
  id: string;
  from: string; // exchange id
  to: string; // exchange id
  fiberLatencyMs: number; // one-way latency in milliseconds
  microwaveLatencyMs: number; // one-way latency in milliseconds
  distanceKm: number;
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
    coordinates: [18.0649, 59.3326],
    type: "exchange",
  },
];

// Latency connections between major European data centers
// Fiber latency based on ~5 microseconds per km (including routing overhead)
// Microwave latency based on ~3.3 microseconds per km (line of sight)
export const latencyConnections: LatencyConnection[] = [
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

// Helper function to get exchange by id
export function getExchangeById(id: string): Exchange | undefined {
  return europeanExchanges.find((e) => e.id === id);
}

// Helper function to get all connections for an exchange
export function getConnectionsForExchange(
  exchangeId: string
): LatencyConnection[] {
  return latencyConnections.filter(
    (c) => c.from === exchangeId || c.to === exchangeId
  );
}

// Helper to calculate the latency advantage of microwave over fiber in percentage
export function getMicrowaveAdvantage(connection: LatencyConnection): number {
  return Math.round(
    ((connection.fiberLatencyMs - connection.microwaveLatencyMs) /
      connection.fiberLatencyMs) *
      100
  );
}
