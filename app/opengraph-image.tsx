import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { weddingConfig as config } from "@/config/wedding";
import { coupleNames, longDate } from "@/lib/utils";
export const alt = `${coupleNames} — Wedding invitation`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function Image() {
  const font = await readFile(
    path.join(
      process.cwd(),
      "node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-400-normal.woff",
    ),
  );
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#faf2e5",
        display: "flex",
        padding: 26,
        color: "#713e44",
        fontFamily: "Cormorant",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #b79b73",
          width: "100%",
          height: "100%",
          borderRadius: "240px 240px 0 0",
        }}
      >
        <div style={{ fontSize: 24, letterSpacing: 5, marginTop: 32 }}>
          TOGETHER WITH OUR FAMILIES
        </div>
        <div style={{ fontSize: 110, marginTop: 30 }}>{coupleNames}</div>
        <div style={{ fontSize: 34, marginTop: 18 }}>
          Invite you to celebrate a beautiful beginning
        </div>
        <div style={{ fontSize: 30, marginTop: 40 }}>
          {`${longDate(config.weddingDate)} · ${config.homeLocation}`}
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [{ name: "Cormorant", data: font, style: "normal", weight: 400 }],
    },
  );
}
