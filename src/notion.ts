import { Client } from "npm:@notionhq/client";
import { loadEnv } from "./utils.ts";

const { NOTION_API_KEY, NOTION_DATABASE_ID } = await loadEnv();
const notion = new Client({ auth: NOTION_API_KEY });

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

async function testDatabaseAccess() {
  try {
    const response = await notion.databases.retrieve({ database_id: NOTION_DATABASE_ID });
    // The title property is an array of rich text objects, but may not be typed
    console.log("Database access OK:", (response as any).title?.[0]?.plain_text || "Untitled");
    return true;
  } catch (error) {
    console.error("No access or database not found:", error instanceof Error ? error.message : error);
    return false;
  }
}

export async function writeToNotion(data: unknown[]) {
  return "test";
}

export async function writeMockStatToNotion() {
  try {
    const response = await notion.pages.create({
      parent: { database_id: NOTION_DATABASE_ID },
      properties: {
        slug: {
          title: [{ text: { content: "mock-slug" } }],
        },
        downloads: {
          number: 123,
        },
        "date": {
          date: { start: new Date().toISOString() },
        },
      },
    });
    console.log("Mock stat written to Notion:", response.id);
    return response;
  } catch (error) {
    console.error("Failed to write mock stat to Notion:", error instanceof Error ? error.message : error);
    throw error;
  }
}

// await testNotionConnection();
// await testDatabaseAccess();
// await writeMockStatToNotion();
