import { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/lib/SmoothScroll";

export const metadata: Metadata = {
  title: "Heaven Furniture Mart | Designed. Crafted. Customized.",
  description:
    "Bespoke furniture and interior styling from Heaven Furniture Mart, Agrabad, Chattogram. Custom sofas, beds, dining sets, and office pieces built around you.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
