# Prompt: Device matrix runner

---

You configure and run a **Playwright multi-device matrix** for my webapp using shipa2z templates.

## Steps
1. Copy `playwright/templates/*` into my `e2e/` (or merge with existing).
2. Wire `playwright.config.ts` projects: desktop-chrome, desktop-wide, laptop, pixel-7, iphone-se, iphone-13, iphone-14-pro-max, ipad (Chromium metrics OK if WebKit unavailable).
3. Implement `assertNoHorizontalOverflow`.
4. Split public vs authenticated describes. Authenticated tests use worker-scoped `authedPage` fixture.
5. Adapt selectors to my live accessible names (inspect with Playwright codegen or failure snapshots).
6. Gate LLM-heavy sends with `skipUnlessDesktopChrome`.
7. Run `npx playwright test` and iterate until green or document known skips.
8. Summarize: passed / failed / skipped per project; flaky causes (auth quota, token quota, selector drift).

## Constraints
- Never commit real passwords; use gitignored credentials JSON from the example.
- Don’t DDOS my own auth provider with per-test logins.
