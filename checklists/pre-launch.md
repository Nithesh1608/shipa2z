# Pre-launch checklist (shipa2z)

Tick every box. If you skip one, write why.

## Product
- [ ] Happy path works logged out → signup/intent → login → core feature → logout
- [ ] Empty states exist (no blank white voids)
- [ ] Errors are human-readable (no raw Firebase / Stripe dumps)
- [ ] Loading states don’t layout-shift the shell

## Devices
- [ ] Desktop Chrome matrix green
- [ ] At least one Android viewport green (e.g. Pixel)
- [ ] At least one iPhone viewport green (SE or 13)
- [ ] No horizontal overflow on public + primary authed screens
- [ ] Mobile browser chrome doesn’t cover header/composer (safe-area / `dvh`)

## Auth & data
- [ ] Protected routes redirect when logged out
- [ ] Email verification / age gates behave as intended
- [ ] No secrets in client bundles (scan for API keys)
- [ ] Staging and prod env separation is clear

## Security
- [ ] `checklists/security.md` completed
- [ ] Security headers present on hosting
- [ ] Rate limits / quotas fail gracefully
- [ ] Optional: Strix (or equivalent) run on **owned** staging

## UI / brand
- [ ] First viewport passes the brand test (nav removed → still recognizable)
- [ ] Not default AI purple / cream-editorial clone (unless that *is* the brand)
- [ ] Motion is intentional (2–3 moments), not noise
- [ ] Contrast is readable outdoors

## Legal / trust
- [ ] Privacy / Terms / refund or billing copy linked from footer
- [ ] Support email is real and monitored
- [ ] Pricing and renewal language is unambiguous

## Ops
- [ ] Error monitoring or at least server logs you can read
- [ ] Rollback plan (previous hosting release / previous image tag)
- [ ] Demo account ready for reviewers (not your personal admin)

## Announce
- [ ] Screenshot/video from a phone, not only desktop
- [ ] Known limitations listed (honest > hype)
- [ ] shipa2z matrix artifact or summary saved for yourself
