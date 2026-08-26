import { ImageResponse } from "next/og";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

// Hardcoded from app/globals.css — ImageResponse renders in an isolated
// context (Satori) that doesn't resolve CSS custom properties, so the
// site's tokens are inlined here directly instead of referenced.
const tokens = {
  bg: "#faf9f5",
  border: "#e6e2d8",
  text: "#26241f",
  textMuted: "#6f6b60",
  accent: "#3f4a3b",
};

export function buildOgImage({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: tokens.bg,
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 26,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: tokens.accent,
            fontWeight: 600,
          }}
        >
          {eyebrow}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 64,
              lineHeight: 1.15,
              fontWeight: 700,
              color: tokens.text,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
          {description && (
            <div
              style={{
                display: "flex",
                fontSize: 28,
                lineHeight: 1.5,
                color: tokens.textMuted,
                maxWidth: 880,
              }}
            >
              {description}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `2px solid ${tokens.border}`,
            paddingTop: 32,
            fontSize: 26,
            color: tokens.text,
            fontWeight: 600,
          }}
        >
          <div style={{ display: "flex" }}>AK</div>
          <div style={{ display: "flex", fontSize: 22, color: tokens.textMuted, fontWeight: 400 }}>
            karthikampolu.in
          </div>
        </div>
      </div>
    ),
    { ...ogImageSize }
  );
}
