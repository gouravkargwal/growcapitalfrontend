import { globalEnums } from "@/enum";
import Link from "next/link";
import React from "react";

const Faqs = () => {
    return (
        <div className="bg-neutral text-textPrimary min-h-screen py-hero-padding">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-hero-title font-bold text-primary mb-8">
                    Frequently Asked Questions
                </h1>
                <p className="text-body-lg text-textSecondary mb-6">
                    At{" "}
                    <Link href="/">
                        <span className="text-primary font-semibold cursor-pointer hover:text-blue-600">
                            {globalEnums.brandName}
                        </span>
                    </Link>
                    , we strive to provide clear and transparent information. Here are some frequently asked questions regarding our services and platform.
                </p>

                <section className="flex flex-col gap-2 my-4">
                    <h2 className="text-cta-lg font-semibold text-primary">
                        What is the purpose of the information provided on the platform?
                    </h2>
                    <p className="text-body-lg">
                        The information provided on our platform is for general informational purposes only. While we strive to ensure the accuracy of the content, we do not guarantee its completeness or accuracy.
                    </p>
                </section>

                <section className="flex flex-col gap-2 my-4">
                    <h2 className="text-cta-lg font-semibold text-primary">
                        Is the information on this platform accurate and reliable?
                    </h2>
                    <p className="text-body-lg">
                        While we make every effort to keep the information up-to-date, we do not make any warranties regarding the completeness, reliability, or availability of the information, products, services, or related graphics on the platform.
                    </p>
                </section>

                <section className="flex flex-col gap-2 my-4">
                    <h2 className="text-cta-lg font-semibold text-primary">
                        Is the content provided considered professional advice?
                    </h2>
                    <p className="text-body-lg">
                        The content on this platform is not intended to be professional advice. Always consult a qualified professional for specific inquiries or situations.
                    </p>
                </section>

                <section className="flex flex-col gap-2 my-4">
                    <h2 className="text-cta-lg font-semibold text-primary">
                        Are there external links on the platform?
                    </h2>
                    <p className="text-body-lg">
                        Yes, our platform may contain links to third-party websites. However, we do not endorse or take responsibility for their content, privacy policies, or practices.
                    </p>
                </section>

                <section className="flex flex-col gap-2 my-4">
                    <h2 className="text-cta-lg font-semibold text-primary">
                        What is the limitation of liability for using the platform?
                    </h2>
                    <p className="text-body-lg">
                        To the maximum extent permitted by applicable law, we shall not be liable for any loss or damage, including indirect, consequential, incidental, or punitive damages, resulting from the use of our platform or reliance on the content provided.
                    </p>
                </section>

                <section className="flex flex-col gap-2 my-4">
                    <h2 className="text-cta-lg font-semibold text-primary">
                        Can the disclaimer be changed over time?
                    </h2>
                    <p className="text-body-lg">
                        We reserve the right to update or change this Disclaimer at any time without prior notice. Any updates will be posted on the page, and it’s your responsibility to review it regularly.
                    </p>
                </section>

                <section className="flex flex-col gap-2 my-4">
                    <h2 className="text-cta-lg font-semibold text-primary">
                        How can I contact you regarding this disclaimer?
                    </h2>
                    <p className="text-body-lg">
                        If you have any questions or concerns about this Disclaimer, please contact us at: info@informe.in
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Faqs;
