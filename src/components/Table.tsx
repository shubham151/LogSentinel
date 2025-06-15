// src/components/Table.tsx
import React from "react";
import styles from "./Table.module.css";

interface TableProps {
  data: any[];
}

export const Table: React.FC<TableProps> = ({ data }) => (
  <div className={styles.container}>
    <h2 className={styles.title}>Latest Logs</h2>
    <table className={styles.table}>
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
            {/* <td>{parseLogDate(d.timestamp)}</td> */}
            <td>{d.timestamp}</td>
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
