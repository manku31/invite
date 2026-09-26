# Production review

The invitation retains the sealed gatefold opening and original palace artwork. The RSVP form, share button, and Ramayana section are removed.

## Improvements

- More readable mobile body copy, 44-pixel touch controls, safe-area spacing, and room between the floating controls.
- Keyboard section navigation moves focus to the destination; back/forward navigation restores the matching section or the opening.
- A pause/resume control stops ambient effects and guided scrolling while respecting the operating system’s reduced-motion setting.
- Touch scrolling remains native; horizontal swipes change gallery photographs without disabling pinch zoom.
- Music remains opt-in, pauses when the page is hidden, follows actual playback state, and recovers from failed downloads.
- Custom missing-page and runtime-error screens provide working recovery controls.
- JavaScript-disabled browsers can still read the couple, date, time, and venue and open directions or download the calendar.
- Timezone labels come from the configured timezone. Calendar creation timestamps reflect the generated file.
- Public URL validation, canonical metadata, configurable indexing, robots, sitemap, and baseline response headers are configured centrally.
- `npm run verify` runs lint, TypeScript, a production build, and the production browser checks.

## Validation approach

The production browser suite runs against `next start` on an isolated local port. It covers mobile widths 360–430 px, tablet and desktop, touch gestures, keyboard navigation, reduced motion, no JavaScript, media failure, runtime recovery, calendar downloads, metadata, and automated accessibility checks. The loading diagnostic uses 150 ms latency, approximately 1.6 Mbps download speed, and four-times CPU throttling. These are local simulations, not field Core Web Vitals or a guarantee about every guest’s device or connection.

Production dependency audit: no known vulnerabilities reported by `npm audit --omit=dev` on 26 September 2026. Dependency advisories can change; rerun before release.

## Before sharing with guests

1. Confirm or replace the demonstration names, family details, dates, venue, event descriptions, and photographs in `config/wedding.ts`.
2. Set `NEXT_PUBLIC_SITE_URL` to the real HTTPS origin in the hosting environment before building. See `.env.example`. The hostname must match the published website.
3. Run `npm run verify`, then deploy to a host supporting Next.js image optimization and route handlers.
4. Open the published invitation on a physical iPhone and Android phone, verify the directions and calendar, and inspect its WhatsApp link preview.

Without a configured public URL, the local preview builds successfully but does not advertise a canonical URL or sitemap entry. No hosting account, custom domain, or deployment is configured automatically.
