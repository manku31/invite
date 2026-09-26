import { defineConfig } from "@playwright/test";
import { existsSync } from "node:fs";

const systemChrome =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const production = process.env.TEST_SERVER_MODE === "production";
const baseURL =
  process.env.TEST_BASE_URL || `http://127.0.0.1:${production ? 3217 : 3000}`;
const port = Number(new URL(baseURL).port || 3000);
export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  fullyParallel: false,
  workers: 1,
  reporter: "list",
  use: {
    baseURL,
    viewport: { width: 1440, height: 1000 },
    launchOptions: {
      executablePath:
        process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ||
        (existsSync(systemChrome) ? systemChrome : undefined),
    },
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: process.env.TEST_BASE_URL
    ? undefined
    : {
        command: `npm run ${production ? "start" : "dev"} -- --hostname 127.0.0.1 --port ${port}`,
        url: baseURL,
        reuseExistingServer: !process.env.CI && !production,
        timeout: 60000,
      },
});
