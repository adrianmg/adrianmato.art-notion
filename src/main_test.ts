import { assert, assertExists } from "jsr:@std/assert";
import { retrieveDataFromDB, fetchStatistics } from "./main.ts";


Deno.test("retrieveDataFromDB returns expected structure", async () => {
  const data = await retrieveDataFromDB();
  assert(Array.isArray(data));
  assert(data.length > 0, "Should return at least one record");
  for (const record of data) {
    assertExists(record.id, "id should exist");
    assert(typeof record.id === "number", "id should be a number");
    assertExists(record.slug, "slug should exist");
    assert(typeof record.slug === "string", "slug should be a string");
    assertExists(record.downloads, "downloads should exist");
    assert(typeof record.downloads === "number", "downloads should be a number");
    assertExists(record.createdAt, "createdAt should exist");
    assert(typeof record.createdAt === "string");
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    assert(
      isoDateRegex.test(record.createdAt),
      `createdAt is not ISO: ${record.createdAt}`,
    );
  }
});

Deno.test("fetchStatistics returns valid JSON response with expected structure", async () => {
  const response = await fetchStatistics();
  const json = await response.json();
  assert(Array.isArray(json));
  assert(json.length > 0, "Should return at least one record");
  for (const record of json) {
    assertExists(record.id, "id should exist");
    assert(typeof record.id === "number", "id should be a number");
    assertExists(record.slug, "slug should exist");
    assert(typeof record.slug === "string", "slug should be a string");
    assertExists(record.downloads, "downloads should exist");
    assert(typeof record.downloads === "number", "downloads should be a number");
    assertExists(record.createdAt, "createdAt should exist");
    assert(typeof record.createdAt === "string");
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    assert(
      isoDateRegex.test(record.createdAt),
      `createdAt is not ISO: ${record.createdAt}`,
    );
  }
});
