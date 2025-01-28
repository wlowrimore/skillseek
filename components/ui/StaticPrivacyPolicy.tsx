import React from "react";
import { Button } from "./button";
import Link from "next/link";
import { Link2 } from "lucide-react";

const StaticPrivacyPolicy = () => {
  return (
    <main className="fixed bottom-0 w-fit py-3 pl-2 pr-4 left-0 z-50 flex items-center gap-2 text-[1rem] bg-cyan-400/70 rounded-tr-lg hover:bg-cyan-500 hover:text-white transition duration-300">
      <Link2 />
      <Link href="/privacy-policy">Privacy Policy</Link>
    </main>
  );
};

export default StaticPrivacyPolicy;
