import { Tool } from "langchain/tools";
import { getLogsCollection } from "@/lib/mongodb";

export class QueryLogsTool extends Tool {
  name = "mongodb-log-retriever";
  description = `
Use this tool to query HTTP logs stored in MongoDB.

Input MUST be a JSON string with optional keys:
- "status": integer (e.g. 500)
- "method": string (e.g. "GET", "POST")
- "ip": string (e.g. "127.0.0.1")
- "timeRangeMinutes": integer (e.g. 30)
- "limit": integer (e.g. 5)

If no time or filter is specified, it will return the N most recent logs.
Example: {"limit": 5}
`;

  async _call(input: string): Promise<string> {
    try {
      const params = JSON.parse(input);
      const filter: any = {};
      const limit = Number(params.limit) || 50;

      if (params.status) filter.status = params.status;
      if (params.method) filter.method = params.method.toUpperCase();
      if (params.ip) filter.ip = params.ip;
      if (params.timeRangeMinutes) {
        filter.timestamp = {
          $gte: new Date(Date.now() - params.timeRangeMinutes * 60_000),
        };
      }

      const col = await getLogsCollection();
      const docs = await col
        .find(filter)
        .sort({ timestamp: -1 })
        .limit(limit)
        .toArray();

      return docs.length
        ? JSON.stringify(docs, null, 2)
        : "No matching log entries found.";
    } catch (err: any) {
      return `❌ Invalid input or query failed: ${err.message}`;
    }
  }
}

export const queryLogsTool = new QueryLogsTool();
