import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { getCountdown } from "../lib/utils";
import { weddingConfig as config } from "../config/wedding";

async function openInvitation(page: Page) {
  await page.getByRole("button", { name: config.opening.buttonLabel }).click();
  await expect(page.locator(".invitation-experience")).toHaveAttribute(
    "data-phase",
    "open",
    { timeout: 6000 },
  );
  await page.keyboard.press("Escape");
}

let clientErrors: string[] = [];
test.beforeEach(async ({ page }) => {
  clientErrors = [];
  page.on("pageerror", (error) => clientErrors.push(error.message));
});
test.afterEach(() => {
  expect(clientErrors).toEqual([]);
});

test("countdown handles timezones and never counts below zero", () => {
  const before = new Date(config.weddingDate).getTime() - 90061000;
  expect(getCountdown(config.weddingDate, before)).toEqual({
    days: 1,
    hours: 1,
    minutes: 1,
    seconds: 1,
    complete: false,
  });
  expect(
    getCountdown(
      config.weddingDate,
      new Date(config.weddingDate).getTime() + 1000,
    ),
  ).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0, complete: true });
});

test("invitation loads with metadata and no client errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await openInvitation(page);
  await expect(page).toHaveTitle(
    `${config.couple.groom} & ${config.couple.bride} — Wedding Invitation`,
  );
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    config.couple.bride,
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /opengraph-image/,
  );
  await expect(page.locator(".countdown-number").first()).not.toHaveText("—");
  await expect(page.locator(".hero-scroll")).toHaveCSS("opacity", "1");
  await page.screenshot({ path: "test-results/desktop-opening.png" });
  expect(errors).toEqual([]);
});

for (const width of [360, 375, 390, 412, 430, 768, 1440]) {
  test(`layout fits ${width}px and key controls remain inside viewport`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: width < 700 ? 844 : 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await openInvitation(page);
    await expect(page.locator(".hero-names")).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
    for (const selector of [".hero-names", ".events-grid", ".gallery-grid"]) {
      const box = await page.locator(selector).boundingBox();
      expect(box).not.toBeNull();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(width + 1);
    }
    if (width === 390) {
      await page.screenshot({ path: "test-results/mobile-opening.png" });
      // Bring each section into view so lazy-loaded images are decoded.
      for (const id of ["couple", "story", "events", "venue", "gallery"]) {
        await page.locator(`#${id}`).scrollIntoViewIfNeeded();
        for (const image of await page.locator(`#${id} img`).all()) {
          await image.scrollIntoViewIfNeeded();
          await expect
            .poll(() =>
              image.evaluate(
                (element: HTMLImageElement) =>
                  element.complete && element.naturalWidth > 0,
              ),
            )
            .toBe(true);
        }
        await page
          .locator(`#${id}`)
          .screenshot({ path: `test-results/mobile-${id}.png` });
      }
      await page.screenshot({
        path: "test-results/mobile-full.png",
        fullPage: true,
      });
    }
  });
}

