import React from "react";
import Navbar from "../../components/Navbar";
import MobileNavbar from "@/components/MobileNavbar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-work-sans ml-[calc(var(--sidebar-width)*2.5)]">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="block md:hidden">
        <MobileNavbar />
      </div>
      {children}
    </main>
  );
}
