import { motion } from 'motion/react';
import { Trophy, Star, Lightbulb, Check, X, RotateCcw } from 'lucide-react';
import { ScenarioData } from '../data';

interface SummaryScreenProps {
    key?: string;
    results: boolean[];
    scenarios: ScenarioData[];
    onReset: () => void;
}

export default function SummaryScreen({ results, scenarios, onReset }: SummaryScreenProps) {
    const score = results.filter(Boolean).length;
    const total = scenarios.length;

    const getIconBlock = () => {
        if (score === 3) {
            return {
                icon: Trophy,
                gradient: 'from-[#FDBF57] to-[#EA580C]',
                color: 'text-white',
            };
        }
        if (score === 2) {
            return {
                icon: Star,
                gradient: 'from-[#7A003C] to-[#A6335F]',
                color: 'text-white',
            };
        }
        return {
            icon: Lightbulb,
            gradient: 'from-[#7A003C] to-[#FDBF57]',
            color: 'text-white',
        };
    };

    const { icon: Icon, gradient, color } = getIconBlock();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 },
        },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
    };

    return (
        <motion.div
            className="flex-1 flex items-center justify-center p-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <div className="max-w-[560px] w-full flex flex-col items-center text-center">
                {/* Floating Icon Block */}
                <motion.div
                    variants={itemVariants}
                    animate={{ y: [0, -10, 0], rotate: [0, 2, -2, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${gradient} shadow-xl flex items-center justify-center mb-8`}
                >
                    <Icon className={`w-12 h-12 ${color}`} />
                </motion.div>

                <motion.h1
                    variants={itemVariants}
                    className="font-display text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#7A003C] to-[#FDBF57] text-transparent bg-clip-text pb-2"
                >
                    Challenge Complete!
                </motion.h1>

                <motion.div variants={itemVariants} className="mb-10 flex flex-col items-center">
                    <div className="text-6xl font-display font-bold text-[#2D2028] mb-2">
                        {score}<span className="text-4xl text-[#7A6070]">/{total}</span>
                    </div>
                    <div className="text-sm font-bold text-[#7A6070] uppercase tracking-wider">
                        Optimal choices found
                    </div>
                </motion.div>

                {/* Results List */}
                <motion.div variants={itemVariants} className="w-full flex flex-col gap-3 mb-10">
                    {scenarios.map((scenario, index) => {
                        const SIcon = scenario.icon;
                        const isCorrect = results[index];
                        return (
                            <div key={scenario.id} className="clay-card p-4 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${scenario.themeGradient} flex items-center justify-center text-white shadow-sm`}>
                                        <SIcon className="w-5 h-5" />
                                    </div>
                                    <span className="font-display font-semibold text-[#2D2028] text-left">
                                        {scenario.title}
                                    </span>
                                </div>
                                <div className={`flex items-center gap-2 font-bold ${isCorrect ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                                    {isCorrect ? (
                                        <>Found it! <Check className="w-5 h-5" /></>
                                    ) : (
                                        <>Missed <X className="w-5 h-5" /></>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </motion.div>

                <motion.div variants={itemVariants} className="clay-card bg-[#FDF6F0] border border-[#7A003C]/10 p-6 mb-10">
                    <p className="text-[#7A003C] font-medium italic">
                        "AI has the biggest impact at the root cause of a bottleneck — not just automating any random step. Think upstream!"
                    </p>
                </motion.div>

                <motion.button
                    variants={itemVariants}
                    onClick={onReset}
                    className="clay-button bg-gradient-to-r from-[#7A003C] to-[#A6335F] text-white font-display font-bold text-lg px-8 py-4 flex items-center gap-3"
                >
                    <RotateCcw className="w-5 h-5" />
                    Reset for Next Team
                </motion.button>
            </div>
        </motion.div>
    );
}
