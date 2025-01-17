import React from "react";

const LoadingBar2 = () => {
  return (
    // <main className="w-full h-screen flex flex-col justify-center items-center mx-auto">
    <div className="loader2">
      <div className="loading-text2 animate-pulse duration-[2000ms]">
        Loading Content<span className="dot">.</span>
        <span className="dot">.</span>
        <span className="dot">.</span>
      </div>
      <section className="loading-bar-background">
        <div className="loading-bar">
          <div className="white-bars-container">
            <div className="white-bar"></div>
            <div className="white-bar"></div>
            <div className="white-bar"></div>
            <div className="white-bar"></div>
            <div className="white-bar"></div>
            <div className="white-bar"></div>
            <div className="white-bar"></div>
            <div className="white-bar"></div>
            <div className="white-bar"></div>
            <div className="white-bar"></div>
          </div>
        </div>
      </section>
    </div>
    // </main>
  );
};

export default LoadingBar2;
