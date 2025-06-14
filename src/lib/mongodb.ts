import { MongoClient, Collection } from "mongodb";

const uri = process.env.MONGODB_URI!;
let client: MongoClient;
let logsCollection: Collection;

export async function getLogsCollection() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    logsCollection = client.db().collection("logs");
  }
  return logsCollection;
}
