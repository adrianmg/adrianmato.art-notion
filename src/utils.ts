import "jsr:@std/dotenv/load";

export function loadEnv() {
  return {
    DB_USER: Deno.env.get("DB_USER") ?? "default",
    DB_HOST: Deno.env.get("DB_HOST") ?? "",
    DB_PORT: Number(Deno.env.get("DB_PORT") ?? 5432),
    DB_DATABASE: Deno.env.get("DB_DATABASE") ?? "",
    DB_PASSWORD: Deno.env.get("DB_PASSWORD") ?? "",
    NOTION_API_KEY: Deno.env.get("NOTION_API_KEY") ?? "",
    NOTION_DATABASE_ID: Deno.env.get("NOTION_DATABASE_ID") ?? "",
  };
}
