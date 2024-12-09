"use client";

import { useSession } from "next-auth/react";
import { useSidebar } from "@/hooks/useSidebar";
import {
  ArrowLeftCircle,
  ArrowRightCircle,
  CircleArrowLeft,
  CircleArrowRight,
  Option,
} from "lucide-react";
import Link from "next/link";

const categories = [
  { name: "Home Improvement", value: "Home Improvement" },
  { name: "Lawn & Garden", value: "Lawn & Garden" },
  {
    name: "Automotive Maintenance & Repair",
    value: "Automotive Maintenance & Repair",
  },
  {
    name: "Small Engine Maintenance & Repair",
    value: "Small Engine Maintenance & Repair",
  },
  { name: "Child Care", value: "Child Care" },
  { name: "Pet Care", value: "Pet Care" },
  { name: "Education & Tutoring", value: "Education & Tutoring" },
  { name: "Music & Arts Lessons", value: "Music & Arts Lessons" },
  { name: "Music Services", value: "Music Services" },
  { name: "Wedding | Party Planning", value: "Wedding | Party Planning" },
  { name: "Legal Services", value: "Legal Services" },
  { name: "Financial Advice", value: "Financial Advice" },
  { name: "Electronics Repair", value: "Electronics Repair" },
  { name: "Transportation | Carpool", value: "Transportation | Carpool" },
  { name: "Housekeeping", value: "Housekeeping" },
  { name: "Website & Software Services", value: "Website & Software Services" },
  { name: "Plumbing", value: "Plumbing" },
  {
    name: "Electrical Maintenance & Repair",
    value: "Electrical Maintenance & Repair",
  },
  { name: "HVAC Heating & Cooling", value: "HVAC Heating & Cooling" },
  { name: "Pool Maintenance", value: "Pool Maintenance" },
  { name: "Other", value: "Other" },
];

export function AppSidebar() {
  const { data: session } = useSession();
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <main
      className={`fixed top-0 bottom-0 z-50 max-w-[60rem] mt-1 ${isOpen ? "min-h-screen overflow-y-auto translate-x-0 transition-all duration-300" : "translate-x-[-22rem] md:h-[8vh] transition-all duration-300 ease-in-out"}`}
    >
      <button
        onClick={toggleSidebar}
        title="Category Filter"
        aria-label="Toggle Sidebar"
        className={`w-full z-100 absolute top-14 flex justify-end ${isOpen ? "" : "left-5"}`}
      >
        {isOpen ? (
          <CircleArrowLeft
            className={`hidden md:block w-8 h-8 mt-4 mr-3 bg-[#51819C] text-white hover:bg-[#F29072] hover:text-black rounded-lg p-1 cursor-pointer transition duration-300 ${isOpen ? "bg-[#F29072] text-black hover:bg-[#51819C]" : ""}`}
          />
        ) : (
          <Option
            className={`hidden md:block w-8 h-8 mt-4 bg-neutral-800 text-white rounded-full p-1.5 cursor-pointer transition duration-300 ${isOpen ? "bg-[#F29072] text-black hover:bg-[#51819C] mr-[-1.5rem]" : "ml-[-1.5rem]"}`}
          />
        )}
      </button>
      <button
        onClick={toggleSidebar}
        title="Quick Search"
        aria-label="Toggle Sidebar"
        className={`w-full z-100 absolute flex justify-end ${isOpen ? "right-28 md:right-4" : "right-4 top-[0.2rem]"} md:hidden`}
      >
        <span
          className={`md:hidden flex items-center justify-center w-fit h-8 mr-[-5.4rem] text-xs text-black rounded-lg px-2 cursor-pointer transition duration-300 ${isOpen ? " text-white" : "text-white"}`}
        >
          {isOpen ? (
            <ArrowLeftCircle className="w-8 h-8 -mr-6 mt-1.5 bg-[#51819C] rounded-full" />
          ) : (
            <Option className="w-7 h-7 bg-black/80 p-1 rounded-full" />
          )}
        </span>
      </button>

      <div
        className={`w-[100vw] md:w-full flex flex-col gap-2 transition-all duration-300 ease-in ${isOpen ? "bg-white w-[100vw] md:w-full" : "bg-transparent w-full ml-[-3rem] md:ml-0"}`}
      >
        <img
          src="/brand-logo.png"
          alt="brand logo"
          width={1000}
          height={1000}
          className="w-32 h-auto pl-2"
        />
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold mt-6 md:mt-8 pl-10">
              Categories
            </h1>
          </div>
          <hr className="flex-grow w-[80%] mx-auto border-neutral-300 border-b-0" />
          <div className="flex flex-col px-6 py-6 gap-2">
            {categories.map((c) => (
              <Link
                key={c.name}
                href={`/?category=${c.name}`}
                onClick={toggleSidebar}
                className="flex gap-2 items-center hover:bg-zinc-200 transition duration-100 cursor-pointer px-4 rounded-full"
              >
                <div className="flex items-center w-full py-2 pr-4 gap-2 rounded-full">
                  <div className="w-4 h-4 rounded-full bg-[#F29072] text-white"></div>
                  <span className="text-[1rem] font-semibold">{c.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
