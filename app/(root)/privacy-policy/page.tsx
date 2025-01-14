import PrivacyPolicyContent from "@/components/PrivacyPolicyContent";
import { Metadata } from "next";

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
    <main className="container px-4 w-full md:mx-auto mt-12 md:mt-16 flex flex-col items-center bg-slate-100">
      <PrivacyPolicyContent />
    </main>
  );
};

export default PrivacyPolicy;
