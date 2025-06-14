// src/app/page.tsx

import { Dashboard } from "@/components/Dashboard";
import { AgentQuery } from "@/components/AgentQuery";

export default function Home() {
  return (
    <div style={{ padding: 20, maxWidth: "1200px", margin: "0 auto" }}>
      <h1>Log Analytics</h1>

      {/* AgentQuery is a Client Component, responsible for its own state */}
      <AgentQuery />

      <hr
        style={{
          margin: "40px 0",
          border: "none",
          borderTop: "1px solid #eaeaea",
        }}
      />

      <h2>Live Dashboard</h2>

      {/* Dashboard is a Client Component that will handle all its own data fetching */}
      <Dashboard />
    </div>
  );
}
