# Playwright templates (shipa2z)

Drop these into your app’s `e2e/` folder and adapt.

## Files

| Template | Purpose |
|----------|---------|
| `playwright.config.ts` | Multi-device projects |
| `helpers.ts` | Overflow assert, cookie dismiss, login with backoff, composer helper, desktop-only skip |
| `fixtures.ts` | Worker-scoped authenticated browser context (Firebase-friendly) |
| `full-matrix.spec.ts` | Public + authed smoke clicks |
| `.auth-credentials.example.json` | Rename locally; never commit real secrets |

## Install

```bash
npm i -D @playwright/test
npx playwright install chromium
```

## Env

```bash
export PLAYWRIGHT_BASE_URL=https://staging.example.com
```

## Why worker auth?

Many vibecoded apps use Firebase Auth (or similar) with **IndexedDB** persistence. Playwright `storageState` saves cookies + localStorage — **not** IndexedDB — so “save login once” silently fails and every test re-logins until the IdP returns `quota-exceeded`.

The fixture logs in **once per worker**, then opens new pages in that same context.

## Customize

Search for `TODO` / `example.com` / placeholder route names and replace with your product’s copy and paths.
