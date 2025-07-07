import { Client } from "jsr:@db/postgres";
import { loadEnv } from "./utils.ts";

const { DB_USER, DB_HOST, DB_PORT, DB_DATABASE, DB_PASSWORD } = loadEnv();

export interface StatRecord {
  id: number;
  slug: string;
  downloads: number;
  createdAt: string;
}

export async function retrieveDataFromDB(): Promise<StatRecord[]> {
  const dbClient = new Client({
    user: DB_USER,
    hostname: DB_HOST,
    port: DB_PORT,
    database: DB_DATABASE,
    password: DB_PASSWORD,
  });

  try {
    await dbClient.connect();
    const query =
      'SELECT id, slug, downloads, "createdAt" FROM stats ORDER BY downloads DESC';
    const queryResult = await dbClient.queryObject<StatRecord>(query);
    return queryResult.rows.map((row: any) => ({
      ...row,
      createdAt: new Date(row.createdAt).toISOString(),
    }));
  } catch (error) {
    console.error("DB error:", error);
    throw new Error(
      `error fetching stats: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  } finally {
    await dbClient.end();
  }
}

export async function fetchStatistics(): Promise<Response> {
  const stats = await retrieveDataFromDB();
  return new Response(JSON.stringify(stats), {
    headers: { "Content-Type": "application/json" },
  });
}


