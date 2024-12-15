import React from "react";
import FAQQuickLinks from "./FAQQuickLinks";

const FAQImage = () => {
  return (
    <div className="hidden md:flex flex-col gap-8 items-end md:items-start h-full pr-4 w-[26rem] mt-[4rem]">
      <FAQQuickLinks />
      <img
        src="/faq-thumb.webp"
        alt="community sharing"
        width={1000}
        height={1000}
        className="w-full h-[22rem] object-cover rounded-xl border-[3px] border-black opacity-90 shadow-lg shadow-neutral-800"
      />
    </div>
  );
};

export default FAQImage;
