"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { DrawerClose } from "@/components/ui/drawer";

interface MobileContactBtnProps {
  className?: string;
}

const MobileContactBtn: React.FC<MobileContactBtnProps> = ({
  className = "text-neutral-300 py-2 px-4 border border-neutral-300 rounded-xl flex flex-1 flex-col justify-center items-center",
}) => {
  return (
    <DrawerClose asChild>
      <Link href="/contact" className={className}>
        <span className="flex justify-center">
          <Mail size={28} />
        </span>
        Contact
      </Link>
    </DrawerClose>
  );
};

export default MobileContactBtn;
