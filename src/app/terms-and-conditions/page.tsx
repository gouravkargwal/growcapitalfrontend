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
          . By accessing or using our platform, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
        </p>

        <section className="flex flex-col">
          <h2 className="text-cta-lg font-semibold text-primary mb-4">
            1. Introduction
          </h2>
          <p className="text-body-lg mb-4">
            These terms and conditions govern your use of our platform and services. By accessing or using the platform, you agree to be bound by these terms, which include our privacy policy and any other policies we may implement from time to time.
          </p>
        </section>

        <section className="flex flex-col">
          <h2 className="text-cta-lg font-semibold text-primary mb-4">
            2. Use of Platform
          </h2>
          <p className="text-body-lg mb-4">
            You agree to use the platform for lawful purposes only. You must not use the platform for any activities that violate local, state, or international laws or regulations.
          </p>
        </section>

        <section className="flex flex-col">
          <h2 className="text-cta-lg font-semibold text-primary mb-4">
            3. Account Registration and Security
          </h2>
          <p className="text-body-lg mb-4">
            In order to access certain services, you may be required to create an account. You agree to provide accurate and complete information during the registration process and to keep your account details confidential. You are responsible for all activities that occur under your account.
          </p>
        </section>

        <section className="flex flex-col">
          <h2 className="text-cta-lg font-semibold text-primary mb-4">
            4. Intellectual Property
          </h2>
          <p className="text-body-lg mb-4">
            All content, trademarks, logos, and other intellectual property displayed on the platform are the property of{" "}
            <span className="text-primary font-semibold">
              {globalEnums.brandName}
            </span>{" "}
            or its licensors. You are not permitted to use, copy, or distribute any content without prior written consent.
          </p>
        </section>

        <section className="flex flex-col">
          <h2 className="text-cta-lg font-semibold text-primary mb-4">
            5. Third-Party Services and Links
          </h2>
          <p className="text-body-lg mb-4">
            Our platform may contain links to third-party websites and services. We do not control or endorse these external sites, and we are not responsible for their content or practices. By accessing such sites, you do so at your own risk.
          </p>
        </section>

        <section className="flex flex-col">
          <h2 className="text-cta-lg font-semibold text-primary mb-4">
            6. Limitation of Liability
          </h2>
          <p className="text-body-lg mb-4">
            To the fullest extent permitted by applicable law,{" "}
            <span className="text-primary font-semibold">
              {globalEnums.brandName}
            </span>{" "}
            will not be liable for any indirect, incidental, or consequential damages arising out of your use of the platform or services, including any loss of data, revenue, or profits.
          </p>
        </section>

        <section className="flex flex-col">
          <h2 className="text-cta-lg font-semibold text-primary mb-4">
            7. Suspension and Termination
          </h2>
          <p className="text-body-lg mb-4">
            We reserve the right to suspend or terminate your access to the platform at any time, with or without cause, if we believe you have violated these terms or engaged in unlawful activities.
          </p>
        </section>

        <section className="flex flex-col">
          <h2 className="text-cta-lg font-semibold text-primary mb-4">
            8. Privacy and Data Protection
          </h2>
          <p className="text-body-lg mb-4">
            We value your privacy and are committed to protecting your personal information. Please refer to our Privacy Policy for more details on how we collect, use, and protect your data.
          </p>
        </section>

        <section className="flex flex-col">
          <h2 className="text-cta-lg font-semibold text-primary mb-4">
            9. Changes to Terms and Conditions
          </h2>
          <p className="text-body-lg mb-4">
            We may update or amend these terms from time to time. Any changes will be posted on this page, and your continued use of the platform after such changes will constitute your acceptance of the new terms.
          </p>
        </section>

        <section className="flex flex-col">
          <h2 className="text-cta-lg font-semibold text-primary mb-4">
            10. Governing Law
          </h2>
          <p className="text-body-lg mb-4">
            These terms are governed by the laws of [Your Jurisdiction]. Any disputes arising from the use of the platform or services will be resolved under the exclusive jurisdiction of the courts in [Your Location].
          </p>
        </section>

        <section className="flex flex-col">
          <h2 className="text-cta-lg font-semibold text-primary mb-4">
            11. Contact Us
          </h2>
          <p className="text-body-lg mb-4">
            If you have any questions or concerns about these Terms and Conditions, please contact us at:
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
