import { auth } from "@/auth";
import Link from "next/link";
import Image from "next/image";
import { signInBtn as SignInBtn } from "./AuthButtons";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-8 py-2 sticky top-0 z-50 bg-white border-b border-gray-200 shadow shadow-neutral-100">
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

        <section className="flex-between gap-6">
          {/* <Link href="/service/create" className="hover:text-blue-500">
            <span className="p-2">Create</span>
          </Link> */}

          {session && session.user ? (
            <>
              <Link href="/service/create" className="hover:text-blue-500">
                <span className="p-2">Create</span>
              </Link>
              <Link
                href="/signout"
                className="text-primary hover:text-blue-500 transition duration-200"
              >
                SignOut
              </Link>
              <div className="flex flex-col justify-center items-center p-0.5 border-2 border-[#072454] rounded-full">
                <Image
                  src={session.user.image as string}
                  alt={session.user.name as string}
                  width={40}
                  height={40}
                  className="rounded-full"
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
