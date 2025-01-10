import { signIn, signOut } from "@/auth";
import { UserRoundPlus, UserRoundX } from "lucide-react";
import { Work_Sans as WorkSans } from "next/font/google";
const work = WorkSans({ subsets: ["latin"], weight: "500" });

interface SignInBtnProps {
  className?: string;
}

export async function SignInBtn({ className, ...props }: SignInBtnProps) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/" });
      }}
    >
      <button
        type="submit"
        aria-label="Sign In"
        {...props}
        className={`hover:bg-[#08B6D4]/70 hover:text-white px-2 py-1 rounded-full w-[6rem] text-center transition duration-300 ${work.className} font-[600] text-[0.98rem]`}
      >
        <span>SignIn</span>
      </button>
    </form>
  );
}

export async function SignOutBtn() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <button
        type="submit"
        aria-label="Sign Out"
        className="text-white font-normal w-full text-[1.3rem] bg-black/80 px-5 py-2 mt-4 rounded-xl hover:bg-black transition-hover duration-200"
      >
        <span>Yes, Sign Me Out</span>
      </button>
    </form>
  );
}

// ---------------------------------------------------------------------
//                           Mobile Buttons
// ---------------------------------------------------------------------

export async function MobileSignInBtn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/" });
      }}
      className="w-full mt-10"
    >
      <button
        type="submit"
        aria-label="Sign In"
        className="text-neutral-300 bg-[#51819C] py-2 px-4 border border-neutral-300 rounded-xl flex flex-col justify-center items-center w-full"
      >
        <UserRoundPlus size={28} />
        <span>SignIn</span>
      </button>
    </form>
  );
}

export async function MobileSignOutBtn() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <button
        type="submit"
        className="text-white font-normal w-full text-[1.3rem] bg-black/80 px-5 py-2 mt-4 rounded-xl hover:bg-black transition-hover duration-200"
      >
        <UserRoundX size={52} />
        <span>Yes, Sign Me Out</span>
      </button>
    </form>
  );
}
