import { signIn, signOut } from "@/auth";

export async function SignInBtn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/service/create" });
      }}
    >
      <button
        type="submit"
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
        className="text-white font-normal w-full text-[1.3rem] bg-black/80 px-5 py-2 mt-4 rounded-xl hover:bg-black transition-hover duration-200"
      >
        <span>Yes, Sign Me Out</span>
      </button>
    </form>
  );
}
