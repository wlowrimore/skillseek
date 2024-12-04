import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from "next/image";
import { SignInBtn } from "./AuthButtons";
import { AUTHOR_BY_EMAIL_QUERY } from "@/sanity/lib/queries";
import AllServicesButton from "./AllServicesButton";

const Navbar = async () => {
  const session = await auth();
  let authorId = null;

  if (session?.user?.email) {
    const author = await client.fetch(AUTHOR_BY_EMAIL_QUERY, {
      email: session.user.email,
    });
    authorId = author?._id;
  }

  return (
    <header className="hidden md:block px-8 py-2 sticky top-0 z-50 bg-white/40 backdrop-blur-[8px] border-b border-gray-200 shadow shadow-neutral-100">
      <nav className="flex flex-between gap-5 text-[#072454]">
        <Link href="/">
          <Image
            src="/brand-logo.png"
            alt="brand logo"
            width={1000}
            height={1000}
            className="w-44 h-auto border-l-2 border-r-2 border-primary px-2 py-1 rounded-xl"
          />
        </Link>

        <section className="flex-between gap-2">
          {session?.user ? (
            <>
              <AllServicesButton />
              <Link
                href={authorId && `/user/${authorId}`}
                className="hover:bg-[#4D99A6] hover:text-white px-2 py-1 rounded-full w-[8rem] text-center transition duration-300"
              >
                <span className="flex justify-center">My Services</span>
              </Link>
              <Link
                href="/service/create"
                className="hover:bg-[#4D99A6] hover:text-white px-2 py-1 rounded-full w-[8rem] text-center transition duration-300"
              >
                <span className="p-2">Create</span>
              </Link>
              <Link
                href="/signout"
                className="hover:bg-[#F29072] hover:text-white px-2 py-1 rounded-full w-[8rem] text-center transition duration-300"
              >
                SignOut
              </Link>
              <div className="flex flex-col justify-center items-center p-0.5 border-2 border-[#072454] rounded-full">
                <Image
                  src={session.user.image || ""}
                  alt={session.user.name || ""}
                  width={40}
                  height={40}
                  className="rounded-full"
                  unoptimized
                />
              </div>
            </>
          ) : (
            <SignInBtn />
          )}
        </section>
      </nav>
    </header>
  );
};

export default Navbar;
