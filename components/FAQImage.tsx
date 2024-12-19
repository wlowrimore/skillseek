import React from "react";
import FAQQuickLinks from "./FAQQuickLinks";
import { Button } from "./ui/button";
import Link from "next/link";

const FAQImage = () => {
  return (
    <div className="hidden md:flex flex-col md:gap-[1.5rem] lg:gap-[2rem] items-end md:items-start h-full pr-4 w-[21rem] mt-[4rem] mb-9 lg:-mb-1">
      <FAQQuickLinks />
      {/* <img
        src="/faq-thumb.webp"
        alt="community sharing"
        width={1000}
        height={1000}
        className="w-full mb-[-0.1rem] h-[20.39rem] lg:h-[10rem] object-cover rounded-xl border-[3px] border-black opacity-90 shadow-lg shadow-black"
      /> */}
      <Link href="/contact" className="w-full">
        <div className="bg-[#FCF2E4]/90 border-[3px] rounded-xl border-black shadow-lg shadow-black lg:w-full lg:h-[6.3rem] px-2 py-3.5 w-full flex flex-col gap-2">
          <p className="text-center text-xl font-[500] text-black">
            Need further assistance?
          </p>
          <button
            type="button"
            className="text-center bg-[#51819C] w-[15.2rem] h-14 mx-auto border border-black rounded"
          >
            Send a message
          </button>
        </div>
      </Link>
      {/* <span className=''>Contact Us</span> */}
    </div>
  );
};

export default FAQImage;
