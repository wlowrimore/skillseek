import Link from "next/link";
import { Sparkle } from "lucide-react";

const FAQQuickLinks = () => {
  return (
    <div className="hidden bg-[#FCF2E4]/90 md:flex flex-col items-start h-[26.4rem] md:h-[25rem] lg:h-[25.5rem] md:mt-8 lg:-mt-2 px-3 pt-5  w-[20rem] border-[3px] border-black rounded-xl shadow-lg shadow-black">
      <h1 className="text-2xl font-bold text-slate-900 mb-1.5">
        FAQ Quick Links
      </h1>
      <Link
        href="#getting-started"
        className="group w-4/5 px-2 py-1 rounded-xl hover:bg-[#08B6D4]/20 transition duration-300"
      >
        <p className="text-slate-900 text-lg font-[600]">
          <Sparkle className="animated-sparkle group-hover:rotate-180 transition-transform duration-500 ease-linear inline-block" />
          <span className="ml-2">Getting Started</span>
        </p>
      </Link>
      <Link
        href="#for-service-providers"
        className="group w-4/5 px-2 py-1.5 rounded-xl hover:bg-[#08B6D4]/20 transition duration-300"
      >
        <p className="text-slate-900 text-lg font-[600]">
          <Sparkle className="animated-sparkle group-hover:rotate-180 transition-transform duration-500 ease-linear inline-block" />
          <span className="ml-2">For Service Providers</span>
        </p>
      </Link>
      <Link
        href="#for-service-seekers"
        className="group w-4/5 px-2 py-1.5 rounded-xl hover:bg-[#08B6D4]/20 transition duration-300"
      >
        <p className="text-slate-900 text-lg font-[600]">
          <Sparkle className="animated-sparkle group-hover:rotate-180 transition-transform duration-500 ease-linear inline-block" />
          <span className="ml-2">For Service Seekers</span>
        </p>
      </Link>
      <Link
        href="#account--security"
        className="group w-4/5 px-2 py-1.5 rounded-xl hover:bg-[#08B6D4]/20 transition duration-300"
      >
        <p className="text-slate-900 text-lg font-[600]">
          <Sparkle className="animated-sparkle group-hover:rotate-180 transition-transform duration-500 ease-linear inline-block" />
          <span className="ml-2">Account & Security</span>
        </p>
      </Link>
      <Link
        href="#pricing--payments"
        className="group w-4/5 px-2 py-1.5 rounded-xl hover:bg-[#08B6D4]/20 transition duration-300"
      >
        <p className="text-slate-900 text-lg font-[600]">
          <Sparkle className="animated-sparkle group-hover:rotate-180 transition-transform duration-500 ease-linear inline-block" />
          <span className="ml-2">Pricing & Payments</span>
        </p>
      </Link>
      <Link
        href="#technical-support"
        className="group w-4/5 px-2 py-1.5 rounded-xl hover:bg-[#08B6D4]/20 transition duration-300"
      >
        <p className="text-slate-900 text-lg font-[600]">
          <Sparkle className="animated-sparkle group-hover:rotate-180 transition-transform duration-500 ease-linear inline-block" />
          <span className="ml-2">Technical Support</span>
        </p>
      </Link>
      <Link
        href="#troubleshooting"
        className="group w-4/5 px-2 py-1.5 rounded-xl hover:bg-[#08B6D4]/20 transition duration-300"
      >
        <p className="text-slate-900 text-lg font-[600]">
          <Sparkle className="animated-sparkle group-hover:rotate-180 transition-transform duration-500 ease-linear inline-block" />
          <span className="ml-2">Troubleshooting</span>
        </p>
      </Link>
      <Link
        href="#still-have-questions"
        className="group w-4/5 px-2 py-1.5 rounded-xl hover:bg-[#08B6D4]/20 transition duration-300"
      >
        <p className="text-slate-900 text-lg font-[600]">
          <Sparkle className="animated-sparkle group-hover:rotate-180 transition-transform duration-500 ease-linear inline-block" />
          <span className="ml-2">Different Question</span>
        </p>
      </Link>
    </div>
  );
};

export default FAQQuickLinks;
