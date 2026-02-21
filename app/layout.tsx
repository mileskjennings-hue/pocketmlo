import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PocketMLO - The Next Generation of Mortgage Advisory",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
