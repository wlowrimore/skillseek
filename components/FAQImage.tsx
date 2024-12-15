import React from "react";

const FAQImage = () => {
  return (
    <div className="hidden md:flex flex-col items-end md:items-start h-full px-4 w-[27rem] mt-[4rem]">
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
