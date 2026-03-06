import {
    ClipboardList,
    FileText,
    Package,
    Mail,
    Search,
    CheckCircle2,
    DollarSign,
    BarChart3,
    Target,
    Handshake,
    Factory,
    Store,
    Truck,
    Ticket,
    Tag,
    User,
    Star,
    ArrowUpRight,
    LucideIcon
} from 'lucide-react';

export type NodeData = {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    isOptimal: boolean;
    aiExplanation: string;
    impact: string;
    color: string;
};

export type Connection = {
    from: string;
    to: string;
};

export type ScenarioData = {
    id: string;
    title: string;
    context: string;
    themeGradient: string;
    icon: LucideIcon;
    nodes: NodeData[];
    connections: Connection[];
};

export const PASTEL_COLORS = [
    '#DB2777', // pink
    '#D97706', // amber
    '#16A34A', // green
    '#E11D48', // rose
    '#7C3AED', // violet
    '#EA580C', // orange
    '#0284C7', // sky blue
    '#9333EA', // purple
];

export const SCENARIOS: ScenarioData[] = [
    {
        id: 'invoice-processing',
        title: 'Invoice Processing & Accounts Payable',
        context: 'Your mid-size manufacturing company processes over 2,000 vendor invoices every month across 150+ suppliers. The AP team of 6 people is overwhelmed. The average payment cycle has stretched to 45 days, 12% of invoices contain errors that require rework, vendors are threatening to put you on credit hold, and the CFO is demanding better cash flow visibility. The team spends 70% of their time on manual data entry and verification. Where should AI step in to have the biggest operational impact?',
        themeGradient: 'from-[#7A003C] to-[#A6335F]',
        icon: FileText,
        nodes: [
            {
                id: '1-1',
                title: 'Purchase Request',
                description: 'Employee submits a request specifying item, quantity, and cost. Manual process involves paper forms and clunky ERP, leading to incomplete submissions and duplicate requests.',
                icon: ClipboardList,
                isOptimal: false,
                aiExplanation: 'AI could auto-fill request forms based on past orders and flag duplicates. Helpful but low-impact; this step is already fairly quick and human judgment on what to buy matters.',
                impact: 'Minor time savings (~5%). Doesn\'t address the real bottleneck downstream.',
                color: PASTEL_COLORS[0],
            },
            {
                id: '1-2',
                title: 'PO Created',
                description: 'Procurement creates a formal Purchase Order with line items, prices, and delivery terms. Manual re-keying from requests creates errors that cascade downstream.',
                icon: FileText,
                isOptimal: false,
                aiExplanation: 'AI could auto-generate POs from approved requests and route them. Decent efficiency gain, but PO creation is mostly template-driven already in modern ERP systems.',
                impact: 'Moderate time savings (~15%). Speeds things up but doesn\'t fix the core problem.',
                color: PASTEL_COLORS[1],
            },
            {
                id: '1-3',
                title: 'Goods Received',
                description: 'Receiving staff inspect shipments, count quantities, and log receipt against the PO. Delayed logging and miscounts create mismatches with actual delivery.',
                icon: Package,
                isOptimal: false,
                aiExplanation: 'Computer vision could verify deliveries against POs using photos. Interesting application, but receiving is rarely the bottleneck.',
                impact: 'Niche improvement. Cool tech, but solving a problem that isn\'t the main pain point.',
                color: PASTEL_COLORS[2],
            },
            {
                id: '1-4',
                title: 'Invoice Received',
                description: 'Vendors send invoices as PDFs, scans, or emails. AP clerks manually read and type invoice data into the accounting system, tedious and error-prone.',
                icon: Mail,
                isOptimal: false,
                aiExplanation: 'AI-powered OCR can extract data from invoices in any format (PDF, scan, email). Genuinely useful, but extraction alone doesn\'t solve matching errors.',
                impact: 'Reduces data entry by ~80%. But the real value unlock is in the next step.',
                color: PASTEL_COLORS[3],
            },
            {
                id: '1-5',
                title: '3-Way Match',
                description: 'AP manually compares PO, goods receipt, and invoice line-by-line for 2,000+ invoices. Hours of cross-referencing leads to errors, overpayments, and backlogs.',
                icon: Search,
                isOptimal: true,
                aiExplanation: 'This is where AI transforms the entire workflow! AI can automatically cross-reference POs, receipts, and invoices, matching line items, flagging discrepancies, and auto-approving when everything aligns.',
                impact: 'Massive impact: 70-90% of invoices auto-matched, processing time drops from days to hours, error rates plummet.',
                color: PASTEL_COLORS[4],
            },
            {
                id: '1-6',
                title: 'Approval Routing',
                description: 'Invoices are routed to managers for approval based on thresholds and department. Invoices sit in inboxes for weeks, delaying payment.',
                icon: CheckCircle2,
                isOptimal: false,
                aiExplanation: 'AI could intelligently route approvals and auto-approve low-risk invoices. Solid secondary optimization, but only works well if matching upstream is already clean.',
                impact: 'Moderate improvement (~25% faster approvals). Good as a Phase 2 optimization.',
                color: PASTEL_COLORS[5],
            },
            {
                id: '1-7',
                title: 'Payment Sent',
                description: 'Finance executes payment via check, ACH, or wire. Manual scheduling misses early-payment discounts and lacks cash flow visibility.',
                icon: DollarSign,
                isOptimal: false,
                aiExplanation: 'AI could optimize payment timing to capture early-payment discounts. Smart but this is a treasury optimization, not an operations fix.',
                impact: 'Potential 2-3% savings on payables through discount capture, but doesn\'t speed up the process.',
                color: PASTEL_COLORS[6],
            },
        ],
        connections: [
            { from: '1-1', to: '1-2' },
            { from: '1-2', to: '1-3' },
            { from: '1-2', to: '1-4' },
            { from: '1-3', to: '1-5' },
            { from: '1-4', to: '1-5' },
            { from: '1-5', to: '1-6' },
            { from: '1-6', to: '1-7' },
        ],
    },
    {
        id: 'supply-chain',
        title: 'Supply Chain: Forecast to Fulfillment',
        context: 'A national retail chain with 200+ stores is struggling with inventory imbalances. Popular items stock out within 3 days (losing $2M/quarter), while slow-moving SKUs tie up $15M in working capital. The planning team relies on gut instinct, and the bullwhip effect amplifies every error. Where does AI create the most transformative impact?',
        themeGradient: 'from-[#B8860B] to-[#FDBF57]',
        icon: Truck,
        nodes: [
            {
                id: '2-1',
                title: 'Data Collection',
                description: 'Analytics gathers sales data, trends, and external signals from 8+ disconnected systems. Days spent cleaning spreadsheets with data already weeks old.',
                icon: BarChart3,
                isOptimal: false,
                aiExplanation: 'AI could automate data pipelines and clean messy data sources. Useful infrastructure work, but data collection is an enabler.',
                impact: 'Foundational improvement. Better data quality helps, but doesn\'t directly fix the forecasting problem.',
                color: PASTEL_COLORS[0],
            },
            {
                id: '2-2',
                title: 'Demand Forecasting',
                description: 'Planners use Excel and basic models to predict demand for thousands of SKUs. Gut-feel forecasts produce 35-50% error rates at the SKU level.',
                icon: Target,
                isOptimal: true,
                aiExplanation: 'This is where AI has the highest impact! ML models can process hundreds of demand signals simultaneously: weather, social trends, competitor pricing, economic indicators.',
                impact: 'Transformational: Reduces forecast error by 30-50%, cascading through the ENTIRE supply chain.',
                color: PASTEL_COLORS[1],
            },
            {
                id: '2-3',
                title: 'Procurement',
                description: 'Buyers place orders based on forecasts using static reorder points. Wrong forecasts get amplified, creating the bullwhip effect across the supply chain.',
                icon: Handshake,
                isOptimal: false,
                aiExplanation: 'AI could optimize supplier selection and automate reorder points. But if your forecast is wrong, you\'re efficiently ordering the wrong quantities.',
                impact: 'Limited standalone value. Optimizing procurement without fixing forecasting is like rearranging deck chairs.',
                color: PASTEL_COLORS[2],
            },
            {
                id: '2-4',
                title: 'Production',
                description: 'Factories schedule production using whiteboards and spreadsheets. Suboptimal utilization (60-70%) and rush orders disrupt planned production.',
                icon: Factory,
                isOptimal: false,
                aiExplanation: 'AI scheduling can optimize machine utilization and reduce changeover times. Real gains (~15-20%), but you\'re still producing based on the forecast.',
                impact: 'Meaningful operational gains, but doesn\'t solve the root cause.',
                color: PASTEL_COLORS[3],
            },
            {
                id: '2-5',
                title: 'Warehousing',
                description: 'Products are picked and packed using paper lists with inefficient routes. Mis-picks at 1-3% and slow stock occupying prime shelf space.',
                icon: Store,
                isOptimal: false,
                aiExplanation: 'AI-powered warehouse robots and smart slotting can improve speed by 40%. But you\'re just moving wrong inventory faster.',
                impact: 'Tactical efficiency gain. Doesn\'t address the strategic demand-supply mismatch.',
                color: PASTEL_COLORS[4],
            },
            {
                id: '2-6',
                title: 'Distribution',
                description: 'Trucks ship to stores using static schedules. Vehicles run 20-30% below capacity with suboptimal routing and missed delivery windows.',
                icon: Truck,
                isOptimal: false,
                aiExplanation: 'AI route optimization can cut delivery costs by 10-15%. Valuable, but this is a last-mile optimization.',
                impact: 'Cost savings on logistics. Polishing the end of a chain that needs fixing at the start.',
                color: PASTEL_COLORS[5],
            },
        ],
        connections: [
            { from: '2-1', to: '2-2' },
            { from: '2-2', to: '2-3' },
            { from: '2-3', to: '2-4' },
            { from: '2-4', to: '2-5' },
            { from: '2-5', to: '2-6' },
        ],
    },
    {
        id: 'customer-support',
        title: 'Customer Support Ticket Resolution',
        context: 'Your B2B SaaS company receives 500+ tickets daily. First-response time has ballooned to 14 hours (SLA: 4 hours), satisfaction dropped to 3.1 stars, and churn rose to 18%. Tickets get misrouted, agents waste time on repetitive issues, and critical tickets get buried. Where does AI make the biggest difference?',
        themeGradient: 'from-[#2E6B4F] to-[#3D9970]',
        icon: Ticket,
        nodes: [
            {
                id: '3-1',
                title: 'Ticket Submitted',
                description: 'Customer submits a request via email, chat, phone, or web form. Tickets arrive with no category or priority, requiring agents to ask qualifying questions first.',
                icon: Ticket,
                isOptimal: false,
                aiExplanation: 'AI could offer smart intake forms. Minor improvement, but risk adding friction for customers who don\'t know how to describe their problem.',
                impact: 'Slight improvement in ticket quality. Risk of frustrating customers.',
                color: PASTEL_COLORS[0],
            },
            {
                id: '3-2',
                title: 'Triage & Categorize',
                description: 'A coordinator manually reads every ticket to set category, priority, and complexity. 25-30% misclassification rate with critical P1 issues buried under routine questions.',
                icon: Tag,
                isOptimal: true,
                aiExplanation: 'This is the optimal AI insertion point! NLP models can instantly classify tickets with 95%+ accuracy. AI can auto-resolve 30-40% of simple tickets (password resets, FAQs).',
                impact: 'Game-changing: 30-40% auto-resolved instantly, remaining tickets perfectly categorized. Agent workload drops dramatically.',
                color: PASTEL_COLORS[1],
            },
            {
                id: '3-3',
                title: 'Agent Assignment',
                description: 'Tickets assigned via round-robin, ignoring agent specialization. Billing experts get technical bugs while senior engineers handle password resets.',
                icon: User,
                isOptimal: false,
                aiExplanation: 'AI could match tickets to agents by expertise and workload. Solid, but works best AFTER proper categorization.',
                impact: 'Good secondary optimization (~20% faster). Best as Phase 2 after triage automation.',
                color: PASTEL_COLORS[2],
            },
            {
                id: '3-4',
                title: 'Investigation',
                description: 'Agents spend 40-60% of handling time searching knowledge bases and past tickets. Often solving the same problem a colleague solved last week.',
                icon: Search,
                isOptimal: false,
                aiExplanation: 'AI copilot could surface relevant knowledge base articles and similar past tickets. Great productivity tool, but augmenting individual performance.',
                impact: '~25% faster per-ticket. Great complement, but doesn\'t reduce ticket volume.',
                color: PASTEL_COLORS[3],
            },
            {
                id: '3-5',
                title: 'Resolution',
                description: 'Agent implements the fix and communicates back to the customer. Response quality varies wildly between agents, generating follow-up tickets.',
                icon: CheckCircle2,
                isOptimal: false,
                aiExplanation: 'AI could draft response templates. Saves writing time, but the hard part is figuring out the solution, not typing it up.',
                impact: 'Minor time savings on communication. Useful but not transformative.',
                color: PASTEL_COLORS[4],
            },
            {
                id: '3-6',
                title: 'Follow-up & CSAT',
                description: 'Customer satisfaction survey sent and QA reviews 5-10% of tickets. Quality issues aren\'t caught until weeks later with no timely feedback.',
                icon: Star,
                isOptimal: false,
                aiExplanation: 'AI sentiment analysis and automatic QA scoring. Good for insights, but backward-looking - it tells you what went wrong after the fact.',
                impact: 'Valuable for improvement, but zero impact on current ticket resolution speed.',
                color: PASTEL_COLORS[5],
            },
            {
                id: '3-7',
                title: 'Escalation',
                description: 'Complex tickets are escalated to L2/L3 support tiers. 20-30% of tickets need escalation, but manual handoffs lose context, and agents start from scratch while customers repeat themselves.',
                icon: ArrowUpRight,
                isOptimal: false,
                aiExplanation: 'AI could predict escalation need at triage and pre-route to the right tier. Useful, but this is a symptom. Fix triage and you reduce escalation by 40-60%.',
                impact: 'Reduces escalation handling time by ~30%. But better triage upstream prevents escalation entirely.',
                color: PASTEL_COLORS[6],
            },
        ],
        connections: [
            { from: '3-1', to: '3-2' },
            { from: '3-2', to: '3-3' },
            { from: '3-2', to: '3-6' },
            { from: '3-3', to: '3-4' },
            { from: '3-4', to: '3-5' },
            { from: '3-4', to: '3-7' },
            { from: '3-7', to: '3-3' },
            { from: '3-5', to: '3-6' },
            { from: '3-6', to: '3-2' },
        ],
    }
];
