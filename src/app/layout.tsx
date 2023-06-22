import { Navbar, Footer } from "@/components/sections";
import "./globals.css";
import { Sora } from "next/font/google";
import Providers from "@/components/utils/Providers";

import { ClerkProvider, auth } from "@clerk/nextjs";

const sora = Sora({ subsets: ["latin"], style: "normal" });

export const metadata = {
  title: "Dine Market",
  description: "Ecommerce shopping App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  return (
    <ClerkProvider>
      <Providers>
        <html lang="en">
          <body className={sora.className}>
            <Navbar userId={userId as string} />
            {children}
            <Footer />
          </body>
        </html>
      </Providers>
    </ClerkProvider>
  );
}
