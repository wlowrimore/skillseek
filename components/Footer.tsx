import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-[#F1C7A3]/90 text-neutral-700 text-[0.9rem] rounded-t-xl">
        <div className="container mx-auto py-4 px-5 flex justify-between items-center">
          <div className="text-center">
            <span className="">&nbsp;&copy;2024 SkillSeek</span>
            &nbsp;
            <span className="">All rights reserved</span>
          </div>
          <div className="flex justify-center items-center">
            <h1>Terms of Service</h1>
            <span className="mx-2">|</span>
            <h2>Privacy Policy</h2>
            <span className="mx-2">|</span>
            <Link href="/about">
              <span>About Us</span>
            </Link>
            <span className="mx-2">|</span>
            <Link href="/contact">
              <span>Contact Us</span>
            </Link>
            <span className="mx-2">|</span>
            <h2>FAQ</h2>
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
