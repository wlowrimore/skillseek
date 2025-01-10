"use client";

import Link from "next/link";
import { Info } from "lucide-react";
import { DrawerClose } from "@/components/ui/drawer";

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
