import React from "react";

const LoadingBar = () => {
  return (
    // <main className="w-full h-screen flex flex-col justify-center items-center mx-auto">
    <div className="loader">
      <div className="loading-text animate-pulse duration-[2000ms]">
        Progress<span className="dot">.</span>
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

export default LoadingBar;
