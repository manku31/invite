# Vipul & Priya — Wedding invitation

A complete Indian wedding invitation built with Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Motion, and Lucide. An embossed gatefold invitation opens into an illustrated palace, readable serif names, spiritual motifs, miniature-art scenes and a gentle journey with petals and drifting leaves.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Production:

```bash
npm run build
npm start
```

The production command uses Next.js's supported Webpack compiler. Development uses Turbopack. Fonts and artwork are self-hosted; the site does not depend on external font or image services.

## Make it your invitation

Edit **`config/wedding.ts`**. Names, full names, parents, dates, timezone, milestones, events, venues, directions, portraits, gallery, text, music, social metadata, and social links live here. The invitation is configured for Vipul Sharma and Priya Sharma, with celebrations on 25–26 November 2026. The family names, story, four events, contacts and map link follow the supplied final details.

- Dates are ISO 8601 strings with a UTC offset, e.g. `2026-11-25T11:00:00+05:30`. Change `timeZone` too if appropriate. The countdown targets midnight at the start of 26 November in India. No ceremony time was supplied, so the calendar saves an all-day wedding using `calendarDate` and the exclusive `calendarEndDate`. Event times are explicitly labeled; no ceremony time is inferred.
- Put your own photographs in `public/images/` and update the image paths and descriptive alt text. The included couple, family, gallery and venue artwork are illustrations, not photographs of Vipul, Priya, their families or the actual venue. Replace the relevant entries with personal photos when available.
- Replace `hero.illustration` with a wide palace scene. Keep its central arch clear for live text. Names automatically scale down for longer names.
- Replace `opening.artwork` with your own portrait paper artwork. Cover copy, monogram initials, date, and city remain live text from the config. `opening.guidedScroll` controls the optional seven-second drift into the couple section after opening.
- `experience.smoothWheel` enables gentle desktop wheel easing. Mobile touch, keyboard scrolling, browser zoom, and scrollable dialogs keep their native behavior. Any guest interaction cancels the introductory drift.
- `experience.nature` controls the butterflies, birds, leaves, and breeze individually. `experience.chapterLabels` supplies the short transitions between the invitation, couple, story, and celebrations.
- Decorative animation and automatic scrolling honor the device’s reduced-motion preference.
- Each event has its own map URL. Available event icons: `flower`, `sun`, `music`, `heart`, `sparkles`; tones: `sage`, `gold`, `rose`.
- Music starts only after a guest taps its control, pauses when the page is hidden, and can be retried if loading fails. Replace `music.src` with your licensed audio, or set `music.enabled: false`. The active 40-second loop is an original synthesized shehnai-inspired instrumental with a tonic drone and a gentle volume fade-in. Recreate it with `node scripts/generate-music.mjs`.
- The supplied brief lists Pawa as the main venue and Desuri as the wedding ceremony location. Both are preserved visibly, with the morning Baraat departing Pawa. The supplied short Google Maps link is used unchanged; other events link to a Pawa locality search because no exact residence address was supplied. Confirm the venue heading and map destination before sharing.
- Add `{ label, url }` entries to `socialLinks` if desired.

## Sharing and deployment

Deploy to a host supporting Next.js (including its image optimizer and route handlers). Before building, set the public URL in the deployment environment:

```env
NEXT_PUBLIC_SITE_URL=https://your-invitation.example
```

You can set `sharing.url` in the config instead. See `.env.example`. Use an origin such as `https://your-wedding.com`, without a path, query, or credentials. Build again after changing the URL: metadata, robots, and sitemap are generated at build time. Without a URL, development remains usable, canonical links are omitted, the sitemap is empty, and indexing is disabled. Set `seo.allowIndexing: false` if you prefer to keep the published invitation out of search results; this does not restrict access to its URL.

The invitation provides generated Open Graph and Twitter images, a lotus favicon and Apple icon, theme color, and an all-day `.ics` wedding calendar download. Verify your production URL and sample content before sharing. No deployment has been performed automatically.

## Structure

- `app/`: server-rendered page, layout, metadata, generated sharing images, calendar route, and design styles.
- `components/wedding/`: individual invitation scenes and interactions.
- `components/ui/`: reusable headings, ornaments, buttons, image/text reveals, Motion provider, and accessible native dialog.
- `config/wedding.ts`: editable wedding content.
- `lib/`: date/countdown helpers, hydration-safe motion preferences, lazy animation features, and scrolling behavior.
- `public/illustrations/`, `public/images/`, `public/audio/`: original local assets.
- `docs/design-reference.md`: reference observations and design plan.
- `docs/assets.md`: illustration provenance and the exact generation prompts.

## Verification

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:production
```

Or run `npm run verify` for lint, TypeScript, the optimized build, and the complete production browser suite. The production suite starts an isolated server on port 3217 and includes a simulated slower-network loading report. Run `npm audit --omit=dev` to check the installed production dependencies.

The Playwright suite covers 360, 375, 390, 412, 430, 768, and 1440 px layouts; sealed-cover scroll locking; touch scrolling and gallery swipes; keyboard opening; gradual panel reveals; interruptible guided scrolling; deep links and browser history; focus restoration; runtime error recovery; missing-page navigation; audio opt-in and failure/retry; countdown boundaries; calendar and social-image responses; reduced motion and pause/resume; no-JavaScript access; response headers; and automated WCAG accessibility checks.

On macOS, tests use installed Google Chrome when available. Else run `npx playwright install chromium`, or provide `PLAYWRIGHT_CHROMIUM_EXECUTABLE`. Set `TEST_BASE_URL` to verify an already-running server; this skips automatic server startup. Screenshots, measurements, and failure traces are saved under `test-results/` and are ignored by Git. Touch tests use Chromium phone emulation; a physical iPhone/Android check is still useful before sending the final invitation.

The gallery dialog and animation feature bundle load separately. Images use `next/image`, fixed aspect ratios, lazy loading below the fold, and WebP/AVIF optimization. The cover and palace are preloaded at sizes suitable for their mobile crops. Reduced-motion preferences open the invitation immediately on activation and disable ambient animation, parallax, guided scrolling, and reveal delays. Without JavaScript, a readable invitation with names, date, venue, directions, tap-to-call contacts and calendar download remains available.

Until a guest opens the cover, the underlying invitation is inert, hidden from assistive technology, and cannot scroll. Opening is available with a tap, click, Enter, or Space; focus moves to the wedding heading afterward. Every page load begins sealed, including direct links to sections, which reveal their destination after opening.
