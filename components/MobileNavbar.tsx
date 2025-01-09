import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from "next/image";
import { MobileSignInBtn } from "./AuthButtons";
import MobileSignOutBtn from "./mobileNavLinks/MobileSignOutBtn";
import { AUTHOR_BY_EMAIL_QUERY } from "@/sanity/lib/queries";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  LayoutPanelTop,
  Plus,
  UserRoundX,
  Menu,
  Info,
  MessageCircleQuestion,
  Mail,
  House,
} from "lucide-react";
import MobileAllServicesBtn from "./mobileNavLinks/MobileAllServicesBtn";
import MobileAboutBtn from "./mobileNavLinks/MobileAboutBtn";
import MobileMyServicesBtn from "./mobileNavLinks/MobileMyServicesBtn";
import MobileCreateBtn from "./mobileNavLinks/MobileCreateBtn";
import MobileHomeBtn from "./mobileNavLinks/MobileHomeBtn";
import MobileContactBtn from "./mobileNavLinks/MobileContactBtn";
import MobileFAQBtn from "./mobileNavLinks/MobileFAQBtn";
import MobileTermsOfServiceBtn from "./mobileNavLinks/MobileTermsOfServiceBtn";
import MobilePrivacyPolicyBtn from "./mobileNavLinks/MobilePrivacyPolicyBtn";

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
      <div className="fixed top-0 left-0 right-0 z-10 bg-white/40 backdrop-blur-[8px] shadow-md shadow-zinc-300/40 w-full flex justiy-center pr-3 py-2 items-center">
        <DrawerTrigger asChild>
          <div className="flex justify-end ml-auto items-center">
            <Button
              variant="ghost"
              aria-label="Open Menu"
              className={`${session?.user ? "-mr-2.5" : "-mr-[1.6rem]"}`}
            >
              <Menu
                style={{
                  width: 44,
                  height: 28,
                  fontWeight: "bold",
                  marginTop: "0.3rem",
                }}
              />
            </Button>
          </div>
        </DrawerTrigger>
        {session?.user ? (
          <Image
            src={session?.user?.image || ""}
            alt={session?.user?.name || ""}
            title={session?.user?.email || ""}
            width={34}
            height={34}
            className="rounded-full p-0.5 border-2 border-black"
            unoptimized
          />
        ) : null}
      </div>
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
            <div className="relative flex flex-wrap text-center px-6 gap-5 w-full max-w-sm mt-20">
              {session?.user ? (
                <>
                  <MobileHomeBtn />
                  <MobileCreateBtn />
                  <MobileAllServicesBtn />
                  <MobileMyServicesBtn authorId={authorId} />
                  <MobileContactBtn />
                  <MobileAboutBtn />
                  <MobileFAQBtn />
                  <MobileSignOutBtn />
                </>
              ) : (
                <>
                  <MobileSignInBtn />
                  <MobileFAQBtn />
                  <MobileAboutBtn />
                </>
              )}
            </div>
          </div>
          <DrawerFooter>
            <section className="absolute bottom-2 right-0 left-0 flex flex-col items-center mx-auto w-[100%]">
              <div className="flex justify-center items-center text-xs text-neutral-400">
                <MobileTermsOfServiceBtn />
                <span className="mx-2">|</span>
                <MobilePrivacyPolicyBtn />
              </div>
              <div className="text-neutral-400 text-center text-xs">
                <span className="text-neutral-400">&copy; 2024 SkillSeek</span>
                &nbsp;
                <span className="text-neutral-400">All rights reserved</span>
                <br />
              </div>
            </section>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNavbar;
