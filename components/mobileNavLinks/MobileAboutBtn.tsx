"use client";

import Link from "next/link";
import { Info, Table } from "lucide-react";
import { DrawerClose } from "@/components/ui/drawer";
import DiagnosticLink from "@/components/diagnostics/DiagnosticLink";

const MobileAllServicesBtn = () => {
  return (
    <DrawerClose asChild>
      <Link
        href="/about"
        className="text-neutral-300 py-2 px-4 flex flex-reverse gap-2 justify-center items-center w-fit border border-neutral-300 rounded-xl"
      >
        <Info size={28} />
        <span>About Us</span>
      </Link>
    </DrawerClose>
  );
};

export default MobileAllServicesBtn;
