"use client";

import { useState, useMemo } from "react";
import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerTooltip,
  MapRoute,
  MapControls,
} from "@/components/ui/map";
import {
  allExchanges,
  allConnections,
  getExchangeById,
  getExchangesByContinent,
  getConnectionsByContinent,
  getMicrowaveAdvantage,
  continentNames,
  type Exchange,
  type LatencyConnection,
  type Continent,
} from "@/lib/exchanges-data";

type ConnectionType = "fiber" | "microwave" | "both";
type RegionFilter = Continent | "all" | "transatlantic";

// Map center and zoom for each region
const regionViews: Record<RegionFilter, { center: [number, number]; zoom: number }> = {
  europe: { center: [8.5, 50], zoom: 4.5 },
  "north-america": { center: [-90, 42], zoom: 4 },
  all: { center: [-30, 45], zoom: 2.5 },
  transatlantic: { center: [-30, 48], zoom: 2.8 },
};

export default function Home() {
  const [selectedExchange, setSelectedExchange] = useState<Exchange | null>(null);
  const [selectedConnection, setSelectedConnection] = useState<LatencyConnection | null>(null);
  const [connectionType, setConnectionType] = useState<ConnectionType>("both");
  const [showDatacenters, setShowDatacenters] = useState(true);
  const [showExchanges, setShowExchanges] = useState(true);
  const [regionFilter, setRegionFilter] = useState<RegionFilter>("europe");

  // Get current view settings
  const currentView = regionViews[regionFilter];

  // Filter exchanges based on settings and region
  const visibleExchanges = useMemo(() => {
    let exchanges: Exchange[];

    if (regionFilter === "all" || regionFilter === "transatlantic") {
      exchanges = allExchanges;
    } else {
      exchanges = getExchangesByContinent(regionFilter);
    }

    return exchanges.filter((e) => {
      if (e.type === "datacenter" && !showDatacenters) return false;
      if (e.type === "exchange" && !showExchanges) return false;
      return true;
    });
  }, [showDatacenters, showExchanges, regionFilter]);

  // Get connections that should be visible
  const visibleConnections = useMemo(() => {
    let connections: LatencyConnection[];

    if (selectedExchange) {
      connections = allConnections.filter(
        (c) => c.from === selectedExchange.id || c.to === selectedExchange.id
      );
    } else {
      connections = getConnectionsByContinent(regionFilter);
    }

    return connections;
  }, [selectedExchange, regionFilter]);

  // Handle region change
  const handleRegionChange = (newRegion: RegionFilter) => {
    setRegionFilter(newRegion);
    setSelectedExchange(null);
    setSelectedConnection(null);
  };

  return (
    <div className="flex h-screen w-screen flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b bg-background px-4 py-3">
        <div>
          <h1 className="text-lg font-semibold">Exchange Latencies</h1>
          <p className="text-sm text-muted-foreground">
            Fiber vs Microwave - Global Markets
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Region Filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-muted-foreground">Region:</label>
            <div className="flex rounded-md border">
              {(["europe", "north-america", "transatlantic", "all"] as RegionFilter[]).map(
                (region, idx) => (
                  <button
                    key={region}
                    onClick={() => handleRegionChange(region)}
                    className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                      idx > 0 ? "border-l" : ""
                    } ${
                      regionFilter === region
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent"
                    }`}
                  >
                    {continentNames[region]}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Connection Type Toggle */}
          <div className="flex items-center gap-2 border-l pl-4">
            <label className="text-sm text-muted-foreground">Show:</label>
            <div className="flex rounded-md border">
              <button
                onClick={() => setConnectionType("both")}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                  connectionType === "both"
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                }`}
              >
                Both
              </button>
              <button
                onClick={() => setConnectionType("fiber")}
                className={`border-l px-3 py-1.5 text-xs font-medium transition-colors ${
                  connectionType === "fiber"
                    ? "bg-amber-500 text-white"
                    : "hover:bg-accent"
                }`}
              >
                Fiber
              </button>
              <button
                onClick={() => setConnectionType("microwave")}
                className={`border-l px-3 py-1.5 text-xs font-medium transition-colors ${
                  connectionType === "microwave"
                    ? "bg-cyan-500 text-white"
                    : "hover:bg-accent"
                }`}
              >
                Microwave
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 border-l pl-4">
            <label className="flex items-center gap-1.5 text-sm">
              <input
                type="checkbox"
                checked={showDatacenters}
                onChange={(e) => setShowDatacenters(e.target.checked)}
                className="rounded"
              />
              Data Centers
            </label>
            <label className="flex items-center gap-1.5 text-sm">
              <input
                type="checkbox"
                checked={showExchanges}
                onChange={(e) => setShowExchanges(e.target.checked)}
                className="rounded"
              />
              Exchanges
            </label>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative flex flex-1">
        {/* Map */}
        <div className="flex-1">
          <Map
            key={regionFilter}
            center={currentView.center}
            zoom={currentView.zoom}
            minZoom={2}
            maxZoom={12}
          >
            <MapControls
              position="bottom-right"
              showZoom
              showCompass
              showFullscreen
            />

            {/* Connection Lines */}
            {visibleConnections.map((connection) => {
              const fromExchange = getExchangeById(connection.from);
              const toExchange = getExchangeById(connection.to);
              if (!fromExchange || !toExchange) return null;

              const isSelected = selectedConnection?.id === connection.id;
              const coordinates: [number, number][] = [
                fromExchange.coordinates,
                toExchange.coordinates,
              ];
              const hasMicrowave = connection.microwaveLatencyMs !== null;

              // Calculate midpoint for label
              const midLng =
                (fromExchange.coordinates[0] + toExchange.coordinates[0]) / 2;
              const midLat =
                (fromExchange.coordinates[1] + toExchange.coordinates[1]) / 2;

              return (
                <div key={connection.id}>
                  {/* Fiber Line */}
                  {(connectionType === "fiber" || connectionType === "both") && (
                    <MapRoute
                      id={`fiber-${connection.id}`}
                      coordinates={coordinates}
                      color={connection.isTransatlantic ? "#8b5cf6" : "#f59e0b"}
                      width={isSelected ? 4 : 2}
                      opacity={isSelected ? 1 : 0.6}
                      dashArray={[4, 2]}
                      onClick={() => setSelectedConnection(connection)}
                    />
                  )}

                  {/* Microwave Line */}
                  {(connectionType === "microwave" || connectionType === "both") &&
                    hasMicrowave && (
                      <MapRoute
                        id={`microwave-${connection.id}`}
                        coordinates={coordinates}
                        color="#06b6d4"
                        width={isSelected ? 4 : 2}
                        opacity={isSelected ? 1 : 0.7}
                        onClick={() => setSelectedConnection(connection)}
                      />
                    )}

                  {/* Latency Label */}
                  <MapMarker
                    longitude={midLng}
                    latitude={midLat}
                    onClick={() => setSelectedConnection(connection)}
                  >
                    <MarkerContent>
                      <div
                        className={`flex flex-col items-center rounded px-1.5 py-0.5 text-[9px] font-medium shadow-sm cursor-pointer transition-transform hover:scale-110 ${
                          isSelected
                            ? "bg-white dark:bg-zinc-800 ring-2 ring-primary"
                            : "bg-white/90 dark:bg-zinc-800/90"
                        }`}
                        onClick={() => setSelectedConnection(connection)}
                      >
                        {(connectionType === "fiber" || connectionType === "both") && (
                          <span
                            className={
                              connection.isTransatlantic
                                ? "text-violet-600 dark:text-violet-400"
                                : "text-amber-600 dark:text-amber-400"
                            }
                          >
                            {connection.fiberLatencyMs.toFixed(1)}ms
                          </span>
                        )}
                        {(connectionType === "microwave" || connectionType === "both") &&
                          hasMicrowave && (
                            <span className="text-cyan-600 dark:text-cyan-400">
                              {connection.microwaveLatencyMs!.toFixed(1)}ms
                            </span>
                          )}
                        {connectionType === "both" && !hasMicrowave && (
                          <span className="text-muted-foreground text-[8px]">N/A</span>
                        )}
                      </div>
                    </MarkerContent>
                  </MapMarker>
                </div>
              );
            })}

            {/* Exchange Markers */}
            {visibleExchanges.map((exchange) => (
              <MapMarker
                key={exchange.id}
                longitude={exchange.coordinates[0]}
                latitude={exchange.coordinates[1]}
                onClick={() => {
                  setSelectedExchange(
                    selectedExchange?.id === exchange.id ? null : exchange
                  );
                  setSelectedConnection(null);
                }}
              >
                <MarkerContent>
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full border-2 shadow-lg transition-transform hover:scale-110 ${
                      exchange.type === "datacenter"
                        ? "border-emerald-300 bg-emerald-500"
                        : "border-blue-300 bg-blue-500"
                    } ${
                      selectedExchange?.id === exchange.id
                        ? "ring-2 ring-white ring-offset-2 ring-offset-background scale-125"
                        : ""
                    }`}
                  >
                    <span className="text-[10px] font-bold text-white">
                      {exchange.type === "datacenter" ? "DC" : "EX"}
                    </span>
                  </div>
                </MarkerContent>
                <MarkerTooltip>
                  <div className="min-w-[120px]">
                    <div className="font-semibold">{exchange.shortName}</div>
                    <div className="text-xs opacity-80">
                      {exchange.city}, {exchange.country}
                    </div>
                  </div>
                </MarkerTooltip>
              </MapMarker>
            ))}
          </Map>
        </div>

        {/* Side Panel */}
        <aside className="w-80 overflow-y-auto border-l bg-background p-4">
          {/* Legend */}
          <div className="mb-6">
            <h3 className="mb-3 font-semibold">Legend</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-6 rounded bg-amber-500" />
                <span>Fiber optic</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-6 rounded bg-violet-500" />
                <span>Transatlantic fiber</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-6 rounded bg-cyan-500" />
                <span>Microwave</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-emerald-300 bg-emerald-500 text-[8px] font-bold text-white">
                  DC
                </div>
                <span>Data Center</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-blue-300 bg-blue-500 text-[8px] font-bold text-white">
                  EX
                </div>
                <span>Exchange</span>
              </div>
            </div>
          </div>

          {/* Selected Exchange Info */}
          {selectedExchange && (
            <div className="mb-6 rounded-lg border bg-card p-4">
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{selectedExchange.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedExchange.city}, {selectedExchange.country}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedExchange(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  &times;
                </button>
              </div>
              {selectedExchange.description && (
                <p className="text-sm text-muted-foreground">
                  {selectedExchange.description}
                </p>
              )}
              <div className="mt-3">
                <p className="text-xs text-muted-foreground">
                  Click on a connection to see latency details
                </p>
              </div>
            </div>
          )}

          {/* Selected Connection Info */}
          {selectedConnection && (
            <div className="mb-6 rounded-lg border bg-card p-4">
              <div className="mb-3 flex items-start justify-between">
                <h3 className="font-semibold">Connection Details</h3>
                <button
                  onClick={() => setSelectedConnection(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  &times;
                </button>
              </div>

              <div className="mb-3 text-sm">
                <span className="font-medium">
                  {getExchangeById(selectedConnection.from)?.shortName}
                </span>
                <span className="mx-2 text-muted-foreground">&harr;</span>
                <span className="font-medium">
                  {getExchangeById(selectedConnection.to)?.shortName}
                </span>
                {selectedConnection.isTransatlantic && (
                  <span className="ml-2 rounded bg-violet-500/20 px-1.5 py-0.5 text-xs text-violet-600 dark:text-violet-400">
                    Transatlantic
                  </span>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Distance</span>
                  <span className="font-medium">
                    {selectedConnection.distanceKm.toLocaleString()} km
                  </span>
                </div>

                <div
                  className={`rounded-md p-3 ${
                    selectedConnection.isTransatlantic
                      ? "bg-violet-500/10"
                      : "bg-amber-500/10"
                  }`}
                >
                  <div className="mb-1 flex items-center gap-2">
                    <div
                      className={`h-2 w-4 rounded ${
                        selectedConnection.isTransatlantic
                          ? "bg-violet-500"
                          : "bg-amber-500"
                      }`}
                    />
                    <span className="text-sm font-medium">
                      {selectedConnection.isTransatlantic
                        ? "Submarine Fiber"
                        : "Fiber Optic"}
                    </span>
                  </div>
                  <div
                    className={`text-2xl font-bold ${
                      selectedConnection.isTransatlantic
                        ? "text-violet-600 dark:text-violet-400"
                        : "text-amber-600 dark:text-amber-400"
                    }`}
                  >
                    {selectedConnection.fiberLatencyMs.toFixed(2)} ms
                  </div>
                </div>

                {selectedConnection.microwaveLatencyMs !== null ? (
                  <>
                    <div className="rounded-md bg-cyan-500/10 p-3">
                      <div className="mb-1 flex items-center gap-2">
                        <div className="h-2 w-4 rounded bg-cyan-500" />
                        <span className="text-sm font-medium">Microwave</span>
                      </div>
                      <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                        {selectedConnection.microwaveLatencyMs.toFixed(2)} ms
                      </div>
                    </div>

                    <div className="rounded-md border border-emerald-500/30 bg-emerald-500/10 p-3">
                      <div className="text-sm text-muted-foreground">
                        Microwave Advantage
                      </div>
                      <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                        {getMicrowaveAdvantage(selectedConnection)}% faster
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Saves{" "}
                        {(
                          selectedConnection.fiberLatencyMs -
                          selectedConnection.microwaveLatencyMs
                        ).toFixed(2)}{" "}
                        ms per trip
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="rounded-md border border-muted bg-muted/30 p-3">
                    <div className="text-sm text-muted-foreground">
                      Microwave not available
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {selectedConnection.isTransatlantic
                        ? "Cannot cross oceans"
                        : "Distance too far for line-of-sight"}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Connection List */}
          <div>
            <h3 className="mb-3 font-semibold">
              {selectedExchange
                ? `Connections from ${selectedExchange.shortName}`
                : `${continentNames[regionFilter]} Connections`}
            </h3>
            <div className="space-y-2">
              {visibleConnections.map((connection) => {
                const fromExchange = getExchangeById(connection.from);
                const toExchange = getExchangeById(connection.to);
                if (!fromExchange || !toExchange) return null;

                return (
                  <button
                    key={connection.id}
                    onClick={() => setSelectedConnection(connection)}
                    className={`w-full rounded-md border p-3 text-left transition-colors hover:bg-accent ${
                      selectedConnection?.id === connection.id
                        ? "border-primary bg-accent"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span>
                        {fromExchange.shortName} &harr; {toExchange.shortName}
                      </span>
                      <span className="text-muted-foreground">
                        {connection.distanceKm.toLocaleString()} km
                      </span>
                    </div>
                    <div className="mt-1 flex gap-4 text-xs">
                      <span
                        className={
                          connection.isTransatlantic
                            ? "text-violet-600 dark:text-violet-400"
                            : "text-amber-600 dark:text-amber-400"
                        }
                      >
                        Fiber: {connection.fiberLatencyMs.toFixed(2)} ms
                      </span>
                      {connection.microwaveLatencyMs !== null ? (
                        <span className="text-cyan-600 dark:text-cyan-400">
                          MW: {connection.microwaveLatencyMs.toFixed(2)} ms
                        </span>
                      ) : (
                        <span className="text-muted-foreground">MW: N/A</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
