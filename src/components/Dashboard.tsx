// src/components/Dashboard.tsx

"use client"; // This directive is ESSENTIAL.

import useSWR from "swr";
import { Chart } from "./Chart";
import { Table } from "./Table";
import { MapView } from "./MapView";

// Define our custom error type to be type-safe
type FetchError = Error & {
  info?: any;
  status?: number;
};

// The robust fetcher that handles errors correctly
const fetcher = async (url: string): Promise<any> => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error(
      "An error occurred while fetching the data."
    ) as FetchError;
    try {
      error.info = await res.json();
    } catch (e) {
      error.info = await res.text();
    }
    error.status = res.status;
    throw error;
  }
  return res.json();
};

export function Dashboard() {
  // All data fetching and state management now lives here, in the Client Component.
  const { data, error, isLoading } = useSWR<any[], FetchError>(
    "/api/logs",
    fetcher,
    {
      refreshInterval: 30_000,
    }
  );

  // This error handling will now work correctly on the client side.
  if (error) {
    console.error("SWR Error Details:", {
      status: error.status,
      info: error.info,
      message: error.message,
    });
    return (
      <div>
        <p>Failed to load logs. (Status: {error.status || "N/A"})</p>
        <p>Please check the browser console for more details.</p>
      </div>
    );
  }

  if (isLoading) return <div>Loading live dashboard…</div>;
  if (!data) return <div>No log data available.</div>;

  // If data is available, render the child components with it.
  return (
    <>
      <Chart data={data} />
      <MapView data={data} />
      <Table data={data} />
    </>
  );
}
