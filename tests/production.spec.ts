import { test, expect, type Page } from "@playwright/test";
import { weddingConfig as config } from "../config/wedding";
import { resolveSiteUrl } from "../lib/site-url";

async function open(page: Page) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: config.opening.buttonLabel }).click();
  await expect(page.locator(".invitation-cover")).toHaveCount(0);
}

test("section navigation moves keyboard focus and restores browser history", async ({
  page,
}) => {
  await open(page);
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Our story" })
    .click();
  await expect(page.locator("#story h2")).toBeFocused();
  await page.goBack();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await page.goForward();
  await expect(page.locator("#story h2")).toBeFocused();
  await page.getByRole("link", { name: "Skip to invitation" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
});

test("mobile navigation focuses the destination after closing the dialog", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await open(page);
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "The venue" })
    .click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.locator("#venue h2")).toBeFocused();
  await expect(page.locator("#venue")).toBeInViewport();
});

test("guests can pause and resume all decorative motion", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: config.opening.buttonLabel }).click();
  await expect(page.locator(".invitation-experience")).toHaveAttribute(
    "data-phase",
    "open",
    { timeout: 6000 },
  );
  await page.getByRole("button", { name: "Pause motion", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Resume motion" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".nature-atmosphere")).toHaveCount(0);
  await expect(page.locator(".petals")).toHaveCount(0);
  await expect(page.locator(".hero-light")).toHaveCSS("animation-name", "none");
  await page.getByRole("button", { name: "Resume motion" }).click();
  await expect(page.locator(".nature-atmosphere")).toHaveCount(1);
  await expect(
    page.getByRole("button", { name: "Pause motion", exact: true }),
  ).toHaveAttribute("aria-pressed", "false");
});

test("missing pages have a working route back to the invitation", async ({
  page,
}) => {
  const response = await page.goto("/a-missing-invitation-page");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "Your invitation awaits" }),
  ).toBeVisible();
  await page.screenshot({ path: "test-results/missing-page.png" });
  await page.getByRole("link", { name: "Return to the invitation" }).click();
  await expect(
    page.getByRole("button", { name: config.opening.buttonLabel }),
  ).toBeVisible();
});

test("runtime failures show a recovery screen and can be retried", async ({
  page,
}) => {
  await open(page);
  await page.evaluate(() => {
    const original = HTMLDialogElement.prototype.showModal;
    HTMLDialogElement.prototype.showModal = function () {
      HTMLDialogElement.prototype.showModal = original;
      throw new Error("Simulated dialog failure for recovery check");
    };
  });
  await page
    .getByRole("button", { name: "Open image: In every lifetime, you" })
    .click();
  await expect(
    page.getByRole("heading", { name: "A little pause" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Try again" }).click();
  await expect(
    page.getByRole("button", { name: config.opening.buttonLabel }),
  ).toBeVisible();
});

test("music errors allow a retry instead of leaving the control disabled", async ({
  page,
}) => {
  await page.route("**/audio/**", (route) => route.abort());
  await open(page);
  const play = page.getByRole("button", { name: "Play background music" });
  await play.click();
  await expect(page.getByRole("status")).toHaveText(
    "The music couldn’t load. Tap to try again.",
  );
  await expect(play).toBeEnabled();
  await page.unroute("**/audio/**");
  await play.click();
  await expect(
    page.getByRole("button", { name: "Pause background music" }),
  ).toHaveAttribute("aria-pressed", "true");
});

test("response headers, discovery routes, and calendar metadata are production-safe", async ({
  request,
}) => {
  const response = await request.get("/");
  expect(response.headers()["x-content-type-options"]).toBe("nosniff");
  expect(response.headers()["x-frame-options"]).toBe("SAMEORIGIN");
  expect(response.headers()["x-powered-by"]).toBeUndefined();
  expect((await request.get("/robots.txt")).status()).toBe(200);
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).not.toContain("localhost");
  const calendar = await (await request.get("/api/calendar")).text();
  const stamp = /DTSTAMP:(\d{8})T/.exec(calendar)![1];
  expect(stamp).toBe(new Date().toISOString().slice(0, 10).replaceAll("-", ""));
  for (const line of calendar.split("\r\n"))
    expect(Buffer.byteLength(line)).toBeLessThanOrEqual(75);
});

test("public URLs reject credentials, paths, and unsafe schemes", () => {
  expect(resolveSiteUrl("https://wedding.example")?.href).toBe(
    "https://wedding.example/",
  );
  expect(resolveSiteUrl("")).toBeUndefined();
  for (const value of [
    "javascript:alert(1)",
    "https://user:pass@example.com",
    "https://example.com/path",
    "https://example.com/?token=private",
  ])
    expect(() => resolveSiteUrl(value)).toThrow();
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  test("the date, couple, venue, and map remain available", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      `${config.couple.bride} & ${config.couple.groom}`,
    );
    await expect(
      page.getByRole("link", { name: "View on Google Maps" }),
    ).toHaveAttribute("href", config.venue.mapUrl);
    await expect(page.locator(".fallback-card")).toBeVisible();
    await expect(page.locator(".fallback-card")).toContainText(
      config.venue.name,
    );
    await page.screenshot({
      path: "test-results/no-javascript-mobile.png",
      fullPage: true,
    });
  });
});

