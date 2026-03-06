import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion } from 'motion/react';
import dagre from 'dagre';
import { ScenarioData } from '../data';
import NodeCard from './NodeCard';

const CARD_WIDTH = 270;
const CARD_HEIGHT = 370;
const RANK_SEP = 75;  // horizontal gap between columns
const NODE_SEP = 50;   // vertical gap between rows

interface LayoutNode {
    id: string;
    x: number;
    y: number;
}

interface LayoutEdge {
    from: string;
    to: string;
    points: { x: number; y: number }[];
}

interface Layout {
    nodes: LayoutNode[];
    edges: LayoutEdge[];
    width: number;
    height: number;
}

function computeLayout(scenario: ScenarioData): Layout {
    const g = new dagre.graphlib.Graph();

    g.setGraph({
        rankdir: 'LR',       // left-to-right flow
        ranksep: RANK_SEP,   // horizontal gap between ranks
        nodesep: NODE_SEP,   // vertical gap between nodes in same rank
        marginx: 20,
        marginy: 20,
    });

    g.setDefaultEdgeLabel(() => ({}));

    // Add all nodes with their dimensions
    scenario.nodes.forEach((node) => {
        g.setNode(node.id, { width: CARD_WIDTH, height: CARD_HEIGHT });
    });

    // Add edges from the scenario connections
    scenario.connections.forEach((conn) => {
        g.setEdge(conn.from, conn.to);
    });

    // Run the layout algorithm
    dagre.layout(g);

    // Extract positioned nodes
    // dagre returns center coordinates — convert to top-left
    const nodes: LayoutNode[] = [];
    g.nodes().forEach((id) => {
        const node = g.node(id);
        if (node) {
            nodes.push({
                id,
                x: node.x - CARD_WIDTH / 2,
                y: node.y - CARD_HEIGHT / 2,
            });
        }
    });

    // Extract edge paths with dagre's computed waypoints
    const edges: LayoutEdge[] = [];
    g.edges().forEach((e) => {
        const edge = g.edge(e);
        if (edge && edge.points) {
            edges.push({
                from: e.v,
                to: e.w,
                points: edge.points.map((p: { x: number; y: number }) => ({ x: p.x, y: p.y })),
            });
        }
    });

    // Compute overall dimensions
    const graphInfo = g.graph();
    const width = (graphInfo.width || 800) + 40;
    const height = (graphInfo.height || 600) + 40;

    return { nodes, edges, width, height };
}

function generateEdgePath(points: { x: number; y: number }[]): string {
    if (points.length < 2) return '';

    // Start at first point
    let d = `M ${points[0].x} ${points[0].y}`;

    if (points.length === 2) {
        // Simple straight line with a slight curve
        const [start, end] = points;
        const mx = start.x + (end.x - start.x) / 2;
        d += ` C ${mx} ${start.y}, ${mx} ${end.y}, ${end.x} ${end.y}`;
    } else if (points.length === 3) {
        // Quadratic through the midpoint
        const [start, mid, end] = points;
        d += ` Q ${mid.x} ${mid.y}, ${end.x} ${end.y}`;
    } else {
        // For 4+ points, use cubic bezier segments through pairs
        for (let i = 1; i < points.length - 1; i += 2) {
            const cp = points[i];
            const end = points[Math.min(i + 1, points.length - 1)];
            d += ` Q ${cp.x} ${cp.y}, ${end.x} ${end.y}`;
        }
        // If we have an even count of remaining points, connect to the last
        if (points.length % 2 === 0) {
            const last = points[points.length - 1];
            d += ` L ${last.x} ${last.y}`;
        }
    }

    return d;
}

interface WorkflowCanvasProps {
    scenario: ScenarioData;
    exploredNodes: Set<string>;
    optimalFound: boolean;
    onNodeClick: (id: string, isOptimal: boolean) => void;
    isWrongShake: boolean;
}

