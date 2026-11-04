/**
 * shipa2z full matrix — adapt routes/names to your product.
 */
import { expect, test } from '@playwright/test'
import { test as authedTest } from './fixtures'
import {
  assertNoHorizontalOverflow,
  composerSend,
  dismissCookie,
  ensureInApp,
  skipUnlessDesktopChrome,
} from './helpers'

const PUBLIC_PATHS = ['/', '/login', '/signup', '/privacy', '/terms'] as const

test.describe('shipa2z · public', () => {
  for (const path of PUBLIC_PATHS) {
    test(`load ${path} · no overflow`, async ({ page }) => {
      await page.goto(path)
      await dismissCookie(page)
      await expect(page.locator('body')).toBeVisible()
      await assertNoHorizontalOverflow(page)
    })
  }

  test('landing primary CTAs visible', async ({ page }) => {
    await page.goto('/')
    await dismissCookie(page)
    // TODO: match your marketing CTAs
    await expect(page.getByRole('link', { name: /get started|start|sign up|log in/i }).first()).toBeVisible()
    await assertNoHorizontalOverflow(page)
  })

  test('login controls', async ({ page }) => {
    await page.goto('/login')
    await dismissCookie(page)
    await expect(page.getByLabel(/^email$/i)).toBeVisible()
    await expect(page.getByLabel(/^password$/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /log in|sign in/i })).toBeVisible()
  })
})

authedTest.describe('shipa2z · authenticated', () => {
  authedTest('app shell loads', async ({ authedPage: page }) => {
    await ensureInApp(page)
    await assertNoHorizontalOverflow(page)
  })

  authedTest('primary authed controls', async ({ authedPage: page }) => {
    await ensureInApp(page)
    // TODO: replace with your real chrome (settings, new item, etc.)
    await expect(page.getByRole('link', { name: /settings|profile|account/i }).or(
      page.getByRole('button', { name: /settings|profile|account/i }),
    ).first()).toBeVisible()
    await assertNoHorizontalOverflow(page)
  })

  authedTest('optional composer smoke (desktop only)', async ({ authedPage: page }, testInfo) => {
    skipUnlessDesktopChrome(testInfo)
    await ensureInApp(page)
    const box = page.getByPlaceholder(/message|ask|type/i)
    if (!(await box.isVisible().catch(() => false))) {
      testInfo.skip(true, 'no composer on this product')
      return
    }
    await box.fill(`shipa2z ${Date.now()}`)
    await composerSend(page).click()
    await expect(page.locator('body')).toBeVisible()
  })
})
