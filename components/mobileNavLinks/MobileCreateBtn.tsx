"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { DrawerClose } from "../ui/drawer";

interface MobileCreateBtnProps {
  className?: string;
}

const MobileCreateBtn: React.FC<MobileCreateBtnProps> = ({
  className = "text-neutral-300 py-2 px-4 border border-neutral-300 rounded-xl flex flex-col justify-center items-center",
}) => {
  return (
    <DrawerClose asChild>
      <Link href="/service/create" className={className}>
        <span>
          <Plus size={28} />
        </span>
        Create
      </Link>
    </DrawerClose>
  );
};

export default MobileCreateBtn;
