import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { weddingConfig as config } from "../config/wedding";

let errors: string[] = [];
test.beforeEach(async ({ page }) => {
  errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
});
test.afterEach(() => {
  expect(errors).toEqual([]);
});

test("sealed invitation is the only available control and cannot scroll", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#gallery");
  await expect(
    page.getByRole("button", { name: config.opening.buttonLabel }),
  ).toBeVisible();
  await expect(page.getByRole("button")).toHaveCount(1);
  await expect(page.locator(".invitation-content")).toHaveAttribute(
    "inert",
    "",
  );
  await expect(page.locator(".hero-blessing")).toHaveCSS("opacity", "0");
  await page.mouse.wheel(0, 900);
  await page.keyboard.press("PageDown");
  await page.evaluate(() => window.scrollTo(0, 1000));
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
  expect(await page.evaluate(() => document.documentElement.scrollHeight)).toBe(
    844,
  );
  await page.screenshot({ path: "test-results/sealed-cover-mobile.png" });
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    result.violations.map((item) => ({
      id: item.id,
      nodes: item.nodes.map((node) => node.target),
    })),
  ).toEqual([]);
});

test("cover fits the requested mobile sizes and landscape", async ({
  page,
}) => {
  await page.goto("/");
  for (const [width, height] of [
    [360, 740],
    [375, 812],
    [390, 844],
    [412, 915],
    [430, 932],
    [844, 390],
  ]) {
    await page.setViewportSize({ width, height });
    const box = await page.locator(".gatefold-stage").boundingBox();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.y).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(width + 1);
    expect(box!.y + box!.height).toBeLessThanOrEqual(height + 1);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({ path: "test-results/sealed-cover-desktop.png" });
});

test("keyboard opens the panels before unlocking the page", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: config.opening.buttonLabel }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator(".invitation-experience")).toHaveAttribute(
    "data-phase",
    "opening",
  );
  await expect(page.locator(".invitation-experience")).toHaveAttribute(
    "data-locked",
    "true",
  );
  await expect(page.locator(".invitation-experience")).toHaveAttribute(
    "data-phase",
    "revealing",
    { timeout: 3000 },
  );
  await page.screenshot({ path: "test-results/gatefold-opening.png" });
  await expect(page.locator(".invitation-experience")).toHaveAttribute(
    "data-phase",
    "open",
    { timeout: 5000 },
  );
  await expect(page.locator(".invitation-cover")).toHaveCount(0);
  await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
  await page.keyboard.press("Escape");
  await page.mouse.wheel(0, 600);
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeGreaterThan(100);
  await expect
    .poll(() => page.evaluate(() => Math.abs(window.scrollY - 600)))
    .toBeLessThan(2);
});

test("guided scroll begins slowly and stops when the guest takes over", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: config.opening.buttonLabel }).click();
  await expect(page.locator(".invitation-experience")).toHaveAttribute(
    "data-phase",
    "open",
    { timeout: 6000 },
  );
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
  await expect
    .poll(() => page.evaluate(() => window.scrollY), { timeout: 7000 })
    .toBeGreaterThan(30);
  await page.keyboard.press("Escape");
  const stoppedAt = await page.evaluate(() => window.scrollY);
  await page.waitForTimeout(900);
  expect(
    Math.abs((await page.evaluate(() => window.scrollY)) - stoppedAt),
  ).toBeLessThan(2);
});

test("reduced motion opens immediately with no ambient movement or auto scroll", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: config.opening.buttonLabel }).click();
  await expect(page.locator(".invitation-cover")).toHaveCount(0, {
    timeout: 1000,
  });
  await expect(page.locator(".hero-scroll")).toHaveCSS("opacity", "1");
  await expect(page.locator(".nature-atmosphere")).toHaveCount(0);
  await page.waitForTimeout(config.opening.guidedScroll.pauseMs + 300);
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
});

test("a section link opens the invitation before showing its destination", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#venue");
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
  await page.getByRole("button", { name: config.opening.buttonLabel }).click();
  await expect(page.locator("#venue")).toBeInViewport();
  await expect(
    page.getByRole("link", { name: "Open Wedding Location in Google Maps" }),
  ).toBeVisible();
});

test("nature is decorative, and smooth anchors connect the sections", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: config.opening.buttonLabel }).click();
  await expect(page.locator(".invitation-experience")).toHaveAttribute(
    "data-phase",
    "open",
    { timeout: 6000 },
  );
  await page.keyboard.press("Escape");
  await expect(page.locator(".nature-atmosphere")).toHaveAttribute(
    "aria-hidden",
    "true",
  );
  await expect(page.locator(".nature-atmosphere")).toHaveCSS(
    "pointer-events",
    "none",
  );
  await expect(page.locator(".garden-butterfly")).toHaveCount(0);
  await expect(page.locator(".garden-birds")).toHaveCount(0);
  await expect(page.locator(".wind-leaf")).toHaveCount(6);
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Our Story" })
    .click();
  await expect(page).toHaveURL(/#story$/);
  await expect
    .poll(
      async () =>
        Math.abs((await page.locator("#story").boundingBox())!.y - 90),
      { timeout: 5000 },
    )
    .toBeLessThan(4);
  await page.screenshot({ path: "test-results/connected-story-desktop.png" });
});
