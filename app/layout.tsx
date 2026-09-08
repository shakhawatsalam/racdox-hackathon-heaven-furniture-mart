import { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/lib/SmoothScroll";
import PageReveal from "@/components/PageReveal/PageReveal";
import ScrollProgress from "@/components/ScrollProgress/ScrollProgress";

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
        <ScrollProgress />
        <SmoothScroll>
          <PageReveal>{children}</PageReveal>
        </SmoothScroll>
        <div className='bottom-blur' aria-hidden='true'>
          <div className='bottom-blur-layer bottom-blur-layer-soft' />
          <div className='bottom-blur-layer bottom-blur-layer-medium' />
          <div className='bottom-blur-layer bottom-blur-layer-strong' />
        </div>
      </body>
    </html>
  );
}
