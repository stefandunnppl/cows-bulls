import type { Metadata } from "next";

import { AppProviders } from "@/Providers/AppProviders";
import clsx from "clsx";
import { Poppins } from "next/font/google";

import "./global.scss";

export const metadata: Metadata = {
  title: "Totally Awesome Cows 'n Bulls",
  description: "A much better version of cows and bulls",
};

const poppings = Poppins({
  weight: ["500"],
  subsets: ["latin"],
  variable: "--sans-font",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(poppings.className, "antialiased")}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
