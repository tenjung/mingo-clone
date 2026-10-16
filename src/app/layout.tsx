import type { Metadata } from "next";
import { CafeShell } from "@/components/cafe-shell";
import { cafe } from "@/domain/cafe";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: cafe.name,
    template: `%s · ${cafe.shortName}`,
  },
  description: cafe.description,
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <CafeShell>{children}</CafeShell>
      </body>
    </html>
  );
}
