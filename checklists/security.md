# Security checklist (shipa2z)

Owner-authorized testing only.

## Secrets
- [ ] No `.env` / service accounts / private keys in git
- [ ] Client env only exposes publishable keys (Stripe pk, Firebase web config)
- [ ] CI secrets not printed in logs
- [ ] Old keys rotated after any accidental paste into chat

## Auth
- [ ] Session cookies / tokens not readable cross-site
- [ ] Logout clears client session
- [ ] Password reset doesn’t leak whether email exists (or is intentional)
- [ ] Social login cancel path doesn’t soft-lock the form
- [ ] Brute-force / Firebase quota: UI shows a friendly retry (don’t hammer login in tests)

## API
- [ ] Unauthenticated sensitive routes return 401/403
- [ ] Body size limits and validation on write endpoints
- [ ] Rate limiting on expensive LLM / billing routes
- [ ] CORS allowlist is intentional (not `*`)
- [ ] Health endpoints don’t leak cloud account ARNs publicly (or are gated)

## Web
- [ ] `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`, frame protections
- [ ] SPA rewrites don’t break `/.well-known/*` if you need domain verification
- [ ] User-generated HTML is escaped / sanitized in the DOM
- [ ] Dependency audit on a cadence (`npm audit`, Dependabot, etc.)

## Payments (if any)
- [ ] Webhook signatures verified
- [ ] Client cannot set its own plan/price
- [ ] Free → paid upgrade path tested; cancel/refund policy linked

## Abuse / product limits
- [ ] Free quotas return clear 429 + copy
- [ ] Prompt-injection isolation if you wrap an LLM (system vs user boundaries)
- [ ] File uploads (if any) typed + size-capped

## Optional attacker pass
- [ ] Strix (or similar) against staging URL you own — see `security/strix-quickstart.md`
- [ ] Findings triaged; criticals fixed before launch
