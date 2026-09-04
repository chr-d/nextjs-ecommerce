import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "amooozon",
  description: "Find the most amooozing deals on amooozon",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐮</text></svg>",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <div className="flex flex-col items-center">
            <div className="max-w-7xl">
              <Navbar />
              <main>{children}</main>
            </div>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
