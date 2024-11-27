import { globalEnums } from "@/enum";
import Link from "next/link";
import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="bg-neutral text-textPrimary min-h-screen py-hero-padding">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-hero-title font-bold text-primary mb-8">
          Terms and Conditions
        </h1>
        <p className="text-body-lg text-textSecondary mb-6">
          Welcome to{" "}
          <Link href="/">
            <span className="text-primary font-semibold cursor-pointer hover:text-blue-600">
              {globalEnums.brandName}
            </span>
          </Link>
          . By accessing or using our platform, you agree to comply with and be
          bound by the following terms and conditions. Please read them
          carefully.
        </p>

        <section className="flex flex-col">
          <h2 className="text-cta-lg font-semibold text-primary mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="text-body-lg mb-4">
            By using our platform, you confirm that you have read, understood,
            and agree to these Terms and Conditions. If you do not agree with
            any part of these terms, you must not use the platform.
          </p>
        </section>

        <section className="flex flex-col">
          <h2 className="text-cta-lg font-semibold text-primary mb-4">
            2. Changes to Terms
          </h2>
          <p className="text-body-lg mb-4">
            We reserve the right to update or modify these terms at any time
            without prior notice. Your continued use of the platform after any
            changes indicates your acceptance of the new terms.
          </p>
        </section>

        <section className="flex flex-col">
          <h2 className="text-cta-lg font-semibold text-primary mb-4">
            3. User Responsibilities
          </h2>
          <ul className="list-disc pl-5 text-body-lg mb-4">
            <li>You agree to use the platform only for lawful purposes.</li>
            <li>
              You will not use the platform to transmit, distribute, or store
              content that violates the rights of others or any applicable laws.
            </li>
            <li>
              You are responsible for maintaining the confidentiality of your
              account credentials.
            </li>
          </ul>
        </section>

        <section className="flex flex-col">
          <h2 className="text-cta-lg font-semibold text-primary mb-4">
            4. Intellectual Property
          </h2>
          <p className="text-body-lg mb-4">
            All content, trademarks, and other intellectual property displayed
            on the platform are the property of{" "}
            <span className="text-primary font-semibold">
              {globalEnums.brandName}
            </span>{" "}
            or its licensors. You may not use, copy, or distribute any content
            without prior written permission.
          </p>
        </section>

        <section className="flex flex-col">
          <h2 className="text-cta-lg font-semibold text-primary mb-4">
            5. Limitation of Liability
          </h2>
          <p className="text-body-lg mb-4">
            To the fullest extent permitted by law,{" "}
            <span className="text-primary font-semibold">
              {globalEnums.brandName}
            </span>{" "}
            will not be liable for any indirect, incidental, or consequential
            damages arising from your use of the platform.
          </p>
        </section>

        <section className="flex flex-col">
          <h2 className="text-cta-lg font-semibold text-primary mb-4">
            6. Third-Party Services
          </h2>
          <p className="text-body-lg mb-4">
            Our platform may integrate with third-party services, including
            OpenAI for AI-generated features like news summaries. We are not
            responsible for the practices or content of third-party services.
          </p>
        </section>

        <section className="flex flex-col">
          <h2 className="text-cta-lg font-semibold text-primary mb-4">
            7. Termination
          </h2>
          <p className="text-body-lg mb-4">
            We reserve the right to suspend or terminate your access to the
            platform at our sole discretion, without prior notice, if you
            violate these terms.
          </p>
        </section>

        <section className="flex flex-col">
          <h2 className="text-cta-lg font-semibold text-primary mb-4">
            8. Governing Law
          </h2>
          <p className="text-body-lg mb-4">
            These terms are governed by the laws of [Your Jurisdiction]. Any
            disputes arising out of or in connection with these terms will be
            subject to the exclusive jurisdiction of the courts in [Your
            Location].
          </p>
        </section>

        <section className="flex flex-col">
          <h2 className="text-cta-lg font-semibold text-primary mb-4">
            9. Contact Us
          </h2>
          <p className="text-body-lg">
            If you have any questions about these Terms and Conditions, please
            contact us at:
          </p>
          <p className="text-body-lg text-primary font-semibold">
            info@informe.in
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
