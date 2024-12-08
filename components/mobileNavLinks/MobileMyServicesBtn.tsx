"use client";

import Link from "next/link";
import { LayoutPanelTop } from "lucide-react";
import { DrawerClose } from "../ui/drawer";

interface MobileMyServicesBtnProps {
  authorId?: string | null;
  className?: string;
}

const MobileMyServicesBtn: React.FC<MobileMyServicesBtnProps> = ({
  authorId,
  className = "text-neutral-300 py-2 px-4 border border-neutral-300 rounded-xl flex flex-col justify-center items-center",
}) => {
  return (
    <DrawerClose asChild>
      <Link href={authorId ? `/user/${authorId}` : "#"} className={className}>
        <span>
          <LayoutPanelTop size={28} />
        </span>
        My Services
      </Link>
    </DrawerClose>
  );
};

export default MobileMyServicesBtn;
