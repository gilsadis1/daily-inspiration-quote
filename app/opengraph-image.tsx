import { ImageResponse } from "next/og";

export const alt = "SparkQuest - ציטוט יומי לילדים סקרנים";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7f2e8",
          color: "#18201c",
          padding: "72px",
          fontFamily: "Arial",
          direction: "ltr"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 42, fontWeight: 800, color: "#1f6f50" }}>SparkQuest</div>
          <div
            style={{
              width: 112,
              height: 112,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 28,
              background: "#1f6f50",
              color: "#fffaf0",
              fontSize: 62,
              fontWeight: 900
            }}
          >
            S
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 82, fontWeight: 900, lineHeight: 1.08 }}>
            Daily inspiration for curious kids
          </div>
          <div style={{ maxWidth: 900, color: "#5f6a63", fontSize: 34, lineHeight: 1.45 }}>
            A short quote, a small story, and a reason to keep learning.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            color: "#154b38",
            fontSize: 30,
            fontWeight: 800
          }}
        >
          <span>joinsparkquest.com</span>
          <span style={{ color: "#f3b44b" }}>•</span>
          <span>Hebrew emails</span>
        </div>
      </div>
    ),
    size
  );
}
