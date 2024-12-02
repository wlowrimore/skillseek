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
        <div className="flex flex-col items-center justify-center">
          <h1 className="heading">
            Edit
            <span className="sub-heading">
              &quot;&nbsp;{service.title}&nbsp;&quot;
            </span>
          </h1>
        </div>
      </section>
      <ServiceForm initialData={service} authorEmail={service.author._ref} />
    </>
  );
}
