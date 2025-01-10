import { SignOutBtn } from "@/components/AuthButtons";
import LoadingBar from "@/components/ui/LoadingBar";
import { Suspense } from "react";

export default function SignOutPage() {
  return (
    <Suspense fallback={<LoadingBar />}>
      <section className="sign-out_container bg-swirl-pattern">
        <div className="text-3xl text-center font-bold">
          <h1>Are you sure you want to sign out?</h1>
          <SignOutBtn />
        </div>
      </section>
    </Suspense>
  );
}
