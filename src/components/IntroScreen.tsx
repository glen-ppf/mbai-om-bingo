import { motion } from 'motion/react';

interface IntroScreenProps {
    key?: string;
    onStart: () => void;
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            },
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            transition: { duration: 0.3 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 300, damping: 24 },
        },
    };

    return (
        <motion.div
            className="flex-1 flex items-center justify-center p-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <div className="max-w-[960px] w-full flex flex-col items-center text-center">
                {/* Logos */}
                <motion.div variants={itemVariants} className="flex items-center gap-8 mb-10">
                    <div className="w-28 h-28 rounded-full bg-white shadow-[0_4px_20px_rgba(122,0,60,0.15)] flex items-center justify-center overflow-hidden border-2 border-[#FDF6F0]">
                        <img src="/logos/mbai-club.jpg" alt="MBAi Club DeGroote" className="w-full h-full object-contain" />
                    </div>
                    <span className="font-display font-bold text-[#7A003C] text-5xl opacity-50">×</span>
                    <div className="w-28 h-28 rounded-full bg-white shadow-[0_4px_20px_rgba(122,0,60,0.15)] flex items-center justify-center overflow-hidden border-2 border-[#FDF6F0]">
                        <img src="/logos/om-club.jpg" alt="DeGroote Operations Management Club" className="w-full h-full object-contain" />
                    </div>
                </motion.div>

                {/* Titles */}
                <motion.h2 variants={itemVariants} className="font-display text-[#7A003C] font-semibold tracking-wide uppercase text-base mb-5">
                    MBAi Club × DeGroote Operations Management Club
                </motion.h2>

                <motion.div
                    variants={{
                        hidden: { width: 0, opacity: 0 },
                        visible: { width: '80px', opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } }
                    }}
                    className="h-1 bg-[#FDBF57] mb-6 rounded-full"
                />

                <motion.h1
                    variants={itemVariants}
                    className="font-display text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#7A003C] to-[#FDBF57] text-transparent bg-clip-text pb-2"
                >
                    AI Workflow Challenge
                </motion.h1>

                <motion.p variants={itemVariants} className="text-xl text-[#7A6070] mb-14 max-w-xl">
                    Can you spot where AI should be integrated into these business workflows?
                </motion.p>

                {/* Rule Cards */}
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-5 w-full mb-14">
                    {[
                        { num: 1, color: 'bg-[#7A003C]', text: 'Read the scenario and examine each workflow node' },
                        { num: 2, color: 'bg-[#B8860B]', text: 'Click on the step in the workflow where you think AI would have the biggest impact' },
                        { num: 3, color: 'bg-[#2E6B4F]', text: 'Every step will reveal the effect that AI implementation would have on the workflow, but only one option is the best choice!' },
                    ].map((rule, i) => (
                        <div key={i} className="clay-card flex-1 p-7 flex flex-col items-center text-center gap-4">
                            <div className={`w-12 h-12 rounded-full ${rule.color} text-white font-display font-bold text-lg flex items-center justify-center shadow-md`}>
                                {rule.num}
                            </div>
                            <p className="text-base text-[#2D2028] font-medium leading-relaxed">{rule.text}</p>
                        </div>
                    ))}
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-col items-center gap-6">
                    <p className="text-base font-bold text-[#7A6070] uppercase tracking-wider">
                        3 Scenarios · Find the optimal AI insertion point
                    </p>
                    <button
                        onClick={onStart}
                        className="clay-button bg-gradient-to-r from-[#7A003C] to-[#A6335F] text-white font-display font-bold text-2xl px-14 py-5 flex items-center gap-3"
                    >
                        Let's Go <span className="text-3xl leading-none">›</span>
                    </button>
                </motion.div>
            </div>
        </motion.div>
    );
}
