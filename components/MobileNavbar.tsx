import { auth, signIn } from "@/auth";
import { client } from "@/sanity/lib/client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { MobileSignInBtn, MobileSignOutBtn } from "./AuthButtons";
import { AUTHOR_BY_EMAIL_QUERY } from "@/sanity/lib/queries";
import AllServicesButton from "./AllServicesButton";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Eye,
  LayoutPanelTop,
  Square,
  Plus,
  Table,
  UserRoundX,
  View,
  Menu,
  MenuSquare,
  Info,
  ShieldQuestion,
  MessageCircleQuestion,
  Mail,
} from "lucide-react";
import MobileAllServicesBtn from "./MobileAllServicesBtn";

const MobileNavbar = async () => {
  const session = await auth();
  let authorId = null;

  if (session?.user?.email) {
    const author = await client.fetch(AUTHOR_BY_EMAIL_QUERY, {
      email: session.user.email,
    });
    authorId = author?._id;
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost">
          <Menu style={{ width: 44, height: 28, fontWeight: "bold" }} />
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <div className="mx-auto w-full text-neutral-300">
          <div className="flex justify-start pl-2">
            <DrawerTitle>
              <img
                src="/brand-logo-mobile.png"
                alt="brand logo"
                width={500}
                height={500}
                className="w-24 mt-[-0.5rem]"
              />
            </DrawerTitle>
          </div>

          <div className="p-4 pb-0 flex items-center justify-center text-neutral-300">
            <div className="relative flex flex-wrap text-center px-6 gap-5 w-full max-w-sm mt-4">
              {session?.user ? (
                <>
                  <MobileAllServicesBtn />
                  <a
                    href={authorId && `/user/${authorId}`}
                    className="text-neutral-300 py-2 px-4 border border-neutral-300 rounded-xl flex flex-col justify-center items-center"
                  >
                    <span>
                      <LayoutPanelTop size={28} />
                    </span>
                    My Services
                  </a>
                  <a
                    href="/service/create"
                    className="text-neutral-300 py-2 px-4 border border-neutral-300 rounded-xl flex-1 flex flex-col justify-center items-center"
                  >
                    <span>
                      <Plus size={28} />
                    </span>
                    Create
                  </a>

                  <a
                    href={authorId && `/user/${authorId}`}
                    className="text-neutral-300 py-2 px-4 border border-neutral-300 rounded-xl flex-1 flex flex-col justify-center items-center"
                  >
                    <span>
                      <LayoutPanelTop size={28} />
                    </span>
                    About
                  </a>
                  <a
                    href="/service/create"
                    className="text-neutral-300 py-2 px-4 border border-neutral-300 rounded-xl flex flex-1 flex-col justify-center items-center"
                  >
                    <span>
                      <Mail size={28} />
                    </span>
                    Contact
                  </a>

                  <a
                    href="/signout"
                    className="text-neutral-300 bg-[#F06D5E] py-2 px-4 border border-neutral-300 rounded-xl flex flex-col justify-center items-center w-full"
                  >
                    <span>
                      <UserRoundX size={28} />
                    </span>
                    SignOut
                  </a>
                </>
              ) : (
                MobileSignInBtn()
              )}
              <Link
                href="/"
                className="text-neutral-300 py-2 px-4 flex flex-reverse gap-2 justify-center items-center w-fit border border-neutral-300 rounded-xl"
              >
                <Info size={28} />
                <span>About Us</span>
              </Link>

              <Link
                href="/"
                className="text-neutral-300 py-2 px-4 flex flex-1 flex-reverse gap-2 justify-center items-center w-fit border border-neutral-300 rounded-xl"
              >
                <MessageCircleQuestion size={28} />
                <span>FAQ</span>
              </Link>

              {/* <div className="flex flex-col justify-center items-center text-neutral-400 text-center text-sm w-full mt-3">
                <div className="flex justify-center items-center gap-10">
                  <h2 className="border border-neutral-500 rounded-lg py-1 px-2">
                    Contact Us
                  </h2>
                  <h2 className="border border-neutral-500 rounded-lg py-1 px-2">
                    About Us
                  </h2>
                </div>
              </div> */}
            </div>
          </div>
          <DrawerFooter>
            <section className="absolute bottom-3 max-w-sm flex flex-col items-center mx-auto w-[90%]">
              <div className="flex justify-center items-center text-xs text-neutral-400">
                <h5>Terms of Service</h5>
                <span className="mx-2">|</span>
                <h5>Privacy Policy</h5>
              </div>
              <div className="text-neutral-400 text-center text-xs">
                <span className="text-neutral-400">&copy; 2023 SkillSeek</span>
                &nbsp;
                <span className="text-neutral-400">All rights reserved</span>
                <br />
                {/* <span className="text-neutral-400">Terms of Service</span>
                <span className="mx-2 font-bold">|</span>
                <span className="text-neutral-400">Privacy Policy</span> */}
              </div>
            </section>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNavbar;
