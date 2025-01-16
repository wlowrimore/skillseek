import React from "react";

const SplashScreenColorCircles = () => {
  return (
    <div className="h-screen">
      <div className="absolute right-[-0.5rem] top-[3rem] w-20 h-20 bg-slate-400 border-[3px] border-zinc-400 rounded-full"></div>
      <div className="absolute left-[9rem] top-[-18rem] w-72 h-72 bg-[#B0CBC7] border-[3px] border-zinc-400 rounded-full"></div>
      <div className="absolute left-[2rem] top-[8rem] w-32 h-32 bg-[#275975]/80 border-[3px] border-zinc-200 rounded-full"></div>
      <div className="absolute right-[-10rem] top-[10rem] bg-[#F29072] border-[3px] w-64 h-64 border-zinc-400 rounded-2xl rotate-45"></div>
      <div className="absolute right-[8rem] top-[80%] w-96 h-96 bg-[#F1C7A3] border-[3px] border-zinc-400 rounded-full"></div>
      <div className="absolute top-[20rem] w-44 h-96 bg-zinc-300 border-[3px] border-zinc-200 rounded-4xl -rotate-[75deg]"></div>
    </div>
  );
};

export default SplashScreenColorCircles;
