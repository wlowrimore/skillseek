import { signIn } from "@/auth";

const SignInBtn = async () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { callbackUrl: "/service/create" });
      }}
    >
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        <span>SignIn</span>
      </button>
    </form>
  );
};

export default SignInBtn;
