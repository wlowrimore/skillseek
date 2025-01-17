import TermsOfServiceContent from "@/components/TermsOfServiceContent";
import LoadingBar2 from "@/components/ui/LoadingBar_2";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Terms Of Services",
  description: "Our terms of service are very simple",
  openGraph: {
    title: "Terms Of Services",
    description: "Our terms of service are very simple",
    images: [
      {
        url: "https://skillseekapp.com/brand-logo-new.png",
        width: 1200,
        height: 630,
        alt: "Terms Of Services",
      },
    ],
  },
};

const TermsOfService = () => {
  return (
    <Suspense fallback={<LoadingBar2 />}>
      <main className="container px-4 w-full md:mx-auto mt-12 md:mt-16 flex flex-col items-center bg-slate-100">
        <TermsOfServiceContent />
      </main>
    </Suspense>
  );
};

export default TermsOfService;
