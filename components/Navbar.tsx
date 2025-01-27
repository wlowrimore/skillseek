import React from "react";
import type { HTMLAttributes } from "react";
import { auth } from "@/auth";
import Link from "next/link";
import Image from "next/image";
import { SignInBtn } from "./AuthButtons";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { Work_Sans as WorkSans } from "next/font/google";

const work = WorkSans({ subsets: ["latin"], weight: "500" });

const ServicesSubmenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuLink>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuLink>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={cn(
            "block select-none space-y-1 p-2 rounded-md leading-none no-underline outline-none transition-all duration-300 hover:bg-[#08B6D4]/15 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...(props as HTMLAttributes<HTMLAnchorElement>)}
        >
          <div className="text-base font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ServicesSubmenu.displayName = "ServicesSubmenu";

const Navbar = async () => {
  const session = await auth();

  return (
    <header
      className={`hidden md:block w-full ${session?.user ? "py-2" : "py-4"} fixed top-0 z-50 bg-white/40 backdrop-blur-[8px] shadow-md shadow-zinc-300/40`}
    >
      <nav className="flex flex-between gap-5 text-[#072454]">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image
              src="/brand-logo-cropped.png"
              alt="brand logo"
              width={1000}
              height={1000}
              className="w-44 h-auto border-l-2 border-r-2 border-primary px-2 py-1 rounded-xl"
            />
          </Link>
        </div>

        <section className="flex-between gap-2 pr-4">
          {session?.user ? (
            <>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="font-work-sans text-[1.1rem]">
                      Services
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-3 px-2 py-4">
                        <ServicesSubmenu href="/" title="All Services">
                          View and search all services{" "}
                        </ServicesSubmenu>
                        <ServicesSubmenu
                          href={`/my-services/${session.user.email}`}
                          title="My Services"
                        >
                          View and manage your existing services
                        </ServicesSubmenu>

                        <ServicesSubmenu
                          href="/service/create"
                          title="Create Service"
                        >
                          Create a new service offering
                        </ServicesSubmenu>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="font-work-sans text-[1.1rem]">
                      Navigation
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="">
                      <ul className="grid w-[200px] gap-3 px-2 py-4 min-h-[21rem] h-[22rem] lg:h-[28rem] max-h-[28rem] overflow-y-auto">
                        <ServicesSubmenu href="/about" title="About Us">
                          Learn more about SkillSeek and our mission to empower
                          individuals and businesses to find the right service
                          provider.
                        </ServicesSubmenu>
                        <ServicesSubmenu href="/contact" title="Contact Us">
                          Get in touch with us for any inquiries, suggestions,
                          or feedback.
                        </ServicesSubmenu>
                        <ServicesSubmenu href="/faq" title="FAQ">
                          Find answers to the most frequently asked questions.
                          If you can&apos;t find the answer you&apos;re looking
                          for, feel free to contact us.
                        </ServicesSubmenu>

                        <ServicesSubmenu
                          href="/terms-of-service"
                          title="Terms of Service"
                        >
                          Read our terms of service to understand our policies
                          and guidelines.
                        </ServicesSubmenu>
                        <ServicesSubmenu
                          href="/privacy-policy"
                          title="Privacy Policy"
                        >
                          Our privacy policy outlines how we collect, use, and
                          protect your personal information. Your security is
                          our top priority.
                        </ServicesSubmenu>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <Link
                href="/signout"
                className={`hover:bg-[#F29072] hover:text-white px-2 py-1 rounded-full w-[6rem] text-center transition duration-300 ${work.className} font-[600] text-[1.1rem]`}
              >
                SignOut
              </Link>

              <div
                title={session.user.email}
                className="flex flex-col justify-center items-center p-0.5 ml-2 border border-[#072454]/60 rounded-full"
              >
                <Image
                  src={session.user.image || ""}
                  alt={session.user.name || ""}
                  width={40}
                  height={40}
                  className="rounded-full object-cover object-center"
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
