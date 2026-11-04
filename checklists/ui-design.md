# UI / design checklist (shipa2z)

For marketing and product surfaces built with AI agents.

## First viewport
- [ ] One composition (not a mini-dashboard) unless the product *is* a dashboard
- [ ] Brand/product name is hero-level, not only nav text
- [ ] Brand test: remove the nav — could this first screen belong to another product?
- [ ] Hero budget: brand, one headline, one short support line, one CTA group, one dominant visual
- [ ] No detached badges / floating promo chips on the hero image

## Layout
- [ ] One job per section (one headline + short support)
- [ ] Cards only when they contain a real interaction; otherwise flatten
- [ ] Full-bleed hero on landing (not a tiny rounded media card) unless the design system requires inset media
- [ ] Mobile: tap targets ≥ ~44px; safe-area respected under notches / home indicators

## Type & color
- [ ] Expressive fonts — avoid default Inter/Roboto/Arial stacks for brand surfaces
- [ ] Clear CSS variables / tokens; not ad-hoc hex soup
- [ ] Avoid AI-default looks unless intentional:
  - purple-on-white / purple→indigo gradients
  - warm cream + terracotta + serif “editorial” clone
  - dense broadsheet / zero-radius newspaper pastiche
- [ ] Don’t default to dark mode + glow + pill clusters + multi-layer shadows + emoji decoration

## Motion
- [ ] At least 2–3 intentional motions (presence/hierarchy), not perpetual noise
- [ ] Respect `prefers-reduced-motion`

## Content
- [ ] No em-dash addiction if your brand voice forbids it
- [ ] Legal/footer links actually go somewhere real
- [ ] Images show product/place/atmosphere — abstract gradients alone don’t count as the visual idea
