import PrivacyPolicyContent from "@/components/PrivacyPolicyContent";
import LoadingBar2 from "@/components/ui/LoadingBar_2";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how we protect your privacy and data",
  openGraph: {
    title: "Privacy Policy",
    description: "Learn how we protect your privacy and data",
    images: [
      {
        url: "https://skillseekapp.com/brand-logo-new.png",
        width: 1200,
        height: 630,
        alt: "Privacy Policy",
      },
    ],
  },
};

const PrivacyPolicy = () => {
  return (
    <Suspense fallback={<LoadingBar2 />}>
      <main className="container px-4 w-full md:mx-auto mt-12 md:mt-16 flex flex-col items-center bg-slate-100">
        <PrivacyPolicyContent />
      </main>
    </Suspense>
  );
};

export default PrivacyPolicy;
