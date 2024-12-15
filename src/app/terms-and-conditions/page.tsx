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
            Welcome to Informe. By accessing and using this website, you agree to comply with and be bound by the following terms and conditions.
          </p>
        </section>

        <section className="flex flex-col">
          <h2 className="text-cta-lg font-semibold text-primary mb-4">
            2. Acceptance of Terms
          </h2>
          <p className="text-body-lg mb-4">
            You agree to use the platform for lawful purposes only. You must not use the platform for any activities that violate local, state, or international laws or regulations.
          </p>
        </section>

        <section className="flex flex-col">
          <h2 className="text-cta-lg font-semibold text-primary mb-4">
            3. Intellectual Property Rights
          </h2>
          <p className="text-body-lg mb-4">
            All content on this website, including text, graphics, logos, images, and software, is the property of our company and is protected by intellectual property laws. You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our website without prior written consent.
          </p>
        </section>

        <section className="flex flex-col">
          <h2 className="text-cta-lg font-semibold text-primary mb-4">
            4. User Responsibilities
          </h2>
          <h3 className="text-body-lg font-semibold text-primary">
            4.1 Account Security
          </h3>
          <p className="text-body-lg mb-4">
            If you create an account on our website, you are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
          </p>
          <h3 className="text-body-lg font-semibold text-primary">
            4.2 Prohibited Activities
          </h3>
          <p className="text-body-lg mb-4">
            You agree not to:<br />
            - Use the website for any illegal or unauthorized purpose<br />
            - Violate any local, state, national, or international law<br />
            - Attempt to gain unauthorized access to any portion of the website<br />
            - Introduce any viruses, trojans, or other malicious code<br />
            - Collect personal information about other users without consent
          </p>
        </section>

        <section className="flex flex-col">
          <h2 className="text-cta-lg font-semibold text-primary mb-4">
            5. Limitation of Liability
          </h2>
          <p className="text-body-lg mb-4">
            The website and its contents are provided "as is" and "as available" without any warranties, express or implied. We do not guarantee the accuracy, completeness, or usefulness of any information on the website. In no event shall our company be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the website.
          </p>
        </section>

        <section className="flex flex-col">
          <h2 className="text-cta-lg font-semibold text-primary mb-4">
            6. Modifications to Terms
          </h2>
          <p className="text-body-lg mb-4">
            We reserve the right to modify these terms and conditions at any time. Changes will be effective immediately upon posting on the website. Your continued use of the website after changes constitutes acceptance of the new terms.
          </p>
        </section>

        <section className="flex flex-col">
          <h2 className="text-cta-lg font-semibold text-primary mb-4">
            7. Governing Law
          </h2>
          <p className="text-body-lg mb-4">
            These terms and conditions are governed by and construed in accordance with the laws of India. Any disputes relating to these terms shall be subject to the exclusive jurisdiction of the courts in Karnataka.
          </p>
        </section>

        <section className="flex flex-col">
          <h2 className="text-cta-lg font-semibold text-primary mb-4">
            8. Contact Information
          </h2>
          <p className="text-body-lg mb-4">
            If you have any questions about these terms and conditions, please contact us at:<br />

            <p className="text-body-lg text-primary font-semibold">
              info@informe.in
            </p>
            <br />
            Last Updated: 15th December 2024
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
