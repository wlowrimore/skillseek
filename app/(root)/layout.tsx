import React from "react";
import Navbar from "../../components/Navbar";
import MobileNavbar from "@/components/MobileNavbar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-work-sans">
      <Navbar />
      <MobileNavbar />
      {children}
    </main>
  );
}