test("mobile menu supports navigation, Escape, and focus restoration", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await openInvitation(page);
  const trigger = page.getByRole("button", { name: "Open navigation" });
  await trigger.click();
  await expect(
    page.getByRole("dialog", { name: "Navigation", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Our Story" })
    .click();
  await expect(page).toHaveURL(/#story$/);
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("gallery supports arrows, wrapping, focus containment and Escape", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await openInvitation(page);
  const trigger = page.getByRole("button", {
    name: "Open image: In every lifetime, you",
  });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Gallery", exact: true });
  await expect(dialog).toBeVisible();
  await page.keyboard.press("ArrowLeft");
  await expect(
    dialog.getByText(`${config.gallery.length} / ${config.gallery.length}`),
  ).toBeVisible();
  await page.getByRole("button", { name: "Next image" }).click();
  await expect(dialog.getByText(`1 / ${config.gallery.length}`)).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(dialog.getByText(`2 / ${config.gallery.length}`)).toBeVisible();
  for (let i = 0; i < 5; i++) await page.keyboard.press("Tab");
  expect(
    await page.evaluate(() => !!document.activeElement?.closest("dialog")),
  ).toBe(true);
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test("music starts only by choice and can be paused", async ({ page }) => {
  const audioRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("/audio/")) audioRequests.push(request.url());
  });
  await page.goto("/");
  await openInvitation(page);
  expect(audioRequests).toEqual([]);
  await page.getByRole("button", { name: "Play background music" }).click();
  await expect(
    page.getByRole("button", { name: "Pause background music" }),
  ).toHaveAttribute("aria-pressed", "true");
  expect(audioRequests.length).toBeGreaterThan(0);
  await page.getByRole("button", { name: "Pause background music" }).click();
  await expect(
    page.getByRole("button", { name: "Play background music" }),
  ).toHaveAttribute("aria-pressed", "false");
});

test("reduced motion stops decorative animation and renders the invitation immediately", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await openInvitation(page);
  await expect(page.locator(".petals")).toHaveCount(0);
  await expect(page.locator(".hero-names .animated-text").first()).toHaveCSS(
    "opacity",
    "1",
  );
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
});

test("calendar and social images are valid downloadable responses", async ({
  request,
}) => {
  const calendar = await request.get("/api/calendar");
  expect(calendar.status()).toBe(200);
  expect(calendar.headers()["content-type"]).toContain("text/calendar");
  const content = await calendar.text();
  expect(content).toContain("DTSTART;VALUE=DATE:20261126");
  expect(content).toContain("DTEND;VALUE=DATE:20261127");
  expect(content).toContain("BEGIN:VEVENT");
  const image = await request.get("/opengraph-image");
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toContain("image/png");
  expect((await request.get("/icon.svg")).status()).toBe(200);
});

test("automated accessibility checks pass on the main page", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await openInvitation(page);
  await page.locator(".closing-section").scrollIntoViewIfNeeded();
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

test("wedding details, event locations and phone links match the final invitation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await openInvitation(page);
  await expect(page.locator(".hero-names")).toHaveText(
    /Vipul\s*Sharma\s*&\s*Priya\s*Sharma/,
  );
  await expect(page.locator(".hero-weekday")).toHaveText("Thursday");
  await expect(page.locator(".family-section")).toContainText(
    "S/o Shri Kaluram Narayanlalji Sharma",
  );
  await expect(page.locator(".family-section")).toContainText(
    "& Smt. Vimla Kaluram Sharma",
  );
  await expect(page.locator(".family-section")).toContainText(
    "D/o Shri Ramlalji Nenmalji Sharma",
  );
  await expect(page.locator(".family-section")).toContainText(
    "& Smt. Chanda Ramlalji Sharma",
  );
  await expect(page.locator(".event-stationery h3")).toHaveText([
    "Mayra",
    "Haldi",
    "Bandoli",
    "Wedding",
  ]);
  await expect(page.locator(".event-stationery").nth(0)).toContainText(
    "11:00 AM onwards",
  );
  await expect(page.locator(".event-stationery").nth(1)).toContainText(
    "5:00 PM onwards",
  );
  await expect(page.locator(".event-stationery").nth(2)).toContainText(
    "9:00 PM onwards",
  );
  await expect(page.locator(".event-stationery").nth(3)).toContainText(
    "Morning — Baraat from Pawa",
  );
  await expect(page.locator(".event-stationery").nth(3)).toContainText(
    "Desuri, Pali, Rajasthan",
  );
  await expect(
    page.getByRole("link", { name: "Open Wedding Location in Google Maps" }),
  ).toHaveAttribute(
    "href",
    "https://maps.app.goo.gl/7ArPgKcF4HhBkJ3M7?utm_source=chatgpt.com",
  );
  await expect(
    page.getByRole("link", { name: "Call +91 99698 10685" }),
  ).toHaveAttribute("href", "tel:+919969810685");
  await expect(
    page.getByRole("link", { name: "Call +91 90016 50630" }),
  ).toHaveAttribute("href", "tel:+919001650630");
  await expect(page.locator("main")).not.toContainText(
    /Aarya|Deepal|Mehta|Leela|Udaipur|Reception|Sangeet/,
  );
});

test("live countdown reaches the wedding day at midnight in India and stays at zero", async ({
  page,
}) => {
  await page.clock.install({ time: new Date("2026-11-25T18:29:58Z") });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await openInvitation(page);
  await page.clock.pauseAt(new Date("2026-11-25T18:29:59Z"));
  await expect(page.locator(".countdown-number").last()).toHaveText("01");
  // The one-second interval may begin between wall-clock second boundaries.
  await page.clock.runFor(2000);
  await expect(page.locator(".countdown-number")).toHaveText([
    "00",
    "00",
    "00",
    "00",
  ]);
  await expect(page.locator(".countdown-section h2")).toHaveText(
    "Our forever has begun",
  );
  await page.clock.runFor(5000);
  await expect(page.locator(".countdown-number")).toHaveText([
    "00",
    "00",
    "00",
    "00",
  ]);
});
