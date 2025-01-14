import { Suspense } from "react";
import LoadingBar from "@/components/ui/LoadingBar";
import AboutComp from "@/components/AboutComp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about our company and team",
  openGraph: {
    title: "About Us",
    description: "Learn more about our company and team",
    images: [
      {
        url: "https://skillseekapp.com/brand-logo-new.png",
        width: 1200,
        height: 630,
        alt: "About Us",
      },
    ],
  },
};

const About = () => {
  return (
    <Suspense fallback={<LoadingBar />}>
      <AboutComp />
    </Suspense>
  );
};

export default About;
