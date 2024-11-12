"use client";
import { signOut } from "@/auth";
import { redirect, useRouter } from "next/navigation";

const SignInBtn = async () => {
  const router = useRouter();
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        <span>SignOut</span>
      </button>
    </form>
  );
};

export default SignInBtn;
