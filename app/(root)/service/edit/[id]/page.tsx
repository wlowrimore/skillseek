import { SERVICE_BY_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import ServiceForm from "@/components/ServiceForm";

interface EditPagePorps {
  params?: {
    id: string;
  };
}

export default async function EditServicePage({ params }: EditPagePorps) {
  const service = await client.fetch(SERVICE_BY_ID_QUERY, {
    id: (await params)?.id,
  });

  return (
    <>
      <section className="blue_container bg-swirl-pattern">
        <h1 className="heading">Edit Service</h1>
      </section>
      <ServiceForm initialData={service} />
    </>
  );
}
