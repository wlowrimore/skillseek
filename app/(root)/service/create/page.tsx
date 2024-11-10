import ServiceForm from "@/components/ServiceForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();

  if (!session) redirect("/");
  return (
    <>
      <section className="blue_container bg-swirl-pattern">
        <h1 className="heading">How Can You Help?</h1>
      </section>

      <ServiceForm />
    </>
  );
};

export default page;