export default function WorkflowCanvas({
    scenario,
    exploredNodes,
    optimalFound,
    onNodeClick,
    isWrongShake,
}: WorkflowCanvasProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    // Compute layout once per scenario (memoized)
    const layout = useMemo(() => computeLayout(scenario), [scenario]);

    const updateScale = useCallback(() => {
        if (containerRef.current) {
            const cw = containerRef.current.clientWidth;
            const ch = containerRef.current.clientHeight;
            const padX = 100; // horizontal padding so rightmost cards don't clip
            const padY = 80;
            const sx = cw / (layout.width + padX);
            const sy = ch / (layout.height + padY);
            setScale(Math.min(sx, sy, 1));
        }
    }, [layout]);

    useEffect(() => {
        updateScale();
        window.addEventListener('resize', updateScale);
        return () => window.removeEventListener('resize', updateScale);
    }, [updateScale]);

    // Unified arrow color — maroon for all scenarios
    const themeColor = '#A6335F';

    return (
        <div ref={containerRef} className="relative w-full h-full overflow-hidden flex items-center justify-center">
            <div
                style={{
                    transform: `scale(${scale})`,
                    transformOrigin: 'center center',
                    width: `${layout.width}px`,
                    height: `${layout.height}px`,
                    position: 'relative',
                    marginRight: '60px',
                }}
            >
                {/* SVG Connections — Premium Animated Arrows */}
                <svg
                    className="absolute inset-0 pointer-events-none z-0"
                    width={layout.width}
                    height={layout.height}
                    style={{ overflow: 'visible' }}
                >
                    <defs>
                        {/* Gradient for the path stroke */}
                        <linearGradient id={`edge-gradient-${scenario.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor={themeColor} stopOpacity="0.25" />
                            <stop offset="50%" stopColor={themeColor} stopOpacity="0.5" />
                            <stop offset="100%" stopColor={themeColor} stopOpacity="0.25" />
                        </linearGradient>

                        {/* Glow filter for subtle bloom */}
                        <filter id={`glow-${scenario.id}`} x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="4" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        {/* Sleek arrowhead — rounded chevron style */}
                        <marker
                            id={`arrow-${scenario.id}`}
                            markerWidth="14"
                            markerHeight="14"
                            refX="12"
                            refY="7"
                            orient="auto"
                            markerUnits="userSpaceOnUse"
                        >
                            <path
                                d="M 2 3 L 10 7 L 2 11"
                                fill="none"
                                stroke={themeColor}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                opacity="0.6"
                            />
                        </marker>

                        {/* Animated dot pattern for flowing effect */}
                        <style>{`
                            @keyframes flowDots {
                                from { stroke-dashoffset: 24; }
                                to { stroke-dashoffset: 0; }
                            }
                        `}</style>
                    </defs>

                    {layout.edges.map((edge, i) => {
                        const path = generateEdgePath(edge.points);
                        return (
                            <g key={`${edge.from}-${edge.to}`}>
                                {/* Layer 1: Soft glow behind the path */}
                                <motion.path
                                    d={path}
                                    fill="none"
                                    stroke={themeColor}
                                    strokeWidth="8"
                                    strokeOpacity="0.08"
                                    strokeLinecap="round"
                                    filter={`url(#glow-${scenario.id})`}
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 1.2, delay: i * 0.15, ease: 'easeOut' }}
                                />
                                {/* Layer 2: Solid visible line — consistent opacity */}
                                <motion.path
                                    d={path}
                                    fill="none"
                                    stroke={themeColor}
                                    strokeWidth="2.5"
                                    strokeOpacity="0.35"
                                    strokeLinecap="round"
                                    markerEnd={`url(#arrow-${scenario.id})`}
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 1.2, delay: i * 0.15, ease: 'easeOut' }}
                                />
                                {/* Layer 3: Animated flowing dots on top */}
                                <motion.path
                                    d={path}
                                    fill="none"
                                    stroke={themeColor}
                                    strokeWidth="2"
                                    strokeOpacity="0.3"
                                    strokeLinecap="round"
                                    strokeDasharray="4 20"
                                    style={{
                                        animation: `flowDots 1.5s linear infinite`,
                                        animationDelay: `${i * 0.1}s`,
                                    }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: i * 0.15 + 1.0 }}
                                />
                            </g>
                        );
                    })}

                    {/* Custom straight arrows — drawn from node positions, not dagre edges */}
                    {(() => {
                        const extras: { from: string; to: string }[] = scenario.id === 'invoice-processing'
                            ? [{ from: '1-2', to: '1-5' }]
                            : [];

                        return extras.map(({ from, to }) => {
                            const fromNode = layout.nodes.find(n => n.id === from);
                            const toNode = layout.nodes.find(n => n.id === to);
                            if (!fromNode || !toNode) return null;

                            // Right-center of source node → left-center of target node
                            const x1 = fromNode.x + CARD_WIDTH;
                            const y1 = fromNode.y + (CARD_HEIGHT / 2);
                            const x2 = toNode.x;
                            const y2 = toNode.y + (CARD_HEIGHT / 2);
                            const d = `M ${x1} ${y1} L ${x2} ${y2}`;

                            return (
                                <g key={`custom-${from}-${to}`}>
                                    <motion.path d={d} fill="none" stroke={themeColor}
                                        strokeWidth="8" strokeOpacity="0.08" strokeLinecap="round"
                                        filter={`url(#glow-${scenario.id})`}
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        transition={{ duration: 1.2, ease: 'easeOut' }}
                                    />
                                    <motion.path d={d} fill="none" stroke={themeColor}
                                        strokeWidth="2.5" strokeOpacity="0.35" strokeLinecap="round"
                                        markerEnd={`url(#arrow-${scenario.id})`}
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        transition={{ duration: 1.2, ease: 'easeOut' }}
                                    />
                                    <motion.path d={d} fill="none" stroke={themeColor}
                                        strokeWidth="2" strokeOpacity="0.3" strokeLinecap="round"
                                        strokeDasharray="4 20"
                                        style={{ animation: 'flowDots 1.5s linear infinite' }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 1.0 }}
                                    />
                                </g>
                            );
                        });
                    })()}
                </svg>

                {/* Nodes */}
                <div className="relative z-10 w-full h-full">
                    {scenario.nodes.map((node, index) => {
                        const pos = layout.nodes.find((n) => n.id === node.id);
                        if (!pos) return null;
                        return (
                            <motion.div
                                key={node.id}
                                className="absolute"
                                style={{ left: pos.x, top: pos.y }}
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1, type: 'spring' }}
                            >
                                <NodeCard
                                    node={node}
                                    index={index}
                                    isExplored={exploredNodes.has(node.id)}
                                    isOptimalFound={optimalFound}
                                    onClick={onNodeClick}
                                    isWrongShake={isWrongShake && exploredNodes.has(node.id)}
                                />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
