import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-[#F1C7A3]/90 text-neutral-700 lg:text-[0.7rem] xl:text-[0.9rem] rounded-t-xl">
        <div className="container mx-auto py-4 px-5 flex flex-row justify-between items-center">
          <div className="text-center">
            <span className="">&nbsp;&copy;2024 SkillSeek</span>
            &nbsp;
            <span className="">All rights reserved</span>
          </div>
          <div className="flex justify-center items-center">
            <Link href="/terms-of-service">
              <span className="hover:text-blue-600 transition duration-200">
                Terms of Service
              </span>
            </Link>
            <span className="mx-2">|</span>
            <Link href="/privacy-policy">
              <span className="hover:text-blue-600 transition duration-200">
                Privacy Policy
              </span>
            </Link>
            <span className="mx-2">|</span>
            <Link href="/about">
              <span className="hover:text-blue-600 transition duration-200">
                About Us
              </span>
            </Link>
            <span className="mx-2">|</span>
            <Link href="/contact">
              <span className="hover:text-blue-600 transition duration-200">
                Contact Us
              </span>
            </Link>
            <span className="mx-2">|</span>
            <Link href="/faq">
              <span className="hover:text-blue-600 transition duration-200">
                FAQ
              </span>
            </Link>
          </div>
          <div className="flex justify-center items-center">
            <h2>Site Design and Development by fakenamedev</h2>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
