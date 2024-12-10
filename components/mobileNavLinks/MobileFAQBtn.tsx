import Link from "next/link";
import { MessageCircleQuestion } from "lucide-react";

const MobileFAQBtn = () => {
  return (
    <Link
      href="/"
      className="text-neutral-300 py-2 px-4 flex flex-1 flex-reverse gap-2 justify-center items-center w-fit border border-neutral-300 rounded-xl"
    >
      <MessageCircleQuestion size={28} />
      <span>FAQ</span>
    </Link>
  );
};

export default MobileFAQBtn;
