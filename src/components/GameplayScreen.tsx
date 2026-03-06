import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, ArrowRight, Info } from 'lucide-react';
import { ScenarioData } from '../data';
import WorkflowCanvas from './WorkflowCanvas';
import confetti from 'canvas-confetti';

interface GameplayScreenProps {
    key?: string;
    scenario: ScenarioData;
    scenarioIndex: number;
    totalScenarios: number;
    results: boolean[];
    onNext: (optimalFound: boolean) => void;
}

export default function GameplayScreen({
    scenario,
    scenarioIndex,
    totalScenarios,
    results,
    onNext,
}: GameplayScreenProps) {
    const [exploredNodes, setExploredNodes] = useState<Set<string>>(new Set());
    const [optimalFound, setOptimalFound] = useState(false);
    const [isWrongShake, setIsWrongShake] = useState(false);

    useEffect(() => {
        setExploredNodes(new Set());
        setOptimalFound(false);
        setIsWrongShake(false);
    }, [scenario.id]);

    const handleNodeClick = (nodeId: string, isOptimal: boolean) => {
        if (optimalFound) return; // Stop interactions if optimal is already found

        setExploredNodes((prev) => new Set(prev).add(nodeId));

        if (isOptimal) {
            setOptimalFound(true);
            triggerConfetti();
        } else {
            setIsWrongShake(true);
            setTimeout(() => setIsWrongShake(false), 500);
        }
    };

    const triggerConfetti = () => {
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#DB2777', '#D97706', '#16A34A', '#0284C7', '#9333EA']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#DB2777', '#D97706', '#16A34A', '#0284C7', '#9333EA']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();
    };

    const SIcon = scenario.icon;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } },
        exit: { opacity: 0, scale: 0.98, transition: { duration: 0.3 } },
    };

    return (
        <motion.div
            className="flex-1 flex flex-col h-screen overflow-hidden bg-[#FDF6F0]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            {/* Top Bar */}
            <header className="h-16 bg-white border-b border-[#7A003C]/10 flex items-center justify-between px-6 shrink-0 z-10">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <img src="/logos/mbai-club.jpg" alt="MBAi Club" className="w-8 h-8 rounded-full object-contain" />
                        <span className="font-display font-bold text-[#7A003C] text-xs">×</span>
                        <img src="/logos/om-club.jpg" alt="OM Club" className="w-8 h-8 rounded-full object-contain" />
                    </div>
                    <div className="h-4 w-px bg-[#7A003C]/20" />
                    <h1 className="font-display font-semibold text-[#2D2028]">AI Workflow Challenge</h1>
                </div>

                <div className="flex items-center gap-3">
                    {Array.from({ length: totalScenarios }).map((_, i) => {
                        const isPast = i < scenarioIndex;
                        const isCurrent = i === scenarioIndex;
                        const result = isPast ? results[i] : null;

                        return (
                            <div
                                key={i}
                                className={`w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-sm transition-all duration-300 ${isCurrent
                                    ? 'bg-[#FDBF57] text-white shadow-md scale-110'
                                    : isPast
                                        ? result
                                            ? 'bg-[#10B981] text-white'
                                            : 'bg-[#EF4444] text-white'
                                        : 'bg-[#7A6070]/10 text-[#7A6070]'
                                    }`}
                            >
                                {isPast ? (result ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />) : i + 1}
                            </div>
                        );
                    })}
                </div>
            </header>

            {/* Main Content Split */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left Sidebar */}
                <div className="w-[260px] bg-white border-r border-[#7A003C]/10 p-5 flex flex-col shrink-0 overflow-y-auto z-10 shadow-[4px_0_24px_rgba(122,0,60,0.03)]">
                    <div className="mb-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${scenario.themeGradient} flex items-center justify-center text-white shadow-md`}>
                                <SIcon className="w-6 h-6" />
                            </div>
                            <div className="font-display font-bold text-xs tracking-wider text-[#7A6070] uppercase">
                                Scenario {scenarioIndex + 1} of {totalScenarios}
                            </div>
                        </div>
                        <h2 className="font-display text-2xl font-bold text-[#2D2028] mb-4 leading-tight">
                            {scenario.title}
                        </h2>
                        <p className="text-[#7A6070] text-base leading-relaxed bg-[#FDF6F0] p-5 rounded-xl border border-[#7A003C]/5">
                            {scenario.context}
                        </p>
                    </div>



                    <div className="mt-auto">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-semibold text-[#7A6070]">Nodes Explored</span>
                            <span className="font-display font-bold text-lg text-[#2D2028]">
                                {exploredNodes.size} / {scenario.nodes.length}
                            </span>
                        </div>
                        <div className="h-2 bg-[#FDF6F0] rounded-full overflow-hidden mb-6">
                            <motion.div
                                className={`h-full bg-gradient-to-r ${scenario.themeGradient}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${(exploredNodes.size / scenario.nodes.length) * 100}%` }}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                            />
                        </div>

                        <AnimatePresence mode="wait">
                            {optimalFound ? (
                                <motion.div
                                    key="next-btn"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                >
                                    <button
                                        onClick={() => onNext(true)}
                                        className="w-full clay-button bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-display font-bold text-lg py-4 flex items-center justify-center gap-2"
                                    >
                                        {scenarioIndex === totalScenarios - 1 ? 'See Results' : 'Next Scenario'}
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="keep-going"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-center text-sm font-medium text-[#7A6070] py-4"
                                >
                                    {exploredNodes.size > 0 ? 'Keep going — find the optimal node!' : 'Click a node to start exploring.'}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right Canvas */}
                <div className="flex-1 relative overflow-hidden bg-[#FDF6F0]">
                    {/* How to Play — floating overlay at top-left of canvas */}
                    <div className="absolute top-4 left-4 z-20 max-w-[280px]">
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-[#7A003C]/10 p-4 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-[#FDBF57]" />
                            <div className="flex items-start gap-3 pl-1">
                                <Info className="w-6 h-6 text-[#FDBF57] shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-display font-bold text-[#2D2028] text-base mb-1">How to Play</h3>
                                    <p className="text-sm text-[#7A6070] leading-relaxed">
                                        Explore the workflow nodes. Find the single step where AI integration provides the highest operational impact.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <WorkflowCanvas
                        scenario={scenario}
                        exploredNodes={exploredNodes}
                        optimalFound={optimalFound}
                        onNodeClick={handleNodeClick}
                        isWrongShake={isWrongShake}
                    />
                </div>
            </div>
        </motion.div>
    );
}
