import React from 'react';
import { motion } from 'framer-motion';

const Trial: React.FC = () => {
    const containerVarient = {
        offscreen: { opacity: 0, y: 20 },
        onscreen: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.2,
                duration: 0.8,
                ease: 'easeInOut',
                staggerChildren: 0.2,
            },
        },
    };

    return (
        <section className="text-center py-16 bg-white">
            <motion.div
                initial="offscreen"
                whileInView="onscreen"
                variants={containerVarient}
                viewport={{ once: true, amount: 0.1 }}
                className="max-w-3xl mx-auto"
            >
                <motion.h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Get started in 30 seconds. <br /> Free for 7 days.
                </motion.h2>
                <motion.p className="text-gray-500 text-lg mb-8">
                    Simplify your business operations and consolidate your projects, clients, and team into one integrated, easy-to-use platform.
                </motion.p>
                <motion.a
                    href="#"
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out"
                >
                    Get started
                </motion.a>
            </motion.div>
        </section>
    );
};

export default Trial;
