import { client } from "@/sanity/lib/client";
import { auth } from "@/auth";
import { SERVICES_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import ServiceCard, { ServiceTypeCard } from "@/components/ServiceCard";

interface UserServicesProps {
  id: string;
}

const UserServices = async ({ id }: UserServicesProps) => {
  const session = await auth();
  const currentUserEmail = session?.user?.email;
  const services = await client.fetch(SERVICES_BY_AUTHOR_QUERY, { id });

  return (
    <>
      {services.length > 0 ? (
        services.map((service: ServiceTypeCard) => (
          <ServiceCard
            key={service._id}
            post={service}
            service={service}
            currentUserEmail={currentUserEmail}
            contact={service.contact}
          />
        ))
      ) : (
        <p className="no-result">No services added yet</p>
      )}
    </>
  );
};

export default UserServices;
