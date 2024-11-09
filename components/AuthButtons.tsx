import { signIn, signOut } from "@/auth";

export async function signInBtn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { callbackUrl: "/service/create" });
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

export async function signOutBtn() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button
        type="submit"
        className="text-[#072454] hover:text-blue-500 rounded"
      >
        <span>SignOut</span>
      </button>
    </form>
  );
}
