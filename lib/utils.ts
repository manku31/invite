import { weddingConfig } from "@/config/wedding";

export function formatDate(
  date: string,
  options: Intl.DateTimeFormatOptions = {},
) {
  return new Intl.DateTimeFormat(weddingConfig.locale, {
    timeZone: weddingConfig.timeZone,
    ...options,
  }).format(new Date(date));
}

export function longDate(date: string) {
  return formatDate(date, { day: "numeric", month: "long", year: "numeric" });
}

export function eventTime(date: string) {
  return formatDate(date, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).toUpperCase();
}

export function timeZoneLabel(date: string) {
  return (
    new Intl.DateTimeFormat(weddingConfig.locale, {
      timeZone: weddingConfig.timeZone,
      timeZoneName: "short",
    })
      .formatToParts(new Date(date))
      .find((part) => part.type === "timeZoneName")?.value ||
    weddingConfig.timeZone
  );
}

export const coupleNames = `${weddingConfig.couple.groom} & ${weddingConfig.couple.bride}`;

export function getCountdown(target: string, now: number) {
  const remaining = Math.max(0, new Date(target).getTime() - now);
  return {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor((remaining / 3600000) % 24),
    minutes: Math.floor((remaining / 60000) % 60),
    seconds: Math.floor((remaining / 1000) % 60),
    complete: remaining === 0,
  };
}
