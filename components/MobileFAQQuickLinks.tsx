import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
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
          ref={ref}
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

const MobileFAQQuickLinks = () => {
  return (
    <header className="mx-auto md:hidden rounded-bl-lg rounded-tr-xl border-l-2 border-b-2 border-cyan-700/40 w-fit bg-[#A3D2E6] brightness-125 text-sm">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="font-work-sans text-[0.9rem]">
              Quick Links
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-3 py-4">
                <ServicesSubmenu
                  href="#getting-started"
                  title="Getting Started"
                >
                  Learn more about the SkillSeek platform and how it can help
                  you
                </ServicesSubmenu>
                <ServicesSubmenu
                  href="#for-service-providers"
                  title="For Service Providers"
                >
                  A step-by-step walth-through guide on how to create services
                </ServicesSubmenu>

                <ServicesSubmenu
                  href="#for-service-seekers"
                  title="For Service Seekers"
                >
                  Advice on how to find the right service provider for you
                </ServicesSubmenu>

                <ServicesSubmenu
                  href="#account--security"
                  title="Account & Security"
                >
                  Learn how we protect your personal information and how to
                  safely choose your service provider
                </ServicesSubmenu>
                <ServicesSubmenu
                  href="#pricing--payments"
                  title="Pricing & Payments"
                >
                  Information on pricing and payment options
                </ServicesSubmenu>
                <ServicesSubmenu
                  href="#technical-support"
                  title="Technical Support"
                >
                  Contact information for our support team
                </ServicesSubmenu>
                <ServicesSubmenu
                  href="#troubleshooting"
                  title="Troubleshooting"
                >
                  Common issues and solutions
                </ServicesSubmenu>
                <ServicesSubmenu
                  href="#still-have-questions"
                  title="Still Have Questions"
                >
                  How to contact support if you have any questions not listed
                </ServicesSubmenu>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

export default MobileFAQQuickLinks;
