import Link from "next/link";
import React from "react";

const ModalTermsOfService = () => {
  return (
    <article className="max-h-lg mt-2">
      <div className="flex flex-col pb-1.5 border-b border-neutral-400">
        <span className="flex items-center ml-[-0.3rem] gap-1.5">
          <img
            src="/images/brand-logo-cropped.png"
            alt="skillseek"
            width={1000}
            height={1000}
            className="w-36 h-auto"
          />
          <h1 className="text-2xl font-bold">Terms of Service</h1>
        </span>
        <p className="text-lg font-semibold">Effective Date: January 1, 2025</p>
      </div>
      <section className="my-4">
        <p>
          <strong className="text-xl">1. Introduction</strong>
        </p>
        <p>
          These Terms of Service ("Terms") govern your access to and use of the
          SkillSeek mobile application ("App") developed and maintained by Fake
          Name Development ("we," "us," or "our"). By accessing or using the
          App, you agree to be bound by these Terms. If you do not agree to
          these Terms, please do not use the App.
        </p>
      </section>
      <section className="my-4">
        <p>
          <strong className="text-xl">2. Use of the App</strong>
        </p>
        <div className="mt-2">
          <ul className="list-disc">
            <li className="ml-5 text-lg font-semibold">
              License: We grant you a limited, non-exclusive, non-transferable
              license to use the App for your personal, non-commercial use.
            </li>
            <li className="ml-5 text-lg font-semibold">
              Acceptable Use: You agree to use the App only for lawful purposes
              and in accordance with these Terms. You may not:
            </li>
            <ul className="ml-10 list-disc space-y-3">
              <li>Use the App for any illegal or unauthorized purpose.</li>
              <li>
                Use the App in any way that could harm, disable, overburden, or
                impair the server on which the App is hosted or interfere with
                any other party's use and enjoyment of the App.
              </li>
              <li>
                Attempt to gain unauthorized access to any portion of the App,
                other accounts, computer systems, or networks connected to the
                App, through any means.  
              </li>
              <li>
                Use any automated means, including scripts, robots, crawlers, or
                spiders, to access, monitor, or copy any part of the App.
              </li>
              <li>
                Use the App to transmit any viruses, worms, malware, or other
                harmful code.
              </li>
              <li>
                Use the App to collect any personally identifiable information
                about other users without their consent.
              </li>
              <li>Violate any applicable laws or regulations.</li>
            </ul>
          </ul>
        </div>
      </section>
      <section className="my-4">
        <p>
          <strong className="text-xl">3. Intellectual Property</strong>
        </p>
        <div className="mt-2">
          <p>
            The App and all content included therein, such as text, graphics,
            logos, images, and software, are the property of Fake Name
            Development or its licensors and are protected by copyright,
            trademark, and other intellectual property laws. You agree not to
            use, reproduce, distribute, modify, transmit, or create derivative
            works of any of the App's content without our prior written consent.
          </p>
        </div>
      </section>
      <section className="my-4">
        <p>
          <strong className="text-xl">4. User Accounts</strong>
        </p>
        <div className="mt-2">
          <ul className="list-disc">
            <li className="ml-5">
              You may be required to create a user account to access certain
              features of the App.
            </li>
            <li className="ml-5">
              You are responsible for maintaining the confidentiality of your
              account credentials and for any activity that occurs under your
              account.
            </li>
            <li className="ml-5">
              You agree to immediately notify us of any unauthorized use of your
              account or any other breach of security.
            </li>
          </ul>
        </div>
      </section>
      <section className="my-4">
        <p>
          <strong className="text-xl">5. Payment and Billing</strong>
        </p>
        <div className="mt-2">
          <ul className="list-disc">
            <li className="ml-5">
              If you make in-app purchases, you agree to pay all applicable fees
              and taxes associated with such purchases.
            </li>
            <li className="ml-5">
              You authorize us to charge your chosen payment method for any
              purchases made through the App.
            </li>
            <li className="ml-5">
              You are responsible for ensuring that the payment information you
              provide is accurate and up-to-date.
            </li>
          </ul>
        </div>
      </section>
      <section className="my-4">
        <p>
          <strong className="text-xl">6. Disclaimer of Warranties</strong>
        </p>
        <div className="mt-2">
          <p className="text-lg leading-snug">
            THE APP IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTY OF
            ANY KIND, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE
            IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
            PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE APP WILL
            BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR
            THAT THE APP OR THE SERVER THAT MAKES IT AVAILABLE ARE FREE OF
            VIRUSES OR OTHER HARMFUL COMPONENTS.
          </p>
        </div>
      </section>
      <section className="my-4">
        <p>
          <strong className="text-xl">7. Limimation of Liability</strong>
        </p>
        <div className="mt-2">
          <p className="text-lg leading-snug">
            IN NO EVENT SHALL FAKE NAME DEVELOPMENT BE LIABLE FOR ANY INDIRECT,
            INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING,
            BUT NOT LIMITED TO, LOSS OF PROFITS, DATA LOSS, OR LOSS OF GOODWILL,
            ARISING OUT OF OR IN CONNECTION WITH THE USE OF THE APP, EVEN IF WE
            HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
          </p>
        </div>
      </section>
      <section className="my-4">
        <p>
          <strong className="text-xl">8. Indemnification</strong>
        </p>
        <div className="mt-2">
          <p className="text-lg">
            You agree to indemnify and hold harmless Fake Name Development and
            its affiliates, officers, directors, employees, agents, and
            licensors from any and all claims, liabilities, damages, losses,
            costs, and expenses (including attorneys' fees) arising out of or
            related to your use of the App, your violation of these Terms, or
            your infringement of any third-party rights.
          </p>
        </div>
      </section>
      <section className="my-4">
        <p>
          <strong className="text-xl">9. Governing Law</strong>
        </p>
        <div className="mt-2">
          <p className="text-lg">
            These Terms shall be governed by and construed in accordance with
            the laws of Tennessee.
          </p>
        </div>
      </section>
      <section className="my-4">
        <p>
          <strong className="text-xl">10. Change to These Terms</strong>
        </p>
        <div className="mt-2">
          <p className="text-lg">
            We may update these Terms from time to time. We will notify you of
            any material changes by posting the updated Terms on the App and/or
            by other appropriate means. Your continued use of the App after the
            effective date of any such changes constitutes your acceptance of
            the new Terms.
          </p>
        </div>
      </section>
      <section className="mt-4">
        <p>
          <strong className="text-xl">11. ContactUs</strong>
        </p>
        <div className="mt-2">
          <p className="text-lg">
            If you have any questions about these Terms, please contact us at:
            <Link href="mailto:support@skillseekapp.com">
              <span className="ml-2 text-cyan-800 hover:underline">
                support@skillseekapp.com.
              </span>
            </Link>
          </p>
        </div>
      </section>
    </article>
  );
};

export default ModalTermsOfService;
