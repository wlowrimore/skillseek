import React from "react";
import FAQQuickLinks from "./FAQQuickLinks";

const FAQImage = () => {
  return (
    <div className="hidden md:flex flex-col gap-6 items-end md:items-start h-full pr-4 w-[21rem] mt-[4rem] mb-9">
      <FAQQuickLinks />
      <img
        src="/faq-thumb.webp"
        alt="community sharing"
        width={1000}
        height={1000}
        className="w-full mb-[-0.1rem] h-[20.39rem] object-cover rounded-xl border-[3px] border-black opacity-90 shadow-lg shadow-black"
      />
    </div>
  );
};

export default FAQImage;
