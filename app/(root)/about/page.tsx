import { Suspense } from "react";
import LoadingBar from "@/components/ui/LoadingBar";
import AboutComp from "@/components/AboutComp";

const About = () => {
  return (
    <Suspense fallback={<LoadingBar />}>
      <AboutComp />
    </Suspense>
  );
};

export default About;
