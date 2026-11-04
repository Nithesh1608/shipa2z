# Security headers baseline (shipa2z)

Set these on your static host / CDN / reverse proxy (names vary by provider):

| Header | Example value |
|--------|----------------|
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` |
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` (or CSP `frame-ancestors`) |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | disable unused sensors (`camera=()`, `geolocation=()`, …) |
| `Content-Security-Policy` | start report-only; tighten once you know script sources |
| `Cross-Origin-Opener-Policy` | `same-origin` or `same-origin-allow-popups` if OAuth popups |

Verify with browser DevTools → Network → response headers on `/` and a hashed asset.
