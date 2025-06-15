// src/components/Table.tsx
import React from "react";
import styles from "./Table.module.css";

interface TableProps {
  data: any[];
  lastUpdated: string;
}

export const Table: React.FC<TableProps> = ({ data, lastUpdated }) => (
  <div className={styles.container}>
    <h2 className={styles.title}>Last update: {lastUpdated}</h2>
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Time</th>
          <th>IP</th>
          <th>Method</th>
          <th>Status</th>
          <th>Size</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {data.slice(0, 20).map((d, i) => (
          <tr key={i}>
            {/* <td>{parseLogDate(d.timestamp)}</td> */}
            <td>{d.timestamp}</td>
            <td>{d.ip}</td>
            <td>{d.method}</td>
            <td>{d.status}</td>
            <td>{d.size}</td>
            <td>{d.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
