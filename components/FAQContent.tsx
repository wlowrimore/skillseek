import MobileFAQQuickLinks from "./MobileFAQQuickLinks";

const FAQContent = () => {
  return (
    <>
      <div className="relative mt-4 faq-container w-full md:w-[24rem] lg:w-[30rem] xl:w-[40rem] max-h-[44.5rem] md:max-h-[65rem] flex-1 flex flex-col rounded-xl border-t md:border-[3px] border-black md:shadow-lg md:shadow-black mb-10 lg:mb-0 md:mt-0 lg:mt-0">
        <div className="md:max-h-[34rem] lg:max-h-[34rem] w-full overflow-y-auto py-12 lg:py-5">
          <div className="absolute left-0 right-0 pr-0 top-0 flex justify-end">
            <MobileFAQQuickLinks />
          </div>
          <h2
            id="getting-started"
            className="text-2xl mb-3 font-bold text-slate-900"
          >
            Getting Started
          </h2>
          <article className="w-full mb-3 text-slate-900">
            <h3 className="text-xl font-semibold">What is SkillSeek?</h3>
            <p>
              SkillSeek is a platform that connects skilled professionals with
              individuals and businesses seeking specific services. Whether
              you're looking to hire a freelancer or offer your professional
              services, SkillSeek makes the process seamless and
              straightforward.
            </p>
          </article>

          <article className="text-slate-900 mb-3">
            <h3 className="text-xl font-semibold">
              How do I create an account?
            </h3>
            <ol className="list-decimal px-6 space-y-2 pt-3">
              <li>
                Click on the &quot;Signin&quot; button in the top right corner.
              </li>
              <li>Select your Google account.</li>
              <li>That&apos;s it! You&apos;re now signed in.</li>
            </ol>
          </article>

          <article className="text-slate-900 mb-3">
            <h3 className="text-xl font-semibold">
              Is it free to use SkillSeek?
            </h3>
            <ul className="list-disc px-6 space-y-2 pt-3">
              <li>
                Creating a basic account is free, but there are some additional
                features that require a paid subscription.
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

          <h2
            id="for-service-providers"
            className="text-2xl font-bold text-slate-900 mb-3"
          >
            For Service Providers
          </h2>
          <article className="text-slate-900 mb-3">
            <h3 className="text-xl font-semibold">
              How do I create a service?
            </h3>
            <ol className="list-decimal px-6 space-y-2 pt-3">
              <li>
                Select the &quot;Create Service&quot; link located in the
                &apos;Services&apos; dropdown menu.
              </li>
              <li>
                Fill out all fields and upload an image that represents your
                service.
              </li>
              <li>
                Click The &quot;Submit Your Service&quot; button to create your
                service. You will receive a &apos;Success&apos; popup message
                when your service has been successfully created.
              </li>
            </ol>
          </article>

          <article className="text-slate-900 mb-3">
            <h3 className="text-xl font-semibold">How do I edit a service?</h3>
            <ol className="list-decimal px-6 space-y-2 pt-3">
              <li>
                If you are the author of a service, you can edit it by clicking
                on the green &quot;Four Square&quot; button.
              </li>
              <li>
                Edit the details of your service, such as the title, image,
                description, and category.
              </li>
              <li>
                Click &quot;Update Service&quot; button to update your service.
                You&apos;ll be redirected to the details page of that service.
              </li>
            </ol>
          </article>

          <article className="text-slate-900 mb-3">
            <h3 className="text-xl font-semibold">
              What if I want to delete a service?
            </h3>
            <ol className="list-decimal px-6 space-y-2 pt-3">
              <li>
                If you are the author of a service, you can delete it by
                clicking on the red &quot;Square with - inside&quot; button.
              </li>
              <li>
                A pop-up window will appear asking you to confirm your action to
                delete the service.
              </li>
              <li>
                Click &quot;Delete&quot; button to delete your service, or
                &quot;Cancel&quot; to cancel the deletion.
              </li>
            </ol>
          </article>

          <h2
            id="for-service-seekers"
            className="text-2xl font-bold text-slate-900 mb-3"
          >
            For Service Seekers
          </h2>
          <h3 className="text-xl font-semibold">
            How do I find the right service provider?
          </h3>
          <article className="text-slate-900 mb-3">
            <ul className="list-disc px-6 space-y-2 pt-3">
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
                Email the service provider to discuss your specific needs and
                requirements. You will find their contact email in the service
                details page.
              </li>
            </ul>
          </article>
          <h3 className="text-xl font-semibold">
            What if I&apos;m not satisfied with the service?
          </h3>
          <article className="text-slate-900 mb-3">
            <ul className="list-disc px-6 space-y-2 pt-3">
              <li>
                We have a dispute resolution process in place to help you.
              </li>
              <li>
                You can contact our support team if you encounter any issues.
              </li>
              <li>Providers must meet agreed-upon service standards.</li>
              <li>
                Refund options are available in a case of unsatisfactory
                service.
              </li>
            </ul>
          </article>
          <h2
            id="account--security"
            className="text-2xl font-bold text-slate-900 mb-3"
          >
            Account & Security
          </h2>
          <h3 className="text-xl font-semibold">
            Is my personal information safe?
          </h3>
          <article className="text-slate-900 mb-3">
            <ul className="list-disc px-6 space-y-2 pt-3">
              <li>
                We use industry-standard encryption to protect your personal
                information.
              </li>
              <li>Your payment and personal details are securely stored.</li>
              <li>
                Read client reviews and ratings to help you make an informed
                decision.
              </li>
              <li>
                We never share your personal information without your consent.
              </li>
              <li>
                We use two-factor authentication, provided by Google, to secure
                your account.
              </li>
            </ul>
          </article>
          <h2
            id="pricing--payments"
            className="text-2xl font-bold text-slate-900 mb-3"
          >
            Pricing & Payments
          </h2>
          <h3 className="text-xl font-semibold">
            What payment methods do you accept?
          </h3>
          <article className="text-slate-900 mb-3">
            <ul className="list-disc px-6 space-y-2 pt-3">
              <li>Credit/Debit Cards</li>
              <li>PayPal</li>
              <li>Bank Transfers</li>
              <li>Digital Wallets</li>
            </ul>
          </article>
          <h3 className="text-xl font-semibold">Are there any hidden fees?</h3>
          <article className="text-slate-900 mb-3">
            <ul className="list-disc px-6 space-y-2 pt-3">
              <li>No hidden fees.</li>
              <li>Transparent pricing structure.</li>
              <li>Small platform commissions on completed services.</li>
              <li>All fees are clearly communicated before service booking.</li>
            </ul>
          </article>
          <h2
            id="technical-support"
            className="text-2xl font-bold text-slate-900 mb-3"
          >
            Technical Support
          </h2>
          <h3 className="text-xl font-semibold">How can I contact support?</h3>
          <article className="text-slate-900 mb-3">
            <ul className="list-disc px-6 space-y-2 pt-3">
              <li>Email: support@skillseek.app</li>
              <li>Live chat on the platform &#40; comming soon &#41;</li>
              <li>Help center with comprehensive guides</li>
              <li>Response time 24-48 hours</li>
            </ul>
          </article>
          <h3 className="text-xl font-semibold">
            What devices can I access SkillSeek on?
          </h3>
          <article className="text-slate-900 mb-3">
            <ul className="list-disc px-6 space-y-2 pt-3">
              <li>Web Browsers: Chrome, Firefox, Safari, Edge</li>
              <li>Mobile responsive design</li>
              <li>Future mobile apps for iOS and Android</li>
            </ul>
          </article>
          <h3 className="text-xl font-semibold">
            Do you verify service providers?
          </h3>
          <article className="text-slate-900 mb-3">
            <ul className="list-disc px-6 space-y-2 pt-3">
              <li>Basic verification for all accounts</li>
              <li>
                Optional advanced verification for professional certification
              </li>
              <li>User review and rating system helps maintain quality</li>
            </ul>
          </article>
          <h3 className="text-xl font-semibold">
            What are your terms of service?
          </h3>
          <article className="text-slate-900 mb-3">
            <ul className="list-disc px-6 space-y-2 pt-3">
              <li>Detailed terms of service available on the platform</li>
              <li>Covers user conduct, service standards, payment policies</li>
              <li>Designed to protect both service providers and seekers</li>
            </ul>
          </article>
          <h2
            id="troubleshooting"
            className="text-2xl font-bold text-slate-900 mb-3"
          >
            Troubleshooting
          </h2>
          <h3 className="text-xl font-semibold">
            I&apos;m having trouble signing in
          </h3>
          <article className="text-slate-900 mb-3">
            <ul className="list-disc px-6 space-y-2 pt-3">
              <li>Check your internet connection.</li>
              <li>Make sure you have an active Google account.</li>
              <li>Try signing in with a different Google account.</li>
              <li>
                If you are still having trouble, contact our support team.
              </li>
              <li>Clear your browser cache and cookies.</li>
              <li>Contact support@skillseek.app if issues persist.</li>
            </ul>
          </article>
          <hr className="bg-black my-4"></hr>
          <h2
            id="still-have-questions"
            className="text-2xl font-bold text-slate-900 mb-3"
          >
            Still have questions?
          </h2>
          <article className="text-slate-900">
            <p className="">
              Our support team is always ready to help. Reach out through the
              contact methods listed in the support section.
            </p>
          </article>
        </div>
      </div>
    </>
  );
};

export default FAQContent;
