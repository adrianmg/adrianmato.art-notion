import { Client } from "npm:@notionhq/client";
import { loadEnv } from "./utils.ts";
import { retrieveDataFromDB, type StatRecord } from "./db.ts";

const { NOTION_API_KEY, NOTION_DATABASE_ID } = await loadEnv();
const notion = new Client({ auth: NOTION_API_KEY });

export async function syncDBToNotion(): Promise<void> {
  try {
    console.log("Starting DB to Notion sync...");
    
    // Clear existing pages from today
    await clearTodaysPages();
    
    const stats = await retrieveDataFromDB();
    console.log(`Retrieved ${stats.length} records from database`);

    let successCount = 0;
    let errorCount = 0;

    for (const stat of stats) {
      try {
        await createNotionPage(stat);
        successCount++;
        console.log(`✓ Synced: ${stat.slug} (${stat.downloads} downloads)`);
      } catch (error) {
        errorCount++;
        console.error(`✗ Failed to sync ${stat.slug}:`, error instanceof Error ? error.message : error);
      }
    }

    const summary = errorCount > 0 
      ? `\x1b[33mSync completed: ${successCount} successful, ${errorCount} failed\x1b[0m`
      : `\x1b[32mSync completed: ${successCount} successful, ${errorCount} failed\x1b[0m`;
    console.log(summary);
  } catch (error) {
    console.error("Failed to sync DB to Notion:", error instanceof Error ? error.message : error);
    throw error;
  }
}

export async function testNotionConnection(): Promise<boolean> {
  try {
    const user = await notion.users.me({});
    console.log("Connected to Notion as:", user.name || user.id);
    return true;
  } catch (error) {
    console.error("Failed to connect to Notion:", error instanceof Error ? error.message : error);
    return false;
  }
}

export async function writeMockStatToNotion() {
  try {
    const mockStat: StatRecord = { id: 1, slug: "mock-slug", downloads: 123 };
    const response = await createNotionPage(mockStat);
    console.log("Mock stat written to Notion:", response.id);
    return response;
  } catch (error) {
    console.error("Failed to write mock stat to Notion:", error instanceof Error ? error.message : error);
    throw error;
  }
}

async function createNotionPage(stat: StatRecord) {
  return await notion.pages.create({
    parent: { database_id: NOTION_DATABASE_ID },
    properties: {
      slug: {
        title: [{ text: { content: stat.slug } }],
      },
      downloads: {
        number: stat.downloads,
      },
      "date": {
        date: { start: new Date().toISOString() },
      },
    },
  });
}

async function clearTodaysPages() {
  try {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    console.log(`Clearing existing pages from ${today}...`);
    
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        property: "date",
        date: {
          equals: today
        }
      }
    });

    let deletedCount = 0;
    for (const page of response.results) {
      try {
        await notion.pages.update({
          page_id: page.id,
          archived: true
        });
        deletedCount++;
      } catch (error) {
        console.error(`Failed to archive page ${page.id}:`, error instanceof Error ? error.message : error);
      }
    }
    
    if (deletedCount > 0) {
      console.log(`✓ Archived ${deletedCount} existing pages from today`);
    }
  } catch (error) {
    console.error("Failed to clear today's pages:", error instanceof Error ? error.message : error);
    // Don't throw - continue with sync even if clearing fails
  }
}
