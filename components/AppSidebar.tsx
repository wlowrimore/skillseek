"use client";

import { useSidebar } from "@/hooks/useSidebar";
import { ArrowLeftCircle, CircleArrowLeft, Option } from "lucide-react";
import Link from "next/link";
import { categoriesArray } from "@/public/categoriesList/categoriesArray";

const categories = categoriesArray;

export function AppSidebar() {
  const { isOpen, toggleSidebar } = useSidebar();

  const sortedCategories = categories.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  return (
    <main
      className={`fixed top-0 bottom-0 left-0 z-50 pr-8 w-[19.8rem] md:mt-1 bg-transparent ${isOpen ? "px-0 bg-white border-r border-neutral-300 shadow-lg shadow-black min-h-screen h-screen min-w-screen w-screen md:max-w-[40vw] md:w-[40vw] xl:max-w-[15vw] xl:w-[15vw] overflow-y-auto translate-x-0 transition-all duration-300" : "translate-x-[-16rem] md:h-[8vh] transition-all duration-300 ease-in-out"}`}
    >
      <button
        onClick={toggleSidebar}
        title="Category Filter"
        aria-label="Toggle Sidebar"
        className="w-full z-100 absolute top-14 flex justify-end"
      >
        {isOpen ? (
          <CircleArrowLeft
            className={`hidden md:block w-8 h-8 mt-5 mr-3 bg-[#51819C] text-white hover:bg-[#F29072] hover:text-black rounded-lg p-1 cursor-pointer transition duration-300 ${isOpen ? "bg-[#F29072] text-black hover:bg-[#51819C]" : ""}`}
          />
        ) : (
          <Option
            className={`hidden 
              md:inline-block md:mr-[1rem] w-8 h-8 mt-4 bg-neutral-800 text-white rounded-full p-1.5 cursor-pointer transition duration-300 ${isOpen ? "hidden" : ""}`}
          />
        )}
      </button>

      {/* Mobile Quick Search */}
      <button
        type="button"
        onClick={toggleSidebar}
        title="Quick Search"
        aria-label="Toggle Sidebar"
        className="w-full mt-[1.6rem] ml-2 flex justify-end items-center mx-auto"
      >
        {isOpen ? (
          <ArrowLeftCircle
            className={`md:hidden absolute right-0 flex items-center justify-center w-14 h-14 text-xs rounded-lg px-2 cursor-pointer transition duration-300 ${isOpen ? " text-white fill-[#F29072]" : ""}`}
          />
        ) : (
          <Option className="md:hidden absolute sm:right-[4rem] flex items-center justify-center w-7 h-7  bg-black/80 text-white p-1 rounded-full" />
        )}
      </button>

      <div
        className={`w-[100vw] min-h-screen h-screen md:w-full flex flex-col gap-2 transition-all duration-300 ease-in ${isOpen ? "bg-white w-[100vw] md:w-full" : "bg-transparent w-full ml-[-3rem] md:ml-0"}`}
      >
        <img
          src="/brand-logo-cropped.png"
          alt="brand logo"
          width={1000}
          height={1000}
          className="w-[8rem] h-auto pl-3 -mt-1.5"
        />
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold mt-6 md:mt-8 pl-4">Categories</h1>
          </div>
          <hr
            className={`flex-grow w-[92%] mx-auto ${isOpen ? "bg-neutral-300" : "hidden"}`}
          />
          <div className="flex flex-col py-6 gap-y-2">
            {sortedCategories.map((c) => (
              <Link
                key={c.name}
                href={`/?category=${c.name}`}
                onClick={toggleSidebar}
                className="flex w-[90%] gap-2 items-center hover:bg-zinc-200 transition duration-100 cursor-pointer pl-4 pr-2 rounded-full"
              >
                <div className="flex items-center w-full py-1 pr-4 gap-2 rounded-full">
                  <div className="w-2 h-2 mb-0.5 rounded-full bg-[#F29072] text-white"></div>
                  <span className="text-[1rem] w-full font-semibold">
                    {c.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
