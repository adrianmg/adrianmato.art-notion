# Deno Project

A minimal Deno project that fetches download stats from the database behind https://adrianmato.art and stores them in a Notion table.

<img width="1942" height="1483" alt="image" src="https://github.com/user-attachments/assets/2fa6e37d-7a60-41a3-9f4d-fc449ee91745" />


## Scripts

- Start: `deno task start`
- Test: `deno task test`
- Lint: `deno lint`
- Format: `deno fmt`

## Project structure

- `src/main.ts` — Entry point
- `src/notion.ts` — Notion API calls
- `src/test.ts` — Tests (DB + Notion)
- `src/utils.ts` — Environment loader
- `.github/workflows/notion-daily.yml` — Syncs data daily via GitHub Actions
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

NOTION_API_KEY: Notion integration API keyptest
NOTION_DATABASE_ID: Notion database ID
```

For GitHub Actions, add these as repository secrets in `Settings → Secrets and variables → Actions`.
