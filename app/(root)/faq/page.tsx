import React from "react";

const FAQ = () => {
  return (
    <>
      <section className="container h-screen w-full mx-auto bg-faq contact_container py-3 md:mt-16">
        <h1 className="mx-4 font-bold text-3xl pb-4 mt-20 md:mt-4 border-b">
          SkillSeek FAQ
        </h1>
        <div className="flex justify-center items-start mx-auto pb-10 md:pb-0">
          <div className="grid grid-cols-1 gap-20 w-full mx-auto md:place-self-center md:pr-0 md:pl-6 xl:pl-52 md:grid-cols-2 justify-end md:gap-52 lg:gap-12 md:mt-24">
            <div className="faq-container max-h-[45rem] overflow-y-auto p-4 flex-1 flex flex-col rounded-xl border-[3px] border-black shadow-lg shadow-black -mt-8">
              <h2 className="text-2xl font-semibold text-slate-900">
                Getting Started
              </h2>
              <article className="px-5 text-slate-900">
                <h3 className="text-xl font-semibold">What is SkillSeek?</h3>
                <p>
                  SkillSeek is a platform that connects skilled professionals
                  with individuals and businesses seeking specific services.
                  Whether you're looking to hire a freelancer or offer your
                  professional services, SkillSeek makes the process seamless
                  and straightforward.
                </p>
              </article>

              <article className="px-5 text-slate-900">
                <h3 className="text-xl font-semibold">
                  How do I create an account?
                </h3>
                <ol className="list-decimal pl-8">
                  <li>
                    Click on the &quot;Signin&quot; button in the top right
                    corner.
                  </li>
                  <li>Select your Google account.</li>
                  <li>That&apos;s it! You&apos;re now signed in.</li>
                </ol>
              </article>

              <article className="px-5 text-slate-900">
                <h3 className="text-xl font-semibold">
                  Is it free to use SkillSeek?
                </h3>
                <ul className="list-disc pl-8">
                  <li>
                    Creating a basic account is free, but there are some
                    additional features that require a paid subscription.
                  </li>
                  <li>
                    You can explore our paid plans and choose the one that best
                    suits your needs.
                  </li>
                  <li>
                    Once you sign up, you can start using SkillSeek right away.
                  </li>
                </ul>
              </article>

              <h2 className="text-2xl font-semibold text-slate-900">
                For Service Providers
              </h2>
              <article className="px-5 text-slate-900">
                <h3 className="text-xl font-semibold">
                  How do I create a service?
                </h3>
                <ol className="list-decimal pl-8">
                  <li>
                    Select the &quot;Create Service&quot; link located in the
                    &apos;Services&apos; dropdown menu.
                  </li>
                  <li>
                    Fill out all fields and upload an image that represents your
                    service.
                  </li>
                  <li>
                    Click The &quot;Submit Your Service&quot; button to create
                    your service. You will receive a &apos;Success&apos; popup
                    message when your service has been successfully created.
                  </li>
                </ol>
              </article>

              <article className="px-5 text-slate-900">
                <h3 className="text-xl font-semibold">
                  How do I edit a service?
                </h3>
                <ol className="list-decimal pl-8">
                  <li>
                    If you are the author of a service, you can edit it by
                    clicking on the green &quot;Four Square&quot; button.
                  </li>
                  <li>
                    Edit the details of your service, such as the title, image,
                    description, and category.
                  </li>
                  <li>
                    Click &quot;Update Service&quot; button to update your
                    service. You&apos;ll be redirected to the details page of
                    that service.
                  </li>
                </ol>
              </article>

              <article className="px-5 text-slate-900">
                <h3 className="text-xl font-semibold">
                  What if I want to delete a service?
                </h3>
                <ol className="list-decimal pl-8">
                  <li>
                    If you are the author of a service, you can delete it by
                    clicking on the red &quot;Square with - inside&quot; button.
                  </li>
                  <li>
                    A pop-up window will appear asking you to confirm your
                    action to delete the service.
                  </li>
                  <li>
                    Click &quot;Delete&quot; button to delete your service, or
                    &quot;Cancel&quot; to cancel the deletion.
                  </li>
                </ol>
              </article>

              <h2 className="text-2xl font-semibold text-slate-900">
                For Service Seekers
              </h2>
              <h3 className="text-xl font-semibold">
                How do I find the right service provider?
              </h3>
              <article className="px-5 text-slate-900">
                <ul className="list-disc pl-8">
                  <li>
                    Use our advanced search feature by searching for keywords,
                    authors, or categories.
                  </li>
                  <li>
                    Edit the details of your service, such as the title, image,
                    description, and category.
                  </li>
                  <li>
                    Read client reviews and ratings to help you make an informed
                    decision.
                  </li>
                  <li>
                    Compare pricing and service offerings to find the best deal.
                  </li>
                  <li>
                    Email the service provider to discuss your specific needs
                    and requirements. You will find their contact email in the
                    service details page.
                  </li>
                </ul>
              </article>
            </div>
            <div className="flex flex-col items-end md:items-start w-full px-4 md:px-0 md:w-[22rem] mt-12 md:-mt-8">
              <img
                src="/faq-thumb.webp"
                alt="community sharing"
                width={1000}
                height={1000}
                className="w-full h-1/4 md:h-1/2 object-cover rounded-xl border-[3px] border-black opacity-90 shadow-lg shadow-neutral-800"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
