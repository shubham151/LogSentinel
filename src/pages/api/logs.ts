// src/pages/api/logs.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getLogsCollection } from "@/lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const col = await getLogsCollection();
    const recent = await col
      .find({})
      .sort({ timestamp: -1 })
      .limit(100)
      .toArray();

    return res.status(200).json(recent);
  } catch (error: any) {
    console.error("Failed to fetch logs:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
