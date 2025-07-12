# Deno Project

A minimal Deno project that fetches download stats from the database behind https://adrianmato.art and stores them in a Notion table.

## Scripts

- Start: `deno task start`
- Test: `deno task test`
- Lint: `deno lint`
- Format: `deno fmt`

## Project Structure

- `src/main.ts` — Entry point
- `src/test.ts` — Tests (DB + Notion)
- `src/utils.ts` — Environment loader
- `deno.json` — Deno configuration
- `README.md` — Project info
