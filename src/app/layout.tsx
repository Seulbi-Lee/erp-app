import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@/app/app.scss";
import ScheduleProvider from "./contexts/schedule.provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "planify",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" type="image/svg+xml" href="/logo_icon.svg"></link>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider>
          <ScheduleProvider>
            <main>{children}</main>
          </ScheduleProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
