# How shipa2z works

## The problem loop

```
vibecode → looks fine on laptop → ship → phone breaks / auth flakes / “AI UI”
         ↑______________ fix chat-by-chat ______________|
```

shipa2z replaces the loop with **lanes**:

```
vibecode → shipa2z lanes → green gates → ship
              │
              ├── Strict QA (Playwright device matrix)
              ├── Security (checklist + header baseline)
              ├── UI (anti-generic rules + polish prompt)
              └── Pre-launch (single checklist)
```

## Lane 1 — Strict QA

**Goal:** every important control works on many viewports; failures are reproducible.

**Mechanism:**

1. Playwright **projects** = Desktop / laptop / Pixel / iPhone / iPad.
2. Tests click by **role + accessible name** (what users and ATTs see).
3. `assertNoHorizontalOverflow` catches “designed on 1440px” bugs.
4. Authenticated suite uses a **worker-scoped browser context** so Firebase (IndexedDB) sessions survive across tests without re-login spam (which triggers `auth/quota-exceeded`).
5. Heavy LLM chat sends run on **desktop-chrome only**; other devices still exercise UI chrome.

Copy `playwright/templates/` into your app’s `e2e/`. Adapt selectors to *your* copy (“Log in” vs “Sign in”).

## Lane 2 — Security

**Goal:** don’t launch with open APIs, missing headers, or leaked keys.

**Mechanism:**

1. Human-readable `checklists/security.md`.
2. Baseline security headers list for hosting configs (`security/headers-baseline.md`).

## Lane 3 — UI polish

**Goal:** first viewport reads as a brand, not a template.

**Mechanism:**

1. Hard rules in `checklists/ui-design.md`.
2. Agent prompt `prompts/03-ui-polish.md` that refuses purple-gradient / cream-serif defaults unless the brand truly is that.

## Lane 4 — Pre-launch gate

**Goal:** one page you can print or paste into Notion: “are we allowed to announce?”

That’s `checklists/pre-launch.md`. If any row is red, you don’t ship.

## What shipa2z is not

- Not a hosted SaaS.
- Not a replacement for real pentests or legal review.
- Not your product’s source code.
- Not magic — you still wire selectors and credentials for *your* app.

## Suggested order on a new vibecoded app

1. Paste **UI polish** prompt → fix first viewport.
2. Drop Playwright templates → green public matrix on desktop.
3. Add auth fixture → green authed chrome on phones.
4. Security checklist → fix headers/secrets.
5. Pre-launch checklist → announce.
