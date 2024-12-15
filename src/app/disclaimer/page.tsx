import { globalEnums } from "@/enum";
import Link from "next/link";
import React from "react";

const Disclaimer = () => {
    return (
        <div className="bg-neutral text-textPrimary min-h-screen py-hero-padding">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-hero-title font-bold text-primary mb-8">
                    Disclaimer
                </h1>
                <p className="text-body-lg text-textSecondary mb-6">
                    At{" "}
                    <Link href="/">
                        <span className="text-primary font-semibold cursor-pointer hover:text-blue-600">
                            {globalEnums.brandName}
                        </span>
                    </Link>
                    , we strive to ensure the accuracy of the information provided on our
                    platform. However, we do not guarantee the completeness or accuracy of
                    the content. This Disclaimer outlines the terms under which we provide
                    our services and clarify our liability regarding the content and services.
                </p>

                <section className="flex flex-col gap-2 my-4">
                    <h2 className="text-cta-lg font-semibold text-primary">
                        General Information
                    </h2>
                    <p className="text-body-lg">
                        The information provided on our platform is for general informational
                        purposes only. While we make every effort to ensure the information is
                        accurate and up-to-date, we do not make any representations or
                        warranties of any kind, express or implied, about the completeness,
                        accuracy, reliability, suitability, or availability of the information,
                        products, services, or related graphics contained on the platform.
                    </p>
                </section>

                <section className="flex flex-col gap-2 my-4">
                    <h2 className="text-cta-lg font-semibold text-primary">
                        No Professional Advice
                    </h2>
                    <p className="text-body-lg">
                        The content on this platform is not intended to be and should not be
                        construed as professional advice. Always seek the advice of a qualified
                        professional for any questions you may have regarding specific subjects
                        or situations. We are not liable for any loss or damage arising from
                        reliance on information on this platform.
                    </p>
                </section>

                <section className="flex flex-col gap-2 my-4">
                    <h2 className="text-cta-lg font-semibold text-primary">
                        External Links
                    </h2>
                    <p className="text-body-lg">
                        Our platform may contain links to third-party websites that are not
                        under our control. We do not endorse or take responsibility for the
                        content, privacy policies, or practices of third-party websites. Use
                        these links at your own risk, and we encourage you to review their
                        respective terms and conditions and privacy policies.
                    </p>
                </section>

                <section className="flex flex-col gap-2 my-4">
                    <h2 className="text-cta-lg font-semibold text-primary">
                        Limitation of Liability
                    </h2>
                    <p className="text-body-lg">
                        To the maximum extent permitted by applicable law, we shall not be
                        liable for any loss or damage, including indirect, consequential,
                        incidental, or punitive damages, resulting from the use of our platform,
                        services, or reliance on any content provided.
                    </p>
                </section>

                <section className="flex flex-col gap-2 my-4">
                    <h2 className="text-cta-lg font-semibold text-primary">
                        Accuracy of Information
                    </h2>
                    <p className="text-body-lg">
                        While we attempt to keep the information accurate, we do not guarantee
                        that all content is complete, reliable, or free of errors. We may update
                        content periodically, and we do not guarantee that it will always be
                        accurate or up-to-date.
                    </p>
                </section>

                <section className="flex flex-col gap-2 my-4">
                    <h2 className="text-cta-lg font-semibold text-primary">
                        Changes to This Disclaimer
                    </h2>
                    <p className="text-body-lg">
                        We reserve the right to update or change this Disclaimer at any time
                        without prior notice. Any updates or changes will be posted on this
                        page, and it is your responsibility to review this page regularly.
                    </p>
                </section>

                <section className="flex flex-col gap-2 my-4">
                    <h2 className="text-cta-lg font-semibold text-primary">
                        Contact Us
                    </h2>
                    <p className="text-body-lg">
                        If you have any questions or concerns about this Disclaimer, please
                        contact us at:
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

export default Disclaimer;
