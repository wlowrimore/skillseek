import ContactForm from "@/components/ContactForm";
import { Dot } from "lucide-react";
import Link from "next/link";
import { SocialIcon } from "react-social-icons";

const Contact = () => {
  return (
    <>
      <section className="container mx-auto bg-contact blue_container md:mt-16">
        <h1 className="w-full font-bold text-3xl pb-4 mt-12 md:mt-0 border-b ">
          Contact Us
        </h1>
        <div className="flex justify-center items-start mx-auto pb-10 md:pb-0">
          <div className="grid grid-cols-1 gap-20 w-full pr-2 md:pr-0 md:pl-6 xl:pl-36 md:grid-cols-2 justify-end md:gap-52 lg:gap-20 md:mt-24">
            <div className="hidden md:flex flex-col items-center m mt-4 md:-mt-20">
              <ContactForm />
            </div>
            <div className="flex flex-col items-end md:items-start w-[22rem] mt-14 md:-mt-10">
              <img
                src="/contact-right.webp"
                alt="community sharing"
                width={1000}
                height={1000}
                className="w-full h-1/4 md:h-1/2 object-cover rounded-xl border-[3px] border-black opacity-90 shadow-lg shadow-neutral-800"
              />
              <div className="md:hidden flex flex-col items-center m mt-4 md:-mt-20">
                <ContactForm />
              </div>
              <div className="pt-10 md:pt-4 ">
                <h2 className="font-bold">We Respect Your Privacy</h2>
                <p className="text-[1rem] md:text-[0.9rem] leading-4">
                  We do not collect any personal information from you. Your
                  information is only used to respond to your inquiry and to
                  provide you with the best possible service. We do not share
                  your information with any third parties.
                </p>
              </div>
              <Link href="#" className="text-xs mb-4">
                *See{" "}
                <span className="text-orange-700 underline md:no-underline">
                  Privacy Policy
                </span>
              </Link>

              {/* Social Media Icons */}
              <section className="mt-6 py-8 md:py-0 md:mt-0 w-full bg-slate-700 rounded-xl border-[3px] border-black shadow-lg shadow-black">
                <div className="w-full px-6 md:px-0 flex justify-around items-center pt-3">
                  <div className="p-1 border border-white rounded-full">
                    <SocialIcon
                      url="https://linkedin.com/in/william-lowrimore-dev"
                      style={{
                        width: 50,
                        height: 50,
                      }}
                      target="_blank"
                      rel="noreferrer"
                    />
                  </div>
                  <div className="p-1 border border-white rounded-full">
                    <SocialIcon
                      url="https://instagram.com/wlowrimore"
                      style={{
                        width: 50,
                        height: 50,
                      }}
                      target="_blank"
                      rel="noreferrer"
                    />
                  </div>
                  <div className="p-1 border border-white rounded-full">
                    <SocialIcon
                      url="https://twitter.com/wlowrimore"
                      style={{
                        width: 50,
                        height: 50,
                      }}
                      target="_blank"
                      rel="noreferrer"
                    />
                  </div>
                  <div className="p-1 border border-white rounded-full">
                    <SocialIcon
                      url="https://discord.gg/9w4r3s4"
                      style={{
                        width: 50,
                        height: 50,
                      }}
                      target="_blank"
                      rel="noreferrer"
                    />
                  </div>
                </div>
                <div className="w-full tracking-wide mt-6 md:mt-0 md:pt-2 pb-1.5 text-white text-sm md:text-xs flex flex-col md:flex-row justify-center items-center">
                  <h3>Nashville, TN</h3>
                  <span className="hidden md:block">
                    <Dot />
                  </span>
                  <Link href="mailto:fakenamedev@gmail.com">
                    <p>skillseek@gmail.com</p>
                  </Link>{" "}
                  <span className="hidden md:block">
                    <Dot />
                  </span>{" "}
                  <p>901.568.7941</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
