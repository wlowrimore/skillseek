"use client";

import Link from "next/link";
import { House } from "lucide-react";
import { usePathname } from "next/navigation";
import { DrawerClose } from "@/components/ui/drawer";

interface MobileHomeBtnProps {
  className?: string;
}

const MobileHomeBtn: React.FC<MobileHomeBtnProps> = ({
  className = "text-neutral-300 py-2 px-4 border border-neutral-300 rounded-xl flex flex-col justify-center items-center",
}) => {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <DrawerClose asChild>
      <Link href="/" className={className}>
        <span className="flex justify-center">
          <House size={28} />
        </span>
        Home
      </Link>
    </DrawerClose>
  );
};

export default MobileHomeBtn;
