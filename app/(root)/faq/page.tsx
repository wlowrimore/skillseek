import FAQContent from "@/components/FAQContent";
import FAQImage from "@/components/FAQImage";
import MobileFAQImage from "@/components/MobileFAQImage";
import LoadingBar from "@/components/ui/LoadingBar";
import React, { Suspense } from "react";

const FAQ = () => {
  return (
    <Suspense fallback={<LoadingBar />}>
      <section className="container px-2 md:px-4 w-full mx-auto bg-faq mt-12 flex flex-col justify-center items-center md:mt-16">
        <h1 className="w-full font-bold text-3xl mt-8 md:mt-8 md:pt-4 lg:pt-10 pb-6 border-b">
          SkillSeek FAQ
        </h1>
        <div className="flex justify-center items-start mx-auto pb-0">
          <div className="flex flex-col items-center gap-6 w-full mx-auto md:place-self-center md:pr-4 lg:pl-16 xl:pl-60 md:grid grid-cols-2 md:gap-[6rem] lg:gap-32 lg:my-12">
            <FAQContent />
            <FAQImage />
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default FAQ;
