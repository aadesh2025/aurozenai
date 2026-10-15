import { ImageResponse } from "next/og";

export const alt = "AUROZEN AI: engineering intelligent systems for business growth";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#09090f", color: "#f3f3f8" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 100 100"><path fillRule="evenodd" fill="#d9d9e4" d="M41 3H59L97 96H73C70 84 61 74 50 72C39 74 30 84 27 96H3L41 3ZM50 24L67 63C61 60 55 60 51 63V74H49V63C45 60 39 60 33 63L50 24Z" /></svg>
          <div style={{ fontSize: 34, letterSpacing: 10, color: "#cfcfdc" }}>AUROZEN AI</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, lineHeight: 1.02, letterSpacing: -3, maxWidth: 980 }}>Engineering intelligent systems for business growth.</div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#a493ff" }}>AI consulting · automation · agents · integration</div>
        </div>
      </div>
    ),
    size,
  );
}
