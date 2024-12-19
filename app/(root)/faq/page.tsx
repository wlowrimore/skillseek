import FAQContent from "@/components/FAQContent";
import FAQImage from "@/components/FAQImage";
import MobileFAQImage from "@/components/MobileFAQImage";
import React from "react";

const FAQ = () => {
  return (
    <>
      <section className="container px-4 w-full md:mx-auto bg-faq mt-12 flex flex-col justify-center items-center md:mt-16">
        <h1 className="w-full font-bold text-3xl mt-8 md:mt-4 md:pt-4 lg:pt-10 pb-4 border-b">
          SkillSeek FAQ
        </h1>
        <div className="flex justify-center items-start mx-auto pb-0">
          <div className="grid grid-cols-1 gap-6 w-full mx-auto md:place-self-center md:pr-4 lg:pl-16 xl:pl-60 md:grid md:grid-cols-2 md:gap-[6rem] lg:gap-32 md:my-8 lg:my-12">
            <FAQContent />
            <FAQImage />
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
