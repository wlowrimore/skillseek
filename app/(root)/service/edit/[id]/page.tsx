import { SERVICE_BY_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import ServiceForm from "@/components/ServiceForm";

export default async function EditServicePage({
  params,
}: {
  params: { id: string };
}) {
  const service = await client.fetch(SERVICE_BY_ID_QUERY, {
    id: params?.id,
  });

  return (
    <>
      <section className="blue_container bg-swirl-pattern">
        <h1 className="heading">Edit</h1>
        <h2 className="sub-heading">{service.title}</h2>
      </section>
      <ServiceForm initialData={service} authorEmail={service.author._ref} />
    </>
  );
}
