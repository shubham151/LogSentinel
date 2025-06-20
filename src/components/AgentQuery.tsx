"use client";
import { useState, useEffect, FormEvent } from "react";
import styles from "./AgentQuery.module.css";
import { marked } from "marked";

export function AgentQuery() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [htmlOutput, setHtmlOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setResponse("");
    setHtmlOutput("");

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      const data = await res.json();
      setResponse(data.output);
      const html = await marked.parse(data.output || "");
      setHtmlOutput(html);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Ask the Log Agent</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g., show me errors from the last 10 minutes"
          className={styles.input}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading} className={styles.button}>
          {isLoading ? "Working..." : "Ask"}
        </button>
      </form>

      {error && <div className={styles.error}>{error}</div>}

      {htmlOutput && (
        <div className={styles.response}>
          <h3>Agent's Answer:</h3>
          <pre>
            <div dangerouslySetInnerHTML={{ __html: htmlOutput }} />
          </pre>
        </div>
      )}
    </div>
  );
}
