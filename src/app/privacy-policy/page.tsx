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
          , we are committed to protecting your personal information and your
          right to privacy. This Privacy Policy explains what information we
          collect, how we use it, and what rights you have in relation to it.
        </p>

        <section className="flex flex-col gap-2 my-4">
          <h2 className="text-cta-lg font-semibold text-primary">
            Information We Collect
          </h2>
          <p className="text-body-lg">
            We collect personal information that you voluntarily provide to us
            when you register on the platform, express an interest in our
            services, or otherwise contact us. This may include:
          </p>
          <ul className="list-disc pl-5 text-body-lg">
            <li>Email address</li>
            <li>Full name</li>
            <li>Contact information</li>
            <li>Transaction details</li>
          </ul>
        </section>

        <section className="flex flex-col gap-2 my-4">
          <h2 className="text-cta-lg font-semibold text-primary">
            How We Use Your Information
          </h2>
          <p className="text-body-lg">
            We use the information we collect for purposes such as:
          </p>
          <ul className="list-disc pl-5 text-body-lg">
            <li>Providing, operating, and maintaining our services</li>
            <li>Improving and personalizing your experience</li>
            <li>Communicating updates and promotional offers</li>
            <li>Ensuring compliance with legal obligations</li>
            <li>
              Generating short news summaries using AI technologies provided by{" "}
              <span className="font-semibold text-primary">OpenAI</span>
            </li>
          </ul>
          <p className="text-body-lg">
            When using OpenAI for news summaries, we ensure that only publicly
            available information is processed, and no personal user data is
            shared with OpenAI.
          </p>
        </section>

        <section className="flex flex-col gap-2 my-4">
          <h2 className="text-cta-lg font-semibold text-primary">
            Sharing Your Information
          </h2>
          <p className="text-body-lg">
            We do not share or sell your personal information to third parties
            without your consent. However, we may share your information with
            trusted service providers to help us provide our services. This
            includes:
          </p>
          <ul className="list-disc pl-5 text-body-lg">
            <li>Hosting and storage providers</li>
            <li>Analytics and monitoring tools</li>
            <li>
              AI services like{" "}
              <span className="font-semibold text-primary">OpenAI</span>, only
              for generating news summaries or similar features. No sensitive or
              personal data is shared during these processes.
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-2 my-4">
          <h2 className="text-cta-lg font-semibold text-primary">
            Your Privacy Rights
          </h2>
          <p className="text-body-lg">
            Depending on your location, you may have certain rights under
            applicable data protection laws, including:
          </p>
          <ul className="list-disc pl-5 text-body-lg">
            <li>Accessing the data we hold about you</li>
            <li>Requesting corrections or deletion of your data</li>
            <li>Opting out of marketing communications</li>
          </ul>
        </section>

        <section className="flex flex-col gap-2 my-4">
          <h2 className="text-cta-lg font-semibold text-primary">Contact Us</h2>
          <p className="text-body-lg">
            If you have any questions or concerns about this Privacy Policy,
            please contact us at:
          </p>
          <p className="text-body-lg text-primary font-semibold">
            info@informe.in
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
