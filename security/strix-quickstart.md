# Strix quickstart (shipa2z)

[Strix](https://github.com/usestrix/strix) is an open-source AI pentest agent.  
**Only scan systems you own or have written permission to test.**

## Paths

### A) Strix Cloud
```bash
pip install strix-agent   # or: curl -sSL https://strix.ai/install | bash
strix cloud login --scope-profile recommended
strix cloud domains add --domain staging.example.com --asset-type web_app
# Prove ownership via DNS TXT, meta tag, or /.well-known/strix-verify.txt
strix cloud domains verify <domain-id>
strix cloud scans start --engagement-type live_test --domain-ids <domain-id> --scan-tier lite --wait
```

Hosting tip: SPA `** → index.html` rewrites are fine **if the verify file exists as a real static file** (Firebase serves existing files before rewrites). Don’t ignore `.*` folders if you deploy `.well-known`.

### B) Local OSS (Docker + your LLM key)
```bash
# Docker must be running
export STRIX_LLM="openrouter/z-ai/glm-5.3"
export LLM_API_KEY="…"
strix -n -t https://staging.example.com --scan-mode quick --max-budget 10 \
  --instruction "Authorized owner pentest. Focus on auth, IDOR, XSS, API 401s."
```

Results land in `strix_runs/` (gitignored here).

## After the scan
1. Read `penetration_test_report.md`
2. Fix P0/P1 in your app
3. Retest
4. Keep credentials out of the public repo
