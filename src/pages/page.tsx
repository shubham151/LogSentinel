// pages/index.tsx
import useSWR from "swr";
import { Chart } from "../components/Chart";
import { Table } from "../components/Table";
import { MapView } from "../components/MapView";
import { AgentQuery } from "../components/AgentQuery"; // <-- IMPORT

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Home() {
  const { data, error } = useSWR<any[]>("/api/logs", fetcher, {
    refreshInterval: 30_000,
  });

  return (
    <div style={{ padding: 20, maxWidth: "1200px", margin: "0 auto" }}>
      <h1>Log Analytics</h1>

      {/* ADD THE AGENT COMPONENT HERE */}
      <AgentQuery />

      <hr style={{ margin: "40px 0" }} />

      <h2>Live Dashboard</h2>
      {error && <div>Failed to load logs</div>}
      {!data && !error && <div>Loading…</div>}
      {data && (
        <>
          <Chart data={data} />
          <MapView data={data} />
          <Table data={data} />
        </>
      )}
    </div>
  );
}
