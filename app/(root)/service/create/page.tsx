import ServiceForm from "@/components/ServiceForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Metadata } from "next";
import LoadingBar2 from "@/components/ui/LoadingBar_2";

export const metadata: Metadata = {
  title: "Create a Service",
  description: "Got a skill or service to offer? Create it here!",
  openGraph: {
    title: "Create a Service",
    description: "Got a skill or service to offer? Create it here!",
    images: [
      {
        url: "https://skillseekapp.com/brand-logo-new.png",
        width: 1200,
        height: 630,
        alt: "Create a Service",
      },
    ],
  },
};

const page = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <Suspense fallback={<LoadingBar2 />}>
      <div className="mt-12 md:mt-16 pb-16">
        <section className="blue_container bg-swirl-pattern">
          <h1 className="heading">Share Your Service with the comminity</h1>
        </section>
        <ServiceForm authorEmail={session?.user?.email} />
      </div>
    </Suspense>
  );
};

export default page;
