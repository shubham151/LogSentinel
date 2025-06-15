// src/app/page.tsx

"use client";

import { useState } from "react";
import { Dashboard } from "@/components/Dashboard";
import { AgentQuery } from "@/components/AgentQuery";
import styles from "@/components/Tabs.module.css";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"agent" | "dashboard" | "about">(
    "agent"
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Logsentinel | Agent for Log Analytics</h1>

      <div className={styles.tabHeader}>
        <button
          className={`${styles.tab} ${
            activeTab === "agent" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("agent")}
        >
          Log Agent
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "dashboard" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("dashboard")}
        >
          <span className={styles.live}>Live</span> Dashboard
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === "agent" && <AgentQuery />}
        {activeTab === "dashboard" && <Dashboard />}
      </div>
    </div>
  );
}
