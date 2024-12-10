import ContactForm from "@/components/ContactForm";
import { Dot } from "lucide-react";
import Link from "next/link";
import { SocialIcon } from "react-social-icons";

const Contact = () => {
  return (
    <>
      <section className="container md:mx-auto bg-contact blue_container py-3 md:mt-16">
        <h1 className="w-full font-bold text-3xl pb-4 mt-12 md:mt-0 border-b">
          Contact Us
        </h1>
        <div className="flex justify-center items-start mx-auto pb-10 md:pb-0">
          <div className="grid grid-cols-1 gap-20 w-full mx-auto place-self-center md:pr-0 md:pl-6 xl:pl-36 md:grid-cols-2 justify-end md:gap-52 lg:gap-20 md:mt-24">
            <div className="hidden md:flex flex-col items-center m mt-4 md:-mt-20">
              <ContactForm />
            </div>
            <div className="flex flex-col items-end md:items-start w-[24rem] md:w-[22rem] mt-16 md:mt-4">
              <img
                src="/contact-right.webp"
                alt="community sharing"
                width={1000}
                height={1000}
                className="w-full h-1/4 md:h-1/2 object-cover rounded-xl border-[3px] border-black opacity-90 shadow-lg shadow-neutral-800"
              />
              <div className="md:hidden w-[25rem] flex flex-col items-centert md:-mt-20">
                <ContactForm />
              </div>

              {/* Social Media Icons */}
              <section className="mt-24 py-8 md:py-0 md:mt-8 w-full bg-slate-700/90 rounded-xl border-[3px] border-black shadow-lg shadow-black">
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
                <div className="w-full tracking-wide mt-6 md:mt-0 md:pt-2 pb-1.5 text-white text-sm md:text-xs flex flex-col justify-center items-center">
                  <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center md:flex-row justify-center">
                      <h3>Nashville, TN</h3>
                      <span className="hidden md:block">
                        <Dot />
                      </span>
                      <p>901.568.7941</p>
                    </div>
                  </div>
                  {/* <span className="hidden md:block">
                    <Dot />
                  </span>{" "} */}
                  <Link href="mailto:skillseekapp@gmail.com">
                    <p>skillseekapp@gmail.com</p>
                  </Link>{" "}
                </div>
              </section>
              <div className="-mb-52 mt-24 px-4 md:px-2 py-2 md:py-0 md:pt-4 md:mt-3 md:mb-0 bg-neutral-950/70 md:bg-transparent md:bg-none md:rounded-none rounded-xl text-white md:text-black">
                <h2 className="font-bold text-blue-300 md:text-slate-900">
                  We Respect Your Privacy
                </h2>
                <p className="text-[1rem] md:text-[0.9rem] leading-4">
                  We do not collect, nor do we do share your information with
                  any third parties.
                </p>
                <Link href="#" className="text-xs mb-4">
                  *See{" "}
                  <span className="text-blue-300 underline md:text-slate-800">
                    Privacy Policy
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
