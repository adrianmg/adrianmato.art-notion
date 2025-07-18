# Deno Project

A minimal Deno project that fetches download stats from the database behind https://adrianmato.art and stores them in a Notion table.

## Scripts

- Start: `deno task start`
- Test: `deno task test`
- Lint: `deno lint`
- Format: `deno fmt`

## Project structure

- `src/main.ts` — Entry point
- `src/test.ts` — Tests (DB + Notion)
- `src/utils.ts` — Environment loader
- `deno.json` — Deno configuration
- `README.md` — Project info

## Environment variables
To run the app and tests, set the following environment variables:

```
DB_USER: Database user
DB_HOST: Database host
DB_PORT: Database port
DB_DATABASE: Database name
DB_PASSWORD: Database password

NOTION_API_KEY: Notion integration API key
NOTION_DATABASE_ID: Notion database ID
```

For GitHub Actions, add these as repository secrets in `Settings → Secrets and variables → Actions`.
