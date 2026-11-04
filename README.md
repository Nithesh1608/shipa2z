# shipa2z

**A2Z checks before you ship a vibecoded webapp.**

You vibe-coded a product in a weekend. It looks fine on your laptop.  
Then a friend opens it on iPhone Safari and the composer sits under the browser chrome, the login button has the wrong accessible name, and a free-tier quota eats your demo.

**shipa2z** is an open-source preflight pack for that moment — the stuff people usually invent chat-by-chat with an AI coding agent, bundled as one reusable kit:

| Lane | What you get |
|------|----------------|
| **Strict QA** | Multi-device Playwright matrix that clicks real controls and fails loud |
| **Auth that survives Firebase** | Worker-scoped browser context (IndexedDB sessions don’t fit `storageState`) |
| **Security lane** | Headers/checklist + how to run [Strix](https://github.com/usestrix/strix) without inventing the workflow |
| **UI lane** | Anti-generic design rules so the first viewport isn’t “AI purple dashboard” |
| **Agent prompts** | Copy-paste Cursor / agent personas: strict checker, security auditor, UI polish |

No app source from anyone’s private product lives here. Templates are generic. You bring your repo.

---

## Why this exists

Vibecoding is great at *creating*. It is mediocre at *shipping*.

The failure mode is always the same:

1. Agent builds features.
2. You spot-check on one browser.
3. Production meets phones, free quotas, Firebase auth quotas, and “aria-label says Send message but the test looks for Send”.
4. You paste another 40 messages of “fix mobile”, “test every button”, “harden security”.

shipa2z turns those recurring chats into **named lanes** you can drop into any Vite/React (or similar) webapp and run before launch.

---

## Quick start

```bash
# clone
git clone https://github.com/Nithesh1608/shipa2z.git
cd shipa2z

# read the map
open docs/how-it-works.md   # or just read it in the editor

# copy what you need into YOUR app
cp -r playwright/templates/*   path/to/your-app/e2e/
cp prompts/*.md                path/to/your-app/.cursor/prompts/   # or paste into chat
cp checklists/pre-launch.md    path/to/your-app/docs/
```

Then in *your* app:

1. Set `PLAYWRIGHT_BASE_URL` to staging or prod you own.
2. Fill `e2e/.auth-credentials.example.json` → real file (gitignored).
3. `npx playwright install chromium && npx playwright test`
4. Walk `checklists/pre-launch.md` before you tweet the launch link.

---

## What’s in the box

```
shipa2z/
├── README.md                 ← you are here
├── docs/
│   ├── how-it-works.md       ← mental model + flow
│   └── viral-one-pager.md    ← shareable pitch
├── checklists/
│   ├── pre-launch.md         ← single launch gate
│   ├── security.md
│   └── ui-design.md
├── prompts/
│   ├── 01-strict-qa-checker.md
│   ├── 02-security-auditor.md
│   ├── 03-ui-polish.md
│   └── 04-device-matrix-runner.md
├── playwright/
│   ├── README.md
│   └── templates/            ← drop into your e2e/
├── security/
│   ├── strix-quickstart.md
│   └── headers-baseline.md
└── cursor/
    └── rules/                ← optional Cursor project rules
```

---

## The strict-checker idea

Don’t ask the agent “is it good?”  
Ask it to **be a hostile QA**:

- Every primary button/link on public + authed surfaces
- Desktop + laptop + Pixel + iPhone SE/13/14 + iPad viewports
- Assert **no horizontal overflow**
- Match **accessible names** (`getByRole`), not brittle CSS
- One login per device worker (Firebase Auth ≠ Playwright `storageState`)
- Burn LLM tokens on **one** desktop project; other devices click chrome only

The templates under `playwright/templates/` encode that. The prompt under `prompts/01-strict-qa-checker.md` is the chat persona.

---

## Security without cosplay

1. Walk `checklists/security.md` (auth, headers, secrets, quotas, well-known).
2. If you want an autonomous attacker, follow `security/strix-quickstart.md` — **only against targets you own**.
3. Keep findings in *your* private run folder; don’t commit secrets.

---

## UI that doesn’t look “AI default”

`checklists/ui-design.md` + `prompts/03-ui-polish.md` push agents away from:

- purple-on-white gradient landing clones  
- cream + terracotta “editorial” clones  
- card-soup heroes and pill-stat strips  

…and toward brand-first first viewports, real imagery, and intentional motion.

---

## How to use this with Cursor (or any agent)

1. Open your app repo.
2. Paste a prompt from `prompts/` as the system/task message.
3. Point the agent at the matching checklist.
4. For QA: copy Playwright templates, fill credentials, run the matrix.
5. For security: Strix cloud or OSS against **your** staging URL.
6. Tick `checklists/pre-launch.md` until it’s boringly green.

That’s the product: **one package instead of twenty half-remembered chats.**

---

## Name

**shipa2z** = *ship A-to-Z* — the unglamorous checklist between “it runs on localhost” and “strangers will use it.”

---

## License

MIT — use it, fork it, roast it, improve it.

## Contributing

PRs welcome for:

- more device presets  
- framework adapters (Next, SvelteKit, etc.)  
- better Strix / CI examples  
- sharper anti-generic UI rules  

Please **do not** PR proprietary app source, customer data, or real credentials.

---

## Disclaimer

This is a toolkit for owners testing their own apps. Do not point scanners or attack agents at systems you are not authorized to test.
