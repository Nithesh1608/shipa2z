import { expect, type Page, type TestInfo } from '@playwright/test'
import credentials from './.auth-credentials.json' with { type: 'json' }

export const BASE = process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:5173'
export const E2E = credentials as { email: string; password: string; uid?: string }

async function sleep(ms: number) {
  await new Promise((r) => setTimeout(r, ms))
}

export async function dismissCookie(page: Page) {
  // TODO: match your banner button
  const gotIt = page.getByRole('button', { name: /got it|accept|agree/i })
  if (await gotIt.isVisible().catch(() => false)) {
    await gotIt.click()
  }
}

export async function assertNoHorizontalOverflow(page: Page) {
  const metrics = await page.evaluate(() => {
    const root = document.documentElement
    return {
      scrollWidth: Math.max(root.scrollWidth, document.body.scrollWidth),
      clientWidth: root.clientWidth,
    }
  })
  expect(
    metrics.scrollWidth,
    `horizontal overflow: ${metrics.scrollWidth} > ${metrics.clientWidth}`,
  ).toBeLessThanOrEqual(metrics.clientWidth + 1)
}

/** Composer send — many apps set aria-label "Send message", not bare "Send". */
export function composerSend(page: Page) {
  return page.getByRole('button', { name: /send message|^send$/i })
}

export async function loginAsE2E(page: Page) {
  for (let attempt = 1; attempt <= 6; attempt++) {
    await page.goto('/login') // TODO: your login path
    await dismissCookie(page)
    await page.getByLabel(/^email$/i).fill(E2E.email)
    await page.getByLabel(/^password$/i).fill(E2E.password)
    await page.getByRole('button', { name: /log in|sign in/i }).click()
    try {
      await page.waitForURL(/\/(app|chat|dashboard|home|onboarding)/, { timeout: 45_000 })
      return
    } catch (err) {
      const body = await page.locator('body').innerText().catch(() => '')
      const rateLimited = /too many|try again later|quota-exceeded|exceeded quota/i.test(body)
      if (attempt === 6 || !rateLimited) throw err
      await sleep(60_000 * attempt)
    }
  }
}

export async function ensureInApp(page: Page) {
  await page.goto('/app') // TODO: your authenticated home
  await dismissCookie(page)
  const shell = page.getByRole('main').or(page.getByPlaceholder(/message|search|ask/i))
  try {
    await shell.first().waitFor({ state: 'visible', timeout: 45_000 })
    return
  } catch {
    await loginAsE2E(page)
    await page.goto('/app')
    await expect(shell.first()).toBeVisible({ timeout: 45_000 })
  }
}

/** Burn expensive LLM/chat sends on one project only. */
export function skipUnlessDesktopChrome(testInfo: TestInfo, reason = 'heavy path on desktop-chrome only') {
  testInfo.skip(testInfo.project.name !== 'desktop-chrome', reason)
}
