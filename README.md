# shipa2z

**A-to-Z checks before you ship a vibecoded webapp.**

Your app looks fine on your laptop. Then someone opens it on a phone, a button name doesn’t match what the test looks for, or login gets rate-limited because every test signs in again.

shipa2z is a free kit for that moment: Playwright templates, security and UI checklists, and copy-paste agent prompts. Nothing here is your product. You copy the files into **your** app and change the names to match it.

---

## Read this before you copy anything

The Playwright files are a **starting point**, not a finished test suite.

They look for example labels like “Log in”, “Email”, “Settings”, and routes like `/login` and `/app`. If your button says “Continue” or your home is `/chat`, the first run fails until you change those strings.

Search the copied files for `TODO`. Each one is a place you must edit.

---

## Start here

You need Node.js and your app running locally, or a staging URL you own.

### 1. Clone this kit

**Windows (PowerShell)**

```powershell
git clone https://github.com/Nithesh1608/shipa2z.git
cd shipa2z
```

**macOS / Linux**

```bash
git clone https://github.com/Nithesh1608/shipa2z.git
cd shipa2z
```

### 2. Copy into your app

`playwright.config.ts` goes next to your app’s `package.json`. The other test files go in `e2e/`. If you drop the config inside `e2e/`, Playwright looks in the wrong folder and nothing runs.

Replace `C:\path\to\your-app` or `/path/to/your-app` with your real app folder.

**Windows (PowerShell)** — run this from the `shipa2z` folder:

```powershell
$app = "C:\path\to\your-app"
New-Item -ItemType Directory -Force "$app\e2e","$app\.cursor\prompts","$app\.cursor\rules","$app\docs" | Out-Null
Copy-Item "playwright\templates\playwright.config.ts" "$app\playwright.config.ts"
Copy-Item "playwright\templates\helpers.ts","playwright\templates\fixtures.ts","playwright\templates\full-matrix.spec.ts" "$app\e2e\"
Copy-Item "playwright\templates\.auth-credentials.example.json" "$app\e2e\.auth-credentials.example.json"
Copy-Item "prompts\*.md" "$app\.cursor\prompts\"
Copy-Item "checklists\*.md","security\headers-baseline.md" "$app\docs\"
Copy-Item "cursor\rules\shipa2z-preflight.mdc" "$app\.cursor\rules\"
```

**macOS / Linux** — run this from the `shipa2z` folder:

```bash
APP=/path/to/your-app
mkdir -p "$APP/e2e" "$APP/.cursor/prompts" "$APP/.cursor/rules" "$APP/docs"
cp playwright/templates/playwright.config.ts "$APP/playwright.config.ts"
cp playwright/templates/helpers.ts playwright/templates/fixtures.ts playwright/templates/full-matrix.spec.ts "$APP/e2e/"
cp playwright/templates/.auth-credentials.example.json "$APP/e2e/"
cp prompts/*.md "$APP/.cursor/prompts/"
cp checklists/*.md security/headers-baseline.md "$APP/docs/"
cp cursor/rules/shipa2z-preflight.mdc "$APP/.cursor/rules/"
```

If your app already has a `playwright.config.ts`, don’t overwrite it. Merge the device projects from the template into yours.

### 3. Make the tests match your app

Open these files in **your** app and edit every `TODO`:

| File | What to change |
|------|----------------|
| `e2e/full-matrix.spec.ts` | Page paths, and the visible text of your real buttons and links |
| `e2e/helpers.ts` | Login path, where a logged-in user lands, cookie-banner button, Send button label |
| `e2e/.auth-credentials.example.json` | Copy it to `e2e/.auth-credentials.json` and put a **test** email and password in that copy |

`helpers.ts` imports `.auth-credentials.json` as soon as Playwright loads. Create that file before the first run, even if you only care about public pages.

Add this line to your app’s `.gitignore`:

```
e2e/.auth-credentials.json
```

Button text must be the **accessible name**: the words a screen reader hears (`aria-label`, or the visible label). “Send message” and “Send” are different. Match the name your UI actually exposes.

