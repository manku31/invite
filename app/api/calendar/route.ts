import { weddingConfig as config } from "@/config/wedding";
import { coupleNames } from "@/lib/utils";
const utc = (value: string) =>
  new Date(value)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
const escape = (value: string) =>
  value
    .replaceAll("\\", "\\\\")
    .replaceAll("\n", "\\n")
    .replaceAll(",", "\\,")
    .replaceAll(";", "\\;");
// RFC 5545: fold UTF-8 content lines at 75 octets without splitting characters.
function fold(line: string) {
  let result = "",
    bytes = 0;
  for (const character of line) {
    const size = Buffer.byteLength(character);
    if (bytes + size > 75) {
      result += "\r\n ";
      bytes = 1;
    }
    result += character;
    bytes += size;
  }
  return result;
}
export function GET() {
  const calendar =
    [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Wedding Invitation//EN",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      `UID:wedding-${utc(config.weddingDate)}@invitation`,
      `DTSTAMP:${utc(new Date().toISOString())}`,
      `DTSTART;VALUE=DATE:${config.calendarDate}`,
      `DTEND;VALUE=DATE:${config.calendarEndDate}`,
      `SUMMARY:${escape(`${coupleNames} — Our Wedding`)}`,
      `LOCATION:${escape(config.venue.ceremonyLocation)}`,
      `DESCRIPTION:${escape(`${config.seo.description}\n${config.venue.arrivalNote}\n${config.venue.mapUrl}`)}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ]
      .map(fold)
      .join("\r\n") + "\r\n";
  return new Response(calendar, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="our-wedding.ics"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
