"use client";

import Link from "next/link";
import { Table } from "lucide-react";
import { usePathname } from "next/navigation";
import { DrawerClose } from "@/components/ui/drawer";

const MobileAllServicesBtn = () => {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <DrawerClose asChild>
      <Link
        href="/"
        className="text-neutral-300 py-2 px-4 border border-neutral-300 rounded-xl flex flex-col justify-center items-center"
      >
        <span className="flex justify-center">
          <Table size={28} />
        </span>
        All Services
      </Link>
    </DrawerClose>
  );
};

export default MobileAllServicesBtn;
