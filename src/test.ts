import { assert, assertExists } from "jsr:@std/assert";
import { retrieveDataFromDB, fetchStatistics } from "./db.ts";
import { testNotionConnection, syncDBToNotion } from "./notion.ts";

Deno.test("retrieveDataFromDB returns expected structure", async () => {
  const data = await retrieveDataFromDB();
  assert(Array.isArray(data));
  for (const record of data) {
    assertExists(record.id, "id should exist");
    assert(typeof record.id === "number", "id should be a number");
    assertExists(record.slug, "slug should exist");
    assert(typeof record.slug === "string", "slug should be a string");
    assertExists(record.downloads, "downloads should exist");
    assert(typeof record.downloads === "number", "downloads should be a number");
  }
});

Deno.test("fetchStatistics returns valid JSON response with expected structure", async () => {
  const response = await fetchStatistics();
  const json = await response.json();
  assert(Array.isArray(json));
  for (const record of json) {
    assertExists(record.id, "id should exist");
    assert(typeof record.id === "number", "id should be a number");
    assertExists(record.slug, "slug should exist");
    assert(typeof record.slug === "string", "slug should be a string");
    assertExists(record.downloads, "downloads should exist");
    assert(typeof record.downloads === "number", "downloads should be a number");
  }
});

Deno.test("Notion connection works", async () => {
  const result = await testNotionConnection();
  assert(result, "Should connect to Notion API");
});

Deno.test("Sync DB to Notion works", async () => {
  // This will clean existing pages from today and write fresh data
  await syncDBToNotion();
  // Test passes if no error is thrown - function handles clearing and writing
  assert(true, "Should sync DB to Notion without errors");
});
