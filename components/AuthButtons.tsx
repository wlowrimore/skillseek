import { signIn, signOut } from "@/auth";
import { User, UserRoundPlus, UserRoundX } from "lucide-react";

export async function SignInBtn() {
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
        className="text-[#072454] hover:text-blue-500 rounded"
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
