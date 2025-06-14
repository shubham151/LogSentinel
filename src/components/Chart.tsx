import React from "react";

interface ChartProps {
  data: any[];
}

export const Chart: React.FC<ChartProps> = ({ data }) => (
  <div>
    <h2>Requests Over Time</h2>
    {/* TODO: integrate your chart library (Chart.js, Recharts, etc.) */}
    <pre style={{ maxHeight: 200, overflow: "auto" }}>
      {JSON.stringify(
        data.map((d) => ({ t: d.timestamp, status: d.status })),
        null,
        2
      )}
    </pre>
  </div>
);
