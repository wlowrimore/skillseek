import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import {
  AUTHOR_BY_ID_QUERY,
  SERVICES_BY_AUTHOR_QUERY,
} from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import UserServices from "@/components/UserServices";
import { Suspense } from "react";
import { ServiceCardSkeleton, ServiceTypeCard } from "@/components/ServiceCard";
import Link from "next/link";
import LoadingBar from "@/components/ui/LoadingBar";

export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  console.log("USER in user/[id]/page.tsx", user);
  if (!user) return notFound();

  const services = await client.fetch(SERVICES_BY_AUTHOR_QUERY, { id });
  console.log("SERVICES IN USER/[ID]/PAGE.TSX:", services);

  const isAuthor = session?.user?.email === user.email;
  console.log("IS AUTHOR IN USER/[ID]/PAGE.TSX:", isAuthor);
  console.log("USER IN USER/[ID]/PAGE.TSX:", user);

  return (
    <Suspense fallback={<LoadingBar />}>
      <section className="profile_container mb-12 md:my-28">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center line-clamp-1">
              {user.name}
            </h3>
          </div>

          <Image
            src={user.image}
            alt={user.name}
            width={1000}
            height={1000}
            className="w-44 h-44 object-cover object-center rounded-2xl"
          />
          <div className="flex flex-col justify-center items-center mt-6">
            <p className="font-bold text-lg mb-[-0.5rem]">Email To Connect</p>
            {services &&
              services.map((service: ServiceTypeCard, id: string) => (
                <Link
                  href={`mailto:${service.contact}`}
                  key={id}
                  className="text-center"
                >
                  <span className="text-sm font-[600] hover:underline p-2">
                    {service?.contact}
                  </span>
                </Link>
              ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
          <p className="text-30-bold">{isAuthor ? "Your" : "All"} Services</p>
          <ul className="card_grid-sm">
            <Suspense fallback={<ServiceCardSkeleton />}>
              <UserServices id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </Suspense>
  );
};

export default page;
