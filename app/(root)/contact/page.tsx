import ContactForm from "@/components/ContactForm";
import LoadingBar from "@/components/ui/LoadingBar";
import { Dot } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { SocialIcon } from "react-social-icons";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Have a question or want to work with us?",
  openGraph: {
    title: "About Us",
    description: "Have a question or want to work with us?",
    images: [
      {
        url: "https://skillseek.vercel.app/brand-logo-new.png",
        width: 1200,
        height: 630,
        alt: "Contact Us",
      },
    ],
  },
};

const Contact = () => {
  return (
    <Suspense fallback={<LoadingBar />}>
      <section className="container w-full h-full mx-auto md:bg-contact contact_container py-3 md:mt-16">
        <h1 className="mx-4 font-bold text-3xl pb-2 md:pb-4 mt-16 md:mb-0 md:mt-4 border-b">
          Contact Us
        </h1>
        <div className="flex justify-center items-start mx-auto pb-10 md:pb-0">
          <div className="grid grid-cols-1 gap-20 w-full mx-auto lg:place-self-center md:pr-0 lg:grid-cols-2 justify-end md:gap-16 lg:gap-16 md:mt-24">
            <div className="hidden md:flex flex-col items-center mt-4 md:-mt-20">
              <ContactForm />
            </div>
            <div className="flex flex-col items-end lg:items-start w-full px-4 md:items-center md:w-[38rem] md:h-[45rem] md:-mt-8">
              <div className="md:hidden w-full flex flex-col items-center md:-mt-20">
                <ContactForm />
              </div>

              {/* Social Media Icons */}
              <section className="mt-6 py-4 md:pt-4 md:pb-6 md:mt-8 w-full md:justify-center md:px-4 bg-slate-700/90 rounded-xl border-[3px] border-black shadow-lg shadow-black">
                <div className="w-full tracking-wide mt-6 md:mt-0 md:py-8 pb-1.5 text-white text-sm md:text-base flex flex-col justify-center items-center md:items-start md:justify-start">
                  <div className="flex flex-col items-center mx-auto">
                    <h2 className="text-[1.1rem] md:text-[1.3rem]">
                      SkillSeek&trade; is owned & maintained by
                    </h2>
                    <div className="mt-4 md:mt-8 flex items-center gap-6">
                      <img
                        src="/fakenamedev-logo.webp"
                        alt="fakenamedev"
                        width={1000}
                        height={1000}
                        className="w-24 h-24 md:w-26 md:h-26 object-cover opacity-90 rounded-full"
                      />
                      <div className="flex flex-col justify-center py-3">
                        <h3>
                          FakeName Development<span>&trade;</span>
                        </h3>
                        <div className="flex items-center flex-row">
                          <h3>Nashville, TN</h3>
                          <span>
                            <Dot />
                          </span>
                          <p>USA</p>
                        </div>
                        <Link href="mailto:fakenamedev@gmail.com">
                          <p>fakenamedev@gmail.com</p>
                        </Link>{" "}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full px-6 md:px-0 md:py-8 flex flex-col justify-around md:justify-between items-center md:bg-black/80 md:rounded-lg pt-3">
                  <h2 className="text-white text-[1.2rem] mb-4 md:mb-8 w-full text-center ">
                    Follow Us
                  </h2>
                  <div className="flex md:flex-row gap-8">
                    <div className="p-1 border border-white rounded-full transition-all duration-300 md:hover:bg-[#007FB1] md:hover:scale-110">
                      <SocialIcon
                        url="https://linkedin.com/in/william-lowrimore-dev"
                        style={{
                          width: 40,
                          height: 40,
                        }}
                        target="_blank"
                        rel="noreferrer"
                      />
                    </div>
                    <div className="p-1 border border-white rounded-full transition-all duration-300 md:hover:bg-[#E94475] md:hover:scale-110">
                      <SocialIcon
                        url="https://instagram.com/fakenamedev"
                        style={{
                          width: 40,
                          height: 40,
                        }}
                        target="_blank"
                        rel="noreferrer"
                      />
                    </div>
                    <div className="p-1 border border-white rounded-full transition-all duration-300 md:hover:bg-black md:hover:scale-110">
                      <SocialIcon
                        url="https://x.com/fakenamedev"
                        style={{
                          width: 40,
                          height: 40,
                        }}
                        target="_blank"
                        rel="noreferrer"
                      />
                    </div>
                    <div className="p-1 border border-white rounded-full transition-all duration-300 md:hover:bg-[#5865F3] md:hover:scale-110">
                      <SocialIcon
                        url="https://discord.com/users/fakenamedev"
                        style={{
                          width: 40,
                          height: 40,
                        }}
                        target="_blank"
                        rel="noreferrer"
                      />
                    </div>
                  </div>
                  <div className="mt-6 px-2 md:px-8 py-2 md:py-0 md:pt-8 md:mt-3 md:mb-0 bg-neutral-950/70 md:bg-transparent md:bg-none md:rounded-none rounded-xl text-white">
                    <h2 className="font-bold text-slate-500">
                      We Respect Your Privacy
                    </h2>
                    <p className="text-[1rem] md:text-[0.9rem] leading-4">
                      We do not collect, nor do we do share your information
                      with any third parties.
                    </p>
                    <Link href="#" className="text-xs mb-4">
                      *See{" "}
                      <span className="underline text-slate-500">
                        Privacy Policy
                      </span>
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default Contact;
