import { UserRoundX } from "lucide-react";
import Link from "next/link";
import React from "react";
import { DrawerClose } from "../ui/drawer";

interface MobileSignOutBtnProps {
  className?: string;
}

const MobileSignOutBtn = ({
  className = "text-neutral-300 bg-[#F06D5E] py-2 px-4 border border-neutral-300 rounded-xl flex flex-col justify-center items-center w-full",
}) => {
  return (
    <DrawerClose asChild>
      <Link href="/signout" className={className}>
        <span>
          <UserRoundX size={28} />
        </span>
        SignOut
      </Link>
    </DrawerClose>
  );
};

export default MobileSignOutBtn;
