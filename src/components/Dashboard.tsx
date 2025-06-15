"use client";

import useSWR from "swr";
import { Chart } from "./Chart";
import { Table } from "./Table";
// import { MapView } from "./MapView";
import styles from "./Dashboard.module.css";
import { useState } from "react";

type FetchError = Error & {
  info?: any;
  status?: number;
};

const fetcher = async (url: string): Promise<any> => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error(
      "An error occurred while fetching the data."
    ) as FetchError;
    try {
      error.info = await res.json();
    } catch {
      error.info = await res.text();
    }
    error.status = res.status;
    throw error;
  }
  return res.json();
};

export function Dashboard() {
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleString());
  const { data, error, isLoading } = useSWR<any[], FetchError>(
    "/api/logs",
    fetcher,
    {
      refreshInterval: 30000,
      onSuccess: () => {
        setLastUpdated(new Date().toLocaleString());
      },
    }
  );

  if (error) {
    console.error("SWR Error Details:", {
      status: error.status,
      info: error.info,
      message: error.message,
    });
    return (
      <div className={styles.dashboardContainer}>
        <div className={styles.sectionCard}>
          <p>⚠️ Failed to load logs. (Status: {error.status || "N/A"})</p>
          <p>Please check the browser console for more details.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.dashboardContainer}>Loading live dashboard…</div>
    );
  }

  if (!data) {
    return (
      <div className={styles.dashboardContainer}>No log data available.</div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.sectionCard}>
        <Chart data={data} />
      </div>

      {/* <div className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>Geospatial View</h2>
        <MapView data={data} />
      </div> */}

      <div className={styles.sectionCard}>
        <Table data={data} lastUpdated={lastUpdated} />
      </div>
    </div>
  );
}
