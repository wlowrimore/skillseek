import Link from "next/link";
import { MessageCircleQuestion } from "lucide-react";
import { DrawerClose } from "../ui/drawer";

const MobileFAQBtn = () => {
  return (
    <DrawerClose asChild>
      <Link
        href="/faq"
        className="text-neutral-300 py-2 px-4 flex flex-1 flex-reverse gap-2 justify-center items-center w-fit border border-neutral-300 rounded-xl"
      >
        <MessageCircleQuestion size={28} />
        <span>FAQ</span>
      </Link>
    </DrawerClose>
  );
};

export default MobileFAQBtn;
