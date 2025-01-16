import React from "react";

const SplashScreenColorCircles = () => {
  return (
    <div className="h-screen">
      <div className="absolute right-[3.5rem] top-[-13rem] w-20 h-20 bg-slate-400 border-[3px] border-zinc-400 rounded-full"></div>
      <div className="absolute left-[9rem] top-[-18rem] w-72 h-72 bg-[#B0CBC7] border-[3px] border-zinc-400 rounded-full"></div>
      <div className="absolute left-[7rem] top-[12rem] w-32 h-32 bg-[#275975] border-[3px] border-zinc-400 rounded-full"></div>
      <div className="absolute right-[6rem] bg-[#F29072] border-[3px] w-64 h-64 border-zinc-400 rounded-2xl rotate-45"></div>
      <div className="absolute right-[7rem] top-[20rem] w-96 h-96 bg-[#F1C7A3] border-[3px] border-zinc-400 rounded-full"></div>
      <div className="absolute left-[2rem] top-[34rem] w-44 h-64 bg-[#51819C] border-[3px] border-zinc-400 rounded-4xl -rotate-[45deg]"></div>
    </div>
  );
};

export default SplashScreenColorCircles;
