import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { NodeData } from '../data';
import { XCircle, Sparkles } from 'lucide-react';

interface NodeCardProps {
    node: NodeData;
    index: number;
    isExplored: boolean;
    isOptimalFound: boolean;
    onClick: (id: string, isOptimal: boolean) => void;
    isWrongShake: boolean;
}

export default function NodeCard({
    node,
    index,
    isExplored,
    isOptimalFound,
    onClick,
    isWrongShake,
}: NodeCardProps) {
    const Icon = node.icon;
    const frontRef = useRef<HTMLDivElement>(null);
    const backRef = useRef<HTMLDivElement>(null);
    const [cardHeight, setCardHeight] = useState(0);

    // Measure both sides and use the taller one so nothing clips
    useEffect(() => {
        const measure = () => {
            const fh = frontRef.current?.scrollHeight || 0;
            const bh = backRef.current?.scrollHeight || 0;
            setCardHeight(Math.max(fh, bh, 220));
        };
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, [node, isExplored]);

    const handleClick = () => {
        if (!isExplored && !isOptimalFound) {
            onClick(node.id, node.isOptimal);
        }
    };

    const shakeAnimation = {
        x: [0, -8, 8, -6, 6, -3, 3, 0],
        transition: { duration: 0.5 },
    };

    return (
        <motion.div
            className={`relative w-[270px] perspective-1000 ${!isExplored && !isOptimalFound ? 'cursor-pointer' : ''}`}
            style={{ height: cardHeight > 0 ? `${cardHeight}px` : 'auto' }}
            onClick={handleClick}
            whileHover={!isExplored && !isOptimalFound ? { scale: 1.02, y: -5 } : {}}
            whileTap={!isExplored && !isOptimalFound ? { scale: 0.98 } : {}}
            animate={isWrongShake && isExplored && !node.isOptimal ? shakeAnimation : {}}
        >
            <motion.div
                className="w-full h-full relative preserve-3d transition-all duration-500 ease-in-out"
                animate={{ rotateY: isExplored ? 180 : 0 }}
            >
                {/* Front Side */}
                <div
                    ref={frontRef}
                    className="absolute inset-0 backface-hidden clay-card rounded-2xl flex flex-col"
                    style={{
                        background: `linear-gradient(135deg, white 0%, ${node.color}15 100%)`,
                    }}
                >
                    <div className="h-1.5 w-full rounded-t-2xl" style={{ backgroundColor: node.color }} />
                    <div className="p-5 flex flex-col flex-1">
                        <div className="flex justify-between items-start mb-3">
                            <div
                                className="w-11 h-11 rounded-xl flex items-center justify-center shadow-sm"
                                style={{ backgroundColor: 'white', color: node.color }}
                            >
                                <Icon className="w-6 h-6" />
                            </div>
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-sm shadow-sm"
                                style={{ backgroundColor: node.color, color: 'white' }}
                            >
                                {index + 1}
                            </div>
                        </div>

                        <h3 className="font-display font-bold text-lg text-[#2D2028] mb-2 leading-tight">
                            {node.title}
                        </h3>
                        <p className="text-sm text-[#7A6070] leading-relaxed flex-1">
                            {node.description}
                        </p>

                        <div
                            className="mt-3 text-xs font-bold uppercase tracking-wider flex items-center gap-1 self-end"
                            style={{ color: node.color }}
                        >
                            Tap to check &rarr;
                        </div>
                    </div>
                </div>

                {/* Back Side */}
                <div
                    ref={backRef}
                    className={`absolute inset-0 backface-hidden clay-card rounded-2xl flex flex-col border-2 rotate-y-180 ${node.isOptimal ? 'border-[#10B981] shadow-[0_0_30px_rgba(16,185,129,0.2)]' : 'border-[#EF4444]'
                        }`}
                    style={{
                        background: node.isOptimal
                            ? 'linear-gradient(135deg, white 0%, #ECFDF5 100%)'
                            : 'linear-gradient(135deg, white 0%, #FEF2F2 100%)',
                    }}
                >
                    <div className={`h-1.5 w-full rounded-t-2xl ${node.isOptimal ? 'bg-[#10B981]' : 'bg-[#EF4444]'}`} />
                    <div className="p-5 flex flex-col flex-1">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 self-start ${node.isOptimal ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#EF4444]/10 text-[#EF4444]'
                            }`}>
                            {node.isOptimal ? (
                                <><Sparkles className="w-3.5 h-3.5" /> Optimal!</>
                            ) : (
                                <><XCircle className="w-3.5 h-3.5" /> Not Optimal</>
                            )}
                        </div>

                        <h3 className="font-display font-bold text-base text-[#2D2028] mb-2 leading-tight">
                            {node.title}
                        </h3>
                        <p className="text-sm text-[#7A6070] leading-relaxed flex-1">
                            {node.aiExplanation}
                        </p>

                        <div className={`mt-3 p-3 rounded-xl text-xs leading-relaxed font-medium border ${node.isOptimal ? 'bg-[#10B981]/5 border-[#10B981]/20 text-[#065F46]' : 'bg-[#EF4444]/5 border-[#EF4444]/20 text-[#991B1B]'
                            }`}>
                            <strong className="block mb-1 font-display uppercase tracking-wider text-[10px]">Impact</strong>
                            {node.impact}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
