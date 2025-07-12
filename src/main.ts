import { retrieveDataFromDB } from "./db.ts";
import { writeToNotion } from "./notion.ts";

const data = await retrieveDataFromDB();
await console.log(writeToNotion(data));

// test data retrieval
if (import.meta.main) {
  const stats = await retrieveDataFromDB();
  console.log(stats);
}
