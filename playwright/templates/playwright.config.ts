import { defineConfig, devices } from '@playwright/test'

/**
 * shipa2z multi-device matrix
 * https://playwright.dev/docs/emulation
 */
const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:5173'

export default defineConfig({
  testDir: './e2e',
  timeout: 120_000,
  expect: { timeout: 20_000 },
  fullyParallel: false,
  workers: 1,
  retries: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 20_000,
  },
  projects: [
    {
      name: 'desktop-chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'desktop-wide',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1920, height: 1080 } },
    },
    {
      name: 'laptop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1366, height: 768 } },
    },
    {
      name: 'pixel-7',
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'iphone-se',
      use: { ...devices['iPhone SE'], browserName: 'chromium' },
    },
    {
      name: 'iphone-13',
      use: { ...devices['iPhone 13'], browserName: 'chromium' },
    },
    {
      name: 'iphone-14-pro-max',
      use: { ...devices['iPhone 14 Pro Max'], browserName: 'chromium' },
    },
    {
      name: 'ipad',
      use: { ...devices['iPad Pro 11'], browserName: 'chromium' },
    },
  ],
})