test.describe("touch gestures", () => {
  test.use({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 3,
  });
  test("a phone stays locked until opened, scrolls naturally, and supports gallery swipes", async ({
    page,
    context,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const cdp = await context.newCDPSession(page);
    async function swipe(x1: number, y1: number, x2: number, y2: number) {
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchStart",
        touchPoints: [{ x: x1, y: y1 }],
      });
      for (let i = 1; i <= 8; i++) {
        await cdp.send("Input.dispatchTouchEvent", {
          type: "touchMove",
          touchPoints: [
            { x: x1 + ((x2 - x1) * i) / 8, y: y1 + ((y2 - y1) * i) / 8 },
          ],
        });
        await page.waitForTimeout(20);
      }
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchEnd",
        touchPoints: [],
      });
    }
    await swipe(190, 650, 190, 300);
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
    await page.getByRole("button", { name: config.opening.buttonLabel }).tap();
    await swipe(190, 650, 190, 300);
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(150);
    await page.locator("#gallery").scrollIntoViewIfNeeded();
    await page
      .getByRole("button", { name: "Open image: In every lifetime, you" })
      .tap();
    const box = (await page.locator(".lightbox-photo").boundingBox())!;
    await swipe(
      box.x + box.width * 0.85,
      box.y + box.height / 2,
      box.x + box.width * 0.15,
      box.y + box.height / 2,
    );
    await expect(page.getByText("2 / 4")).toBeVisible();
    await page.screenshot({ path: "test-results/touch-gallery-mobile.png" });
    await page.getByRole("button", { name: "Close gallery" }).tap();
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });
});

// Diagnostic timings are recorded, not treated as real-user Core Web Vitals.
test("production mobile loading audit", async ({ page, context }, testInfo) => {
  test.skip(
    process.env.TEST_SERVER_MODE !== "production",
    "Run against the optimized server",
  );
  test.slow();
  await page.setViewportSize({ width: 390, height: 844 });
  const cdp = await context.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 150,
    downloadThroughput: 200_000,
    uploadThroughput: 90_000,
  });
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await page.addInitScript(() => {
    const metrics = { lcp: 0, cls: 0 };
    Object.assign(window, { invitationMetrics: metrics });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) metrics.lcp = entry.startTime;
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as (PerformanceEntry & {
        hadRecentInput: boolean;
        value: number;
      })[])
        if (!entry.hadRecentInput) metrics.cls += entry.value;
    }).observe({ type: "layout-shift", buffered: true });
  });
  await page.goto("/");
  await expect
    .poll(
      () =>
        page
          .locator(".gatefold-art img")
          .first()
          .evaluate(
            (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
          ),
      { timeout: 30000 },
    )
    .toBe(true);
  await page.waitForTimeout(1500);
  await page.screenshot({ path: "test-results/audit-mobile-cover.png" });
  const metrics = await page.evaluate(() => ({
    ...(
      window as unknown as { invitationMetrics: { lcp: number; cls: number } }
    ).invitationMetrics,
    resources: performance.getEntriesByType("resource").map((entry) => ({
      name: entry.name.replace(location.origin, ""),
      bytes: (entry as PerformanceResourceTiming).encodedBodySize,
    })),
  }));
  await testInfo.attach("mobile-loading-metrics", {
    body: JSON.stringify(metrics, null, 2),
    contentType: "application/json",
  });
  console.log(
    "Mobile loading audit",
    JSON.stringify({
      lcpMs: Math.round(metrics.lcp),
      cls: metrics.cls,
      bytes: metrics.resources.reduce(
        (sum, resource) => sum + resource.bytes,
        0,
      ),
    }),
  );
  await cdp.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 0,
    downloadThroughput: -1,
    uploadThroughput: -1,
  });
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 1 });
  await page.getByRole("button", { name: config.opening.buttonLabel }).click();
  await expect(page.locator(".invitation-experience")).toHaveAttribute(
    "data-phase",
    "open",
    { timeout: 10000 },
  );
  await page.keyboard.press("Escape");
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const id of ["couple", "story", "events", "venue", "gallery"]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await page
      .locator(`#${id}`)
      .screenshot({ path: `test-results/audit-mobile-${id}.png` });
  }
});
