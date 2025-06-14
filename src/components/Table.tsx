import React from "react";

interface TableProps {
  data: any[];
}

export const Table: React.FC<TableProps> = ({ data }) => (
  <div>
    <h2>Latest Logs</h2>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>Time</th>
          <th>IP</th>
          <th>Method</th>
          <th>URL</th>
          <th>Status</th>
          <th>Size</th>
        </tr>
      </thead>
      <tbody>
        {data.slice(0, 20).map((d, i) => (
          <tr key={i}>
            <td>{new Date(d.timestamp).toLocaleString()}</td>
            <td>{d.ip}</td>
            <td>{d.method}</td>
            <td>{d.url}</td>
            <td>{d.status}</td>
            <td>{d.size}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