### 4. Install Playwright inside your app

From your app folder:

```bash
npm i -D @playwright/test
npx playwright install chromium
```

### 5. Run one browser first

Start your app (Vite’s default is `http://127.0.0.1:5173`). Then:

**Windows (PowerShell)**

```powershell
$env:PLAYWRIGHT_BASE_URL = "http://127.0.0.1:5173"
npx playwright test --project=desktop-chrome
```

**macOS / Linux**

```bash
PLAYWRIGHT_BASE_URL=http://127.0.0.1:5173 npx playwright test --project=desktop-chrome
```

When desktop is green, run every device:

```bash
npx playwright test
```

That covers desktop, a laptop size, Pixel 7, iPhone SE / 13 / 14 Pro Max, and iPad. Phone projects use Chromium with those device sizes, so you don’t need a Mac for the first pass.

### 6. Walk the checklists before you announce

In your app’s `docs/` folder:

1. `ui-design.md` — does the first screen look like your brand?
2. `security.md` plus `headers-baseline.md` — secrets, auth, headers, quotas
3. `pre-launch.md` — the last gate

---

## If a test fails

| What you see | What to do |
|--------------|------------|
| Button or link not found | Change the name in the spec to the accessible name on the page. Don’t switch the test to a CSS class. |
| Page not found / wrong screen | Change the path in `full-matrix.spec.ts` or `helpers.ts` (`/login`, `/app`, and the URL you wait for after login). |
| `Cannot find module './.auth-credentials.json'` | Create `e2e/.auth-credentials.json` from the example file. |
| Login says too many attempts / quota | Stop rerunning the suite in a tight loop. The fixture signs in once per device worker on purpose. |
| Horizontal overflow | That’s a real layout bug. Fix the page, not the assertion. |
| A chat box sends a real model request | That test runs on `desktop-chrome` only. Other devices only check the shell. |

A failure report opens with `npx playwright show-report` after a run.

---

## Use it with Cursor or any coding agent

Open **your app**, not this kit. Paste one file from `.cursor/prompts/` as the task:

| Prompt | Ask the agent to |
|--------|------------------|
| `01-strict-qa-checker.md` | Be a hostile QA. Adapt the tests to this app’s real names, then keep `desktop-chrome` green. |
| `02-security-auditor.md` | Walk `docs/security.md` and list fixes. |
| `03-ui-polish.md` | Fix the first screen so it doesn’t look like a default AI template. |
| `04-device-matrix-runner.md` | Run the device matrix and fix what fails. |

The optional Cursor rule is `.cursor/rules/shipa2z-preflight.mdc`.

---

## What’s in this repo

```
shipa2z/
├── README.md                      ← you are here
├── docs/how-it-works.md           ← why each lane exists
├── checklists/                    ← copy into your app’s docs/
├── prompts/                       ← paste into an agent chat
├── playwright/templates/          ← config + tests you edit
├── security/headers-baseline.md
└── cursor/rules/                  ← optional Cursor rule
```

| Lane | File | You use it to |
|------|------|----------------|
| Strict QA | `playwright/templates/` | Click real controls on many screen sizes |
| Security | `checklists/security.md`, `security/headers-baseline.md` | Catch missing headers, leaked keys, open APIs |
| UI | `checklists/ui-design.md`, `prompts/03-ui-polish.md` | Keep the first screen from looking generic |
| Launch gate | `checklists/pre-launch.md` | Decide if you can announce |

More detail: [docs/how-it-works.md](docs/how-it-works.md). Playwright notes: [playwright/README.md](playwright/README.md).

---

## Name

**shipa2z** means ship A-to-Z: the checks between “it runs on localhost” and “strangers will use it.”

## License

MIT. Use it, fork it, improve it.

PRs are welcome for device presets, Next.js / SvelteKit notes, and a GitHub Action that runs the public tests. Don’t PR private app source, customer data, or real passwords.

This kit is for testing apps you own.
