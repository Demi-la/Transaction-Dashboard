import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/Header";
import SideBar from "@/components/sideBar/SideBar";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Transaction Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex h-screen">
        <SideBar />
        <div className="flex flex-col w-full">
          <Header />
          <main className="flex-1 overflow-auto p-4 bg-gray-100 text-black pt-[7rem]">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
