import { globalEnums } from "@/enum";
import Link from "next/link";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-neutral text-textPrimary min-h-screen py-hero-padding">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-hero-title font-bold text-primary mb-8">
          Privacy Policy
        </h1>
        <p className="text-body-lg text-textSecondary mb-6">
          At{" "}
          <Link href="/">
            <span className="text-primary font-semibold cursor-pointer hover:text-blue-600">
              {globalEnums.brandName}
            </span>
          </Link>
          , we are committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, and share your personal information when you use our services. Please read it carefully.
        </p>

        <section className="flex flex-col gap-2 my-4">
          <h2 className="text-cta-lg font-semibold text-primary">
            1. Information We Collect
          </h2>
          <p className="text-body-lg">
            We collect the following types of information when you use our platform:
          </p>
          <ul className="list-disc pl-5 text-body-lg">
            <li>Email address</li>
            <li>Full name</li>
            <li>Phone number</li>
            <li>Payment information</li>
            <li>Transaction details</li>
            <li>Technical data (e.g., IP address, device information, browsing activity)</li>
          </ul>
        </section>

        <section className="flex flex-col gap-2 my-4">
          <h2 className="text-cta-lg font-semibold text-primary">
            2. How We Use Your Information
          </h2>
          <p className="text-body-lg">
            We use your personal information for the following purposes:
          </p>
          <ul className="list-disc pl-5 text-body-lg">
            <li>To provide, operate, and maintain our services</li>
            <li>To personalize and improve your experience</li>
            <li>To process transactions and send related notifications</li>
            <li>To communicate with you, including sending promotional emails</li>
            <li>To ensure compliance with legal obligations</li>
            <li>For business analytics and improving our platform</li>
          </ul>
        </section>

        <section className="flex flex-col gap-2 my-4">
          <h2 className="text-cta-lg font-semibold text-primary">
            3. Sharing Your Information
          </h2>
          <p className="text-body-lg">
            We do not sell or rent your personal information to third parties. However, we may share your information in the following circumstances:
          </p>
          <ul className="list-disc pl-5 text-body-lg">
            <li>With trusted service providers who assist us in operating the platform</li>
            <li>With our partners for marketing and analytics purposes</li>
            <li>With third-party providers for processing payments or fulfilling transactions</li>
            <li>With regulatory or legal authorities when required by law</li>
          </ul>
          <p className="text-body-lg">
            We also use third-party services like{" "}
            <span className="font-semibold text-primary">OpenAI</span> to generate summaries and other content. Rest assured, we do not share your personal or sensitive data with these services unless explicitly stated.
          </p>
        </section>

        <section className="flex flex-col gap-2 my-4">
          <h2 className="text-cta-lg font-semibold text-primary">
            4. Security of Your Information
          </h2>
          <p className="text-body-lg">
            We implement appropriate technical and organizational measures to protect your personal data from unauthorized access, loss, alteration, or disclosure. However, no method of electronic transmission or storage is 100% secure, so we cannot guarantee absolute security.
          </p>
        </section>

        <section className="flex flex-col gap-2 my-4">
          <h2 className="text-cta-lg font-semibold text-primary">
            5. Your Privacy Rights
          </h2>
          <p className="text-body-lg">
            Depending on your location, you may have the following rights regarding your personal information:
          </p>
          <ul className="list-disc pl-5 text-body-lg">
            <li>Access to the personal data we hold about you</li>
            <li>Requesting the correction or deletion of your personal data</li>
            <li>Objecting to processing or requesting restriction of processing</li>
            <li>Opting out of receiving marketing communications</li>
          </ul>
          <p className="text-body-lg">
            To exercise your privacy rights, please contact us at the details below.
          </p>
        </section>

        <section className="flex flex-col gap-2 my-4">
          <h2 className="text-cta-lg font-semibold text-primary">
            6. Data Retention
          </h2>
          <p className="text-body-lg">
            We retain your personal data for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.
          </p>
        </section>

        <section className="flex flex-col gap-2 my-4">
          <h2 className="text-cta-lg font-semibold text-primary">
            7. Changes to This Privacy Policy
          </h2>
          <p className="text-body-lg">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we will notify you by email or through a notice on our platform. By continuing to use our platform, you agree to the updated terms.
          </p>
        </section>

        <section className="flex flex-col gap-2 my-4">
          <h2 className="text-cta-lg font-semibold text-primary">
            8. Contact Us
          </h2>
          <p className="text-body-lg">
            If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
          </p>
          <p className="text-body-lg text-primary font-semibold">
            info@informe.in
          </p>
          <br />
          Last Updated: 15th December 2024
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
