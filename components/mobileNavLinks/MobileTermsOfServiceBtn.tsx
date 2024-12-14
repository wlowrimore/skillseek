import React from "react";
import Link from "next/link";
import { DrawerClose } from "../ui/drawer";

const MobileTermsOfServiceBtn = () => {
  return (
    <DrawerClose asChild>
      <Link href="/terms-of-service">
        <span>Terms of Service</span>
      </Link>
    </DrawerClose>
  );
};

export default MobileTermsOfServiceBtn;
