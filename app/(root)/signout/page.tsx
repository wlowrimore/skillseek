import { SignOutBtn } from "@/components/AuthButtons";

export default function SignOutPage() {
  return (
    <>
      <section className="sign-out_container bg-swirl-pattern">
        <div className="text-3xl text-center font-bold">
          <h5>Are you sure you want to sign out?</h5>

          <SignOutBtn />
        </div>
      </section>
    </>
  );
}
