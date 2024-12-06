import ServiceForm from "@/components/ServiceForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();

  if (!session) redirect("/");
  return (
    <div className="mt-16">
      <section className="blue_container bg-swirl-pattern">
        <h1 className="heading">Share Your Service with the comminity</h1>
      </section>

      <ServiceForm authorEmail={session?.user?.email} />
    </div>
  );
};

export default page;
