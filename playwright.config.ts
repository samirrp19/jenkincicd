import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 5 * 60 * 1000, // 5 minutes
  testDir: './tests',
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'on-failure' }],
    ['allure-playwright'],
  ],
});
