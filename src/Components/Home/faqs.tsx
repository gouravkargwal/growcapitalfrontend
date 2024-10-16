import React from 'react';
import { motion } from 'framer-motion';

interface AccordionProps {
    question: string;
}

const Faqs: React.FC = () => {
    const cardVariants = {
        offscreen: {
            opacity: 0,
            y: 100,
        },
        onscreen: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                bounce: 0.4,
                duration: 0.8,
            },
        },
    };

    return (
        <section className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            {/* Motion wrapper for animation */}
            <motion.div
                variants={cardVariants}
                initial="offscreen"
                whileInView="onscreen"
                className="text-center mb-10"
                viewport={{ once: true, amount: 0.1 }}
            >
                <h1 className="text-4xl font-bold text-gray-900">Your money questions, answered.</h1>
            </motion.div>

            {/* Accordion Section with animation */}
            <motion.div
                variants={cardVariants}
                initial="offscreen"
                whileInView="onscreen"
                className="w-full max-w-2xl space-y-4"
                viewport={{ once: true, amount: 0.1 }}
            >
                <Accordion question="5.00% APY? Is this a promotional rate?" />
                <Accordion question="What's so great about a high APY anyway?" />
                <Accordion question="How should I think about bonds vs. cash?" />
                <Accordion question="What if I don’t fully trust robots with my investments?" />
            </motion.div>

            {/* CTA Button */}
            <motion.button
                variants={cardVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.1 }}
                className="mt-10 px-6 py-3 bg-teal-500 text-white rounded-lg shadow-md hover:bg-teal-400 transition-all"
            >
                Book a Demo
            </motion.button>
        </section>
    );
};

const Accordion: React.FC<AccordionProps> = ({ question }) => {
    return (
        <div className="p-4 border border-gray-300 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold">{question}</h2>
        </div>
    );
};

export default Faqs;
