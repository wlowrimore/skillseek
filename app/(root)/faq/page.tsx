import FAQContent from "@/components/FAQContent";
import FAQImage from "@/components/FAQImage";
import MobileFAQImage from "@/components/MobileFAQImage";
import React from "react";

const FAQ = () => {
  return (
    <>
      <section className="container w-full mx-auto bg-faq contact_container pb-3 mt-12 md:mt-16">
        <h1 className="mx-5 font-bold text-3xl pb-4 mt-8 border-b">
          SkillSeek FAQ
        </h1>
        <div className="flex justify-center items-start mx-auto pb-10 md:pb-0">
          <div className="flex flex-col items-center gap-6 w-full mx-auto md:place-self-center md:pr-0 md:pl-6 xl:pl-52 md:grid grid-cols-2 md:gap-52 lg:gap-12 md:my-12">
            <MobileFAQImage />
            <FAQContent />
            <FAQImage />
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
