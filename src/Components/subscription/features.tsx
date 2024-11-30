import React from 'react';

interface PlanFeatureProps {
    title: string;
    description: string;
    powerUser: string | React.ReactNode;
    professional: string | React.ReactNode;
    beginner: string | React.ReactNode;
}

const PlanFeature: React.FC<PlanFeatureProps> = ({ title, description, powerUser, professional, beginner }) => (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 py-4 border-b border-gray-700">
        {/* Feature Title and Description */}
        <div className="col-span-1">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-black text-sm mt-1">{description}</p>
        </div>
        {/* Plan Details */}
        <div className="flex items-center justify-center text-center font-bold text-black">{powerUser}</div>
        <div className="flex items-center justify-center text-center font-bold text-black">{professional}</div>
        <div className="flex items-center justify-center text-center font-bold text-black">{beginner}</div>
    </div>
);

const ComparePlans: React.FC = () => {
    return (
        <div className="bg-white text-black p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-8">
                Compare Plans
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4 bg-white rounded-lg">
                {/* Plan Titles */}
                <div className="col-span-1"></div> {/* Empty space for titles */}
                <div className="flex flex-col items-center text-center font-bold">
                    <h3>POWER USER</h3>
                    <p className="text-orange-400">1st Priority</p>
                    <p className="text-xs text-gray-400">Fastest updates</p>
                </div>
                <div className="flex flex-col items-center text-center font-bold">
                    <h3>PROFESSIONAL</h3>
                    <p className="text-gray-300">2nd Priority</p>
                </div>
                <div className="flex flex-col items-center text-center font-bold">
                    <h3>BEGINNER</h3>
                    <p className="text-gray-300">3rd Priority</p>
                </div>
            </div>

            {/* Plan Features */}
            <PlanFeature
                title="Time-priority of updates sent on WhatsApp"
                description="Updates, as they occur, are first sent to the users subscribed to Power-User plan, followed by users subscribed to Professional plan & then to the Basic plan users."
                powerUser={<span>1st Priority <br /> <span className="text-orange-400">Fastest updates</span></span>}
                professional="2nd priority"
                beginner="3rd priority"
            />

            <PlanFeature
                title="Number of tracked stocks"
                description="Maximum number of stocks that a user can add to the list of tracked stocks to receive updates on them."
                powerUser="500 stocks"
                professional="150 stocks"
                beginner="15 stocks"
            />

            <PlanFeature
                title="Artificial Intelligence level"
                description="Different levels of AI power are used across different plans. Users with a more premium plan get higher quality differentiated updates due to better AI power."
                powerUser="Advanced"
                professional="High"
                beginner="Minimal"
            />

            <PlanFeature
                title="Preference Filter"
                description="Allows the user to enable/disable sub-categories of updates to receive only the updates that matter the most and avoid all other noise."
                powerUser={<span className="text-green-500">&#10003;</span>}  // Checkmark for enabled
                professional={<span className="text-green-500">&#10003;</span>}
                beginner={<span className="text-red-500">&#10005;</span>}    // Cross for not available
            />

            <PlanFeature
                title="Bulk upload of tracked stocks"
                description="Upload tracked stocks via a CSV file and manage a long list of stocks."
                powerUser={<span className="text-green-500">&#10003;</span>}
                professional={<span className="text-red-500">&#10005;</span>}
                beginner={<span className="text-red-500">&#10005;</span>}
            />
        </div>
    );
};

export default ComparePlans;
