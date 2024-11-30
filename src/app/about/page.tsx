import { globalEnums } from "@/enum";
import Link from "next/link";
import React from "react";

const AboutUs = () => {
    return (
        <div className="bg-neutral text-textPrimary min-h-screen py-hero-padding">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-hero-title font-bold text-primary mb-8">
                    About Us
                </h1>
                <p className="text-body-lg text-textSecondary mb-6">
                    At{" "}
                    <Link href="/">
                        <span className="text-primary font-semibold cursor-pointer hover:text-blue-600">
                            {globalEnums.brandName}
                        </span>
                    </Link>
                    , we are driven by a passion for delivering innovative solutions that empower individuals and organizations. Our mission is to provide high-quality products and services while maintaining a deep commitment to customer satisfaction.
                </p>

                <section className="flex flex-col gap-2 my-4">
                    <h2 className="text-cta-lg font-semibold text-primary">
                        Our Mission
                    </h2>
                    <p className="text-body-lg">
                        We aim to create a seamless experience for our users by providing products and services that meet their needs and exceed their expectations. We are committed to innovation, quality, and integrity in everything we do.
                    </p>
                </section>

                <section className="flex flex-col gap-2 my-4">
                    <h2 className="text-cta-lg font-semibold text-primary">
                        Our Vision
                    </h2>
                    <p className="text-body-lg">
                        Our vision is to become a leading platform in our industry, known for our commitment to excellence, customer-centric approach, and groundbreaking solutions. We envision a future where we continue to grow, innovate, and make a meaningful impact on the world.
                    </p>
                </section>

                <section className="flex flex-col gap-2 my-4">
                    <h2 className="text-cta-lg font-semibold text-primary">
                        Our Values
                    </h2>
                    <ul className="list-disc pl-5 text-body-lg">
                        <li>Customer-Centricity: Our customers' satisfaction is at the core of everything we do.</li>
                        <li>Innovation: We continuously strive to innovate and provide unique solutions.</li>
                        <li>Integrity: We uphold the highest standards of integrity in our work and interactions.</li>
                        <li>Collaboration: We believe in working together to achieve common goals.</li>
                    </ul>
                </section>

                <section className="flex flex-col gap-2 my-4">
                    <h2 className="text-cta-lg font-semibold text-primary">
                        Meet Our Team
                    </h2>
                    <p className="text-body-lg mb-4">
                        Our team consists of dedicated and passionate individuals who bring a wealth of experience and expertise to the table. We work together to achieve our mission and vision, constantly striving to exceed expectations and drive success.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                        {/* Team Member 1 */}
                        <div className="flex flex-col items-center text-center">
                            <img
                                src="/images/team/member1.jpg"
                                alt="Team Member 1"
                                className="w-32 h-32 rounded-full object-cover mb-4"
                            />
                            <h3 className="text-primary font-semibold mb-2">John Doe</h3>
                            <p className="text-body-lg text-textSecondary mb-2">CEO & Founder</p>
                            <p className="text-body-lg text-textSecondary">
                                John is the visionary behind {globalEnums.brandName}. With over 10 years of experience in the industry, he leads our company with a focus on innovation and growth.
                            </p>
                        </div>

                        {/* Team Member 2 */}
                        <div className="flex flex-col items-center text-center">
                            <img
                                src="/images/team/member2.jpg"
                                alt="Team Member 2"
                                className="w-32 h-32 rounded-full object-cover mb-4"
                            />
                            <h3 className="text-primary font-semibold mb-2">Jane Smith</h3>
                            <p className="text-body-lg text-textSecondary mb-2">Head of Operations</p>
                            <p className="text-body-lg text-textSecondary">
                                Jane is responsible for overseeing the daily operations of the company. With a strong background in management, she ensures everything runs smoothly and efficiently.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="flex flex-col gap-2 my-4">
                    <h2 className="text-cta-lg font-semibold text-primary">
                        Contact Us
                    </h2>
                    <p className="text-body-lg">
                        If you have any questions or would like to learn more about us, please feel free to reach out.
                    </p>
                    <p className="text-body-lg text-primary font-semibold">
                        info@informe.in
                    </p>
                </section>
            </div>
        </div>
    );
};

export default AboutUs;
