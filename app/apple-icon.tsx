import { ImageResponse } from "next/og";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        background: "#faf6ed",
        color: "#713e44",
        fontSize: 100,
      }}
    >
      <svg
        width="120"
        height="120"
        viewBox="0 0 64 64"
        fill="none"
        stroke="#713e44"
        strokeWidth="1.4"
      >
        <path d="M32 48C15 37 20 19 32 9c12 10 17 28 0 39Z" />
        <path d="M32 48C15 49 7 34 9 22c14 0 23 11 23 26Zm0 0c17 1 25-14 23-26-14 0-23 11-23 26Z" />
        <path d="M32 48C14 57 4 46 3 35c13-2 24 3 29 13Zm0 0c18 9 28-2 29-13-13-2-24 3-29 13ZM16 56h32" />
      </svg>
    </div>,
    size,
  );
}
