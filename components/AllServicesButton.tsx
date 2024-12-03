"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const AllServicesButton = () => {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <Link
      href="/"
      className="hover:bg-[#4D99A6] hover:text-white px-2 py-1 rounded-full w-[8rem] text-center transition duration-300"
    >
      <span className="p-2">All Services</span>
    </Link>
  );
};

export default AllServicesButton;
