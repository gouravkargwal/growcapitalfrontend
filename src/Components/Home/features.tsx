import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface CardProps {
    title: string;
    description: string;
    icon: string;
    direction: 'left' | 'right'; // direction determines the animation side
}

const Features: React.FC = () => {
    const cardData: CardProps[] = [
        {
            title: "Project Management",
            description:
                "Manage your projects from start to finish. With all your projects in Ganttify, you’ll always know who’s doing what, by when.",
            icon: "📋",
            direction: "left",
        },
        {
            title: "Workflows and Automations",
            description:
                "Create more efficient processes so you can seamlessly manage projects across departments and get more done in less time.",
            icon: "🔗",
            direction: "right",
        },
        {
            title: "Goals and Reporting",
            description:
                "See how each project and portfolio ladders up to company objectives and keep everyone focused on the work that matters.",
            icon: "🎯",
            direction: "left",
        },
        {
            title: "Resource Management",
            description:
                "Get the visibility you need to plan accurate timelines, adjust workloads, and stay on track to achieve your objectives.",
            icon: "📦",
            direction: "right",
        },
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
                {cardData.map((card, index) => (
                    <FeatureCard
                        key={index}
                        title={card.title}
                        description={card.description}
                        icon={card.icon}
                        direction={card.direction}
                    />
                ))}
            </div>
        </section>
    );
};

const FeatureCard: React.FC<CardProps> = ({ title, description, icon, direction }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.8, // Controls when the animation triggers (10% visibility)
    });

    const variants = {
        hidden: { opacity: 0, x: direction === 'left' ? -100 : 100 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={variants}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-start"
        >
            <div className="text-4xl">{icon}</div>
            <h3 className="text-2xl font-bold mt-4">{title}</h3>
            <p className="text-gray-600 mt-2">{description}</p>
        </motion.div>
    );
};

export default Features;
