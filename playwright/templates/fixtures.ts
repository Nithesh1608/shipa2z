import { test as base, expect, type BrowserContext, type Page } from '@playwright/test'
import { dismissCookie, loginAsE2E } from './helpers'

/**
 * One IdP login per worker. Needed when auth persistence is IndexedDB
 * (e.g. Firebase) which Playwright storageState does not capture.
 */
export const test = base.extend<{ authedPage: Page }, { loggedInWorker: BrowserContext }>({
  loggedInWorker: [
    async ({ browser }, use, testInfo) => {
      const context = await browser.newContext({ ...testInfo.project.use })
      const page = await context.newPage()
      await loginAsE2E(page)
      await dismissCookie(page)
      await page.close()
      await use(context)
      await context.close()
    },
    { scope: 'worker' },
  ],

  authedPage: async ({ loggedInWorker }, use) => {
    const page = await loggedInWorker.newPage()
    await use(page)
    await page.close()
  },
})

export { expect }
