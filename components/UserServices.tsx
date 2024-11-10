import { client } from "@/sanity/lib/client";
import { SERVICES_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import ServiceCard, { ServiceTypeCard } from "@/components/ServiceCard";

const UserServices = async ({ id }: { id: string }) => {
  const services = await client.fetch(SERVICES_BY_AUTHOR_QUERY, { id });

  return (
    <>
      {services.length > 0 ? (
        services.map((service: ServiceTypeCard) => (
          <ServiceCard key={service._id} post={service} />
        ))
      ) : (
        <p className="no-result">No services added yet</p>
      )}
    </>
  );
};

export default UserServices;
