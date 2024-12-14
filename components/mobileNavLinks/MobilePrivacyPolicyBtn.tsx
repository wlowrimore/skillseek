import React from "react";
import Link from "next/link";
import { DrawerClose } from "../ui/drawer";

const MobilePrivacyPolicyBtn = () => {
  return (
    <DrawerClose asChild>
      <Link href="/privacy-policy">
        <span>Privacy Policy</span>
      </Link>
    </DrawerClose>
  );
};

export default MobilePrivacyPolicyBtn;
