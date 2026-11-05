# Playwright templates

These files are a starting point. Button labels, routes, and the cookie banner must match **your** app. Search for `TODO` after you copy them.

## Where each file goes

| File | Put it |
|------|--------|
| `playwright.config.ts` | Your app root, next to `package.json` |
| `helpers.ts`, `fixtures.ts`, `full-matrix.spec.ts` | `e2e/` |
| `.auth-credentials.example.json` | `e2e/`, then copy to `e2e/.auth-credentials.json` (gitignored) |

`playwright.config.ts` sets `testDir` to `./e2e`. If the config sits inside `e2e/`, Playwright looks for `e2e/e2e` and finds nothing.

The full copy commands for Windows and macOS are in the repo [README](../README.md).

## Install (inside your app)

```bash
npm i -D @playwright/test
npx playwright install chromium
```

## Point at your app

**Windows (PowerShell)**

```powershell
$env:PLAYWRIGHT_BASE_URL = "http://127.0.0.1:5173"
npx playwright test --project=desktop-chrome
```

**macOS / Linux**

```bash
PLAYWRIGHT_BASE_URL=http://127.0.0.1:5173 npx playwright test --project=desktop-chrome
```

Run `npx playwright test` only after desktop is green. That adds laptop, Pixel, iPhone, and iPad sizes.

## What you must edit

| File | Change |
|------|--------|
| `full-matrix.spec.ts` | `PUBLIC_PATHS`, landing links, login labels, logged-in chrome |
| `helpers.ts` | `/login`, the URL after login, `/app`, cookie button, Send button name |
| `.auth-credentials.json` | A test user. `helpers.ts` imports this file on every run. |

Match **accessible names** (`getByRole`), not CSS classes. “Send message” is not the same as “Send”.

## Why one login per device

Firebase Auth (and similar) keeps the session in IndexedDB. Playwright’s `storageState` saves cookies and localStorage, not IndexedDB, so a saved login looks empty and every test signs in again until the provider returns a quota error.

`fixtures.ts` signs in once per worker, then opens new pages in that same browser context.

`skipUnlessDesktopChrome` keeps real chat/LLM sends on the desktop project. Other devices only check the shell.
