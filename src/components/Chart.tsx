"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Area,
} from "recharts";
import styles from "./Chart.module.css";

interface ChartProps {
  data: any[];
}

const parseApacheTimestamp = (raw: string): Date | null => {
  const match = raw.match(
    /^(\d{2})\/([A-Za-z]{3})\/(\d{4}):(\d{2}):(\d{2}):(\d{2}) ([+\-]\d{4})$/
  );
  if (!match) return null;

  const [, day, mon, year, hour, min, sec, tz] = match;
  const months = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };

  const month = months[mon as keyof typeof months];
  const iso = `${year}-${month}-${day}T${hour}:${min}:${sec}${tz.slice(
    0,
    3
  )}:${tz.slice(3)}`;
  return new Date(iso);
};

const formatChartData = (data: any[]) => {
  return data
    .map((d) => {
      const dt = parseApacheTimestamp(d.timestamp);
      return {
        time: dt
          ? dt.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
          : "Invalid",
        status: d.status,
      };
    })
    .filter((d) => d.time !== "Invalid")
    .reduce((acc, curr) => {
      const existing = acc.find((x) => x.time === curr.time);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({ time: curr.time, count: 1 });
      }
      return acc;
    }, [] as { time: string; count: number }[]);
};

export const Chart: React.FC<ChartProps> = ({ data }) => {
  const chartData = formatChartData(data);

  return (
    <div className={styles.chartContainer}>
      <h2 className={styles.chartTitle}>Requests Over Time</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            angle={-30}
            textAnchor="end"
            height={60}
            tick={{ fontSize: 12 }}
          />
          <YAxis allowDecimals={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f1f1f",
              border: "1px solid #333",
              borderRadius: 8,
              color: "#fff",
            }}
            labelStyle={{ color: "#fff" }}
            itemStyle={{ color: "#fff" }}
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#007aff"
            fill="#e6f0ff"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#007aff"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
