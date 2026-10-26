import { MongoClient, type Db } from "mongodb";

let clientPromise: Promise<MongoClient> | undefined;

/** One cached client per server instance so serverless invocations reuse the connection. */
export async function getDb(): Promise<Db> {
  const uri = process.env["MONGODB_URI"];
  if (!uri) throw new Error("MONGODB_URI is not set");
  clientPromise ??= new MongoClient(uri, { serverSelectionTimeoutMS: 8000 }).connect();
  try {
    const client = await clientPromise;
    return client.db(process.env["MONGODB_DB"] || "canton");
  } catch (err) {
    clientPromise = undefined;
    throw err;
  }
}
