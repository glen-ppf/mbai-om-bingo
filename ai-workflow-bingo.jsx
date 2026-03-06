import { useState, useEffect } from "react";

const WORKFLOWS = [
  {
    id: 1,
    title: "Invoice Processing & Accounts Payable",
    emoji: "🧾",
    context:
      "Your company processes 2,000+ vendor invoices per month. The finance team is drowning — payments are late, vendors are frustrated, and errors are everywhere. Where should AI step in?",
    steps: [
      {
        id: "inv-1",
        name: "Purchase Request",
        icon: "📋",
        shortDesc: "Employee submits a purchase request for goods or services.",
        isOptimal: false,
        isBottleneck: false,
        aiExplanation:
          "AI could auto-fill request forms based on past orders and flag duplicates. Helpful but low-impact — this step is already fairly quick and human judgment on what to buy matters.",
        aiEffect:
          "Minor time savings (~5%). Doesn't address the real bottleneck downstream.",
      },
      {
        id: "inv-2",
        name: "PO Created",
        icon: "📝",
        shortDesc:
          "A formal Purchase Order is generated and sent to the vendor.",
        isOptimal: false,
        isBottleneck: false,
        aiExplanation:
          "AI could auto-generate POs from approved requests and route them. Decent efficiency gain, but PO creation is mostly template-driven already in modern ERP systems.",
        aiEffect:
          "Moderate time savings (~15%). Speeds things up but doesn't fix the core problem.",
      },
      {
        id: "inv-3",
        name: "Goods Received",
        icon: "📦",
        shortDesc:
          "Goods or services are delivered and the receiving team logs confirmation.",
        isOptimal: false,
        isBottleneck: false,
        aiExplanation:
          "Computer vision could verify deliveries against POs using photos. Interesting application, but receiving is rarely the bottleneck — it's what happens after that slows everything down.",
        aiEffect:
          "Niche improvement. Cool tech, but solving a problem that isn't the main pain point.",
      },
      {
        id: "inv-4",
        name: "Invoice Received",
        icon: "✉️",
        shortDesc:
          "Vendor sends an invoice (PDF, email, or paper) to accounts payable.",
        isOptimal: false,
        isBottleneck: false,
        aiExplanation:
          "AI-powered OCR can extract data from invoices in any format (PDF, scan, email). This is genuinely useful and often part of the solution, but extraction alone doesn't solve matching errors.",
        aiEffect:
          "Good supporting step — reduces data entry by ~80%. But the real value unlock is in the next step.",
      },
      {
        id: "inv-5",
        name: "3-Way Match",
        icon: "🔍",
        shortDesc:
          "AP team manually compares the PO, goods receipt, and invoice line-by-line to verify everything matches before approving payment.",
        isOptimal: true,
        isBottleneck: true,
        aiExplanation:
          "🎯 This is where AI transforms the entire workflow! AI can automatically cross-reference POs, receipts, and invoices — matching line items, flagging discrepancies, and auto-approving when everything aligns. What used to take 15-30 minutes per invoice now takes seconds.",
        aiEffect:
          "Massive impact: 70-90% of invoices auto-matched, processing time drops from days to hours, error rates plummet, and the AP team focuses only on true exceptions. This single fix cascades through the entire workflow.",
      },
      {
        id: "inv-6",
        name: "Approval Routing",
        icon: "✅",
        shortDesc:
          "Matched invoices are sent to the appropriate manager(s) for approval based on amount and department.",
        isOptimal: false,
        isBottleneck: false,
        aiExplanation:
          "AI could intelligently route approvals and auto-approve low-risk invoices under certain thresholds. A solid secondary optimization, but it only works well if the matching step upstream is already clean.",
        aiEffect:
          "Moderate improvement (~25% faster approvals). Good as a Phase 2 optimization after fixing the match step.",
      },
      {
        id: "inv-7",
        name: "Payment Sent",
        icon: "💰",
        shortDesc:
          "Finance processes the payment to the vendor via check, ACH, or wire transfer.",
        isOptimal: false,
        isBottleneck: false,
        aiExplanation:
          "AI could optimize payment timing to capture early-payment discounts and manage cash flow. Smart but this is a treasury optimization, not an operations fix — and it requires everything upstream to work first.",
        aiEffect:
          "Financial optimization, not operational. Potential 2-3% savings on payables through discount capture, but doesn't speed up the process.",
      },
    ],
  },
  {
    id: 2,
    title: "Supply Chain: Forecast to Fulfillment",
    emoji: "🚚",
    context:
      "A retail company keeps running into stockouts on popular items while sitting on mountains of unsold inventory for others. The supply chain team is playing whack-a-mole. Where does AI fix this?",
    steps: [
      {
        id: "sc-1",
        name: "Data Collection",
        icon: "📊",
        shortDesc:
          "Gather historical sales data, market trends, seasonal patterns, and external signals.",
        isOptimal: false,
        isBottleneck: false,
        aiExplanation:
          "AI could automate data pipelines and clean messy data sources. Useful infrastructure work, but data collection is an enabler — the real question is what you DO with the data.",
        aiEffect:
          "Foundational improvement. Better data quality helps, but doesn't directly fix the forecasting problem.",
      },
      {
        id: "sc-2",
        name: "Demand Forecasting",
        icon: "🔮",
        shortDesc:
          "Analysts use spreadsheets and basic models to predict future demand for each product, often relying heavily on gut feeling and last year's numbers.",
        isOptimal: true,
        isBottleneck: true,
        aiExplanation:
          "🎯 This is where AI has the highest impact! ML models can process hundreds of demand signals simultaneously — weather, social media trends, competitor pricing, economic indicators, local events — to generate forecasts that are 30-50% more accurate than traditional methods. This is the origin of the \"bullwhip effect\" — small forecast errors here amplify into massive problems downstream.",
        aiEffect:
          "Transformational: Reduces forecast error by 30-50%, which cascades through the ENTIRE supply chain. Less overstock, fewer stockouts, lower carrying costs, happier customers. Every downstream step benefits.",
      },
      {
        id: "sc-3",
        name: "Procurement",
        icon: "🤝",
        shortDesc:
          "Purchasing team orders raw materials and products from suppliers based on the demand forecast.",
        isOptimal: false,
        isBottleneck: false,
        aiExplanation:
          "AI could optimize supplier selection and automate reorder points. Helpful, but if your forecast is wrong, you're just efficiently ordering the wrong quantities. Garbage in, garbage out.",
        aiEffect:
          "Limited standalone value. Optimizing procurement without fixing forecasting is like rearranging deck chairs on the Titanic.",
      },
      {
        id: "sc-4",
        name: "Production Scheduling",
        icon: "🏭",
        shortDesc:
          "Factory schedules production runs, allocating machinery and labor across product lines.",
        isOptimal: false,
        isBottleneck: false,
        aiExplanation:
          "AI scheduling can optimize machine utilization and reduce changeover times. Real gains here (~15-20% efficiency boost), but you're still producing based on whatever the forecast told you to make.",
        aiEffect:
          "Meaningful operational gains in factory efficiency, but doesn't solve the root cause of making too much of the wrong thing.",
      },
      {
        id: "sc-5",
        name: "Warehousing",
        icon: "🏪",
        shortDesc:
          "Products are stored, organized, picked, and packed for distribution.",
        isOptimal: false,
        isBottleneck: false,
        aiExplanation:
          "AI-powered warehouse robots and smart slotting algorithms can improve pick-and-pack speed by 40%. Impressive, but you're just moving the wrong inventory faster if upstream forecasting is broken.",
        aiEffect:
          "Tactical efficiency gain. Great for fulfillment speed, but doesn't address the strategic problem of demand-supply mismatch.",
      },
      {
        id: "sc-6",
        name: "Distribution",
        icon: "🚛",
        shortDesc:
          "Finished goods are shipped to retail locations or directly to customers via logistics networks.",
        isOptimal: false,
        isBottleneck: false,
        aiExplanation:
          "AI route optimization can cut delivery costs by 10-15% and improve delivery times. Valuable, but this is a last-mile optimization — it can't compensate for having the wrong products in the wrong places.",
        aiEffect:
          "Cost savings on logistics. Good to have, but this is polishing the end of a chain that needs fixing at the start.",
      },
    ],
  },
  {
    id: 3,
    title: "Customer Support Ticket Resolution",
    emoji: "🎧",
    context:
      "Your SaaS company gets 500+ support tickets daily. Response times are climbing, customers are churning, and agents are burned out from handling repetitive issues mixed with complex escalations. Where does AI make the biggest difference?",
    steps: [
      {
        id: "cs-1",
        name: "Ticket Submitted",
        icon: "🎫",
        shortDesc:
          "Customer submits a support request via email, chat, phone, or web form describing their issue.",
        isOptimal: false,
        isBottleneck: false,
        aiExplanation:
          "AI could offer a smart intake form that asks clarifying questions upfront. Minor improvement to ticket quality, but customers often don't know how to describe their problem technically, so you're adding friction.",
        aiEffect:
          "Slight improvement in ticket quality. Risk of frustrating customers with too many upfront questions.",
      },
      {
        id: "cs-2",
        name: "Triage & Categorize",
        icon: "🏷️",
        shortDesc:
          "A support coordinator reads each ticket, determines its category, priority level, and complexity — often a manual, error-prone process that creates a growing backlog.",
        isOptimal: true,
        isBottleneck: true,
        aiExplanation:
          "🎯 This is the optimal AI insertion point! NLP models can instantly classify tickets by category, sentiment, urgency, and complexity with 95%+ accuracy. AI can auto-resolve simple tickets (password resets, FAQ questions) — which typically make up 30-40% of all tickets — while intelligently routing complex issues to specialized agents.",
        aiEffect:
          "Game-changing: 30-40% of tickets auto-resolved instantly, remaining tickets perfectly categorized and prioritized. Agent workload drops dramatically, response times go from hours to minutes, and agents focus on complex, high-value interactions.",
      },
      {
        id: "cs-3",
        name: "Agent Assignment",
        icon: "👤",
        shortDesc:
          "Tickets are assigned to available agents, often via round-robin or queue-based systems regardless of agent expertise.",
        isOptimal: false,
        isBottleneck: false,
        aiExplanation:
          "AI could match tickets to agents based on expertise, current workload, and past resolution success rates. A solid improvement, but it works best AFTER proper categorization. Smart routing without smart triage just sends misclassified tickets to the wrong specialist faster.",
        aiEffect:
          "Good secondary optimization (~20% faster resolution). Best implemented as Phase 2 after triage automation is in place.",
      },
      {
        id: "cs-4",
        name: "Investigation",
        icon: "🔎",
        shortDesc:
          "Agent researches the issue — checking documentation, past tickets, system logs, and knowledge bases to understand the problem.",
        isOptimal: false,
        isBottleneck: false,
        aiExplanation:
          "An AI copilot could surface relevant knowledge base articles, similar past tickets, and suggested solutions for the agent. Very useful productivity tool — but this is augmenting individual agent performance rather than fixing the systemic bottleneck.",
        aiEffect:
          "Solid agent productivity boost (~25% faster per-ticket). Great complement to triage automation, but doesn't reduce ticket volume.",
      },
      {
        id: "cs-5",
        name: "Resolution",
        icon: "✅",
        shortDesc:
          "Agent implements the fix, communicates the solution to the customer, and closes the ticket.",
        isOptimal: false,
        isBottleneck: false,
        aiExplanation:
          "AI could draft response templates and suggest resolution steps. Saves agents time on writing, but the hard part is figuring out the solution — not typing it up.",
        aiEffect:
          "Minor time savings on communication. Useful but not transformative for the overall workflow.",
      },
      {
        id: "cs-6",
        name: "Follow-up & CSAT",
        icon: "⭐",
        shortDesc:
          "Customer receives a satisfaction survey and the ticket is reviewed for quality assurance.",
        isOptimal: false,
        isBottleneck: false,
        aiExplanation:
          "AI sentiment analysis on survey responses and automatic QA scoring. Good for insights and coaching, but this is backward-looking analytics — it tells you what went wrong after the fact.",
        aiEffect:
          "Valuable for continuous improvement and identifying training gaps, but zero impact on current ticket resolution speed.",
      },
    ],
  },
];

const COLORS = {
  bg: "#0f0f1a",
  card: "#1a1a2e",
  cardHover: "#252540",
  accent: "#00d4aa",
  accentGlow: "rgba(0, 212, 170, 0.3)",
  correct: "#00d4aa",
  correctBg: "rgba(0, 212, 170, 0.15)",
  wrong: "#ff6b6b",
  wrongBg: "rgba(255, 107, 107, 0.15)",
  bottleneck: "#ff9f43",
  bottleneckBg: "rgba(255, 159, 67, 0.15)",
  text: "#e8e8f0",
  textMuted: "#8888aa",
  purple: "#a855f7",
  purpleGlow: "rgba(168, 85, 247, 0.3)",
};

export default function App() {
  const [currentWorkflow, setCurrentWorkflow] = useState(0);
  const [flippedCards, setFlippedCards] = useState({});
  const [scores, setScores] = useState({});
  const [gamePhase, setGamePhase] = useState("intro"); // intro, playing, summary
  const [shakeCard, setShakeCard] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateIn(true), 100);
  }, []);

  useEffect(() => {
    if (gamePhase === "playing") {
      setAnimateIn(false);
      setTimeout(() => setAnimateIn(true), 50);
    }
  }, [currentWorkflow]);

  const workflow = WORKFLOWS[currentWorkflow];
  const totalOptimal = Object.values(scores).filter((s) => s === true).length;
  const totalAttempted = Object.keys(scores).length;

  const handleCardClick = (step) => {
    if (flippedCards[step.id]) return;

    const newFlipped = { ...flippedCards, [step.id]: true };
    setFlippedCards(newFlipped);

    if (step.isOptimal) {
      if (!scores[workflow.id]) {
        setScores({ ...scores, [workflow.id]: true });
      }
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    } else {
      if (!scores[workflow.id]) {
        setScores({ ...scores, [workflow.id]: false });
      }
      setShakeCard(step.id);
      setTimeout(() => setShakeCard(null), 600);
    }
  };

  const handleNext = () => {
    if (currentWorkflow < WORKFLOWS.length - 1) {
      setCurrentWorkflow(currentWorkflow + 1);
      setFlippedCards({});
    } else {
      setGamePhase("summary");
    }
  };

  const handleReset = () => {
    setCurrentWorkflow(0);
    setFlippedCards({});
    setScores({});
    setGamePhase("intro");
    setAnimateIn(false);
    setTimeout(() => setAnimateIn(true), 100);
  };

  const foundOptimal = workflow?.steps.some(
    (s) => s.isOptimal && flippedCards[s.id]
  );

  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Outfit:wght@300;400;500;600;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }

        @keyframes confettiDrop {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }

        @keyframes flipIn {
          0% { transform: rotateY(90deg); opacity: 0; }
          100% { transform: rotateY(0deg); opacity: 1; }
        }

        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 20px ${COLORS.accentGlow}; }
          50% { box-shadow: 0 0 40px ${COLORS.accentGlow}, 0 0 60px ${COLORS.accentGlow}; }
        }

        .card-front { cursor: pointer; transition: all 0.3s ease; }
        .card-front:hover { transform: translateY(-4px) scale(1.02); }

        .bottleneck-badge {
          animation: pulse 2s ease-in-out infinite;
        }

        .shake {
          animation: shake 0.5s ease-in-out;
        }

        .score-pip {
          transition: all 0.4s ease;
        }
      `}</style>

      {/* Confetti */}
      {showConfetti && (
        <div style={styles.confettiContainer}>
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              style={{
                position: "fixed",
                left: `${Math.random() * 100}%`,
                top: "-20px",
                width: `${8 + Math.random() * 8}px`,
                height: `${8 + Math.random() * 8}px`,
                borderRadius: Math.random() > 0.5 ? "50%" : "2px",
                backgroundColor: [
                  "#00d4aa",
                  "#a855f7",
                  "#ff9f43",
                  "#ff6b6b",
                  "#3b82f6",
                  "#fbbf24",
                ][Math.floor(Math.random() * 6)],
                animation: `confettiDrop ${1.5 + Math.random() * 2}s ease-in forwards`,
                animationDelay: `${Math.random() * 0.5}s`,
                zIndex: 1000,
              }}
            />
          ))}
        </div>
      )}

      {/* Intro Screen */}
      {gamePhase === "intro" && (
        <div
          style={{
            ...styles.introContainer,
            opacity: animateIn ? 1 : 0,
            transform: animateIn ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease",
          }}
        >
          <div style={styles.introEmoji}>🤖</div>
          <h1 style={styles.introTitle}>AI Workflow Challenge</h1>
          <p style={styles.introSubtitle}>
            Can you spot where AI should be integrated into these business
            workflows?
          </p>
          <div style={styles.introRules}>
            <div style={styles.ruleItem}>
              <span style={styles.ruleNumber}>1</span>
              <span>
                Read the scenario and examine each step of the workflow
              </span>
            </div>
            <div style={styles.ruleItem}>
              <span style={styles.ruleNumber}>2</span>
              <span>
                Click the step where you think AI would have the{" "}
                <strong>biggest impact</strong>
              </span>
            </div>
            <div style={styles.ruleItem}>
              <span style={styles.ruleNumber}>3</span>
              <span>
                Every card flips to show what AI would do at that step — but
                only one is optimal!
              </span>
            </div>
          </div>
          <div style={styles.introMeta}>
            3 Scenarios · Find the optimal AI insertion point in each
          </div>
          <button style={styles.startButton} onClick={() => setGamePhase("playing")}>
            Let's Go →
          </button>
        </div>
      )}

      {/* Game Screen */}
      {gamePhase === "playing" && (
        <div
          style={{
            ...styles.gameContainer,
            opacity: animateIn ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        >
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerLeft}>
              <span style={styles.headerEmoji}>🤖</span>
              <span style={styles.headerTitle}>AI Workflow Challenge</span>
            </div>
            <div style={styles.scorePips}>
              {WORKFLOWS.map((w, i) => (
                <div
                  key={w.id}
                  className="score-pip"
                  style={{
                    ...styles.pip,
                    ...(i === currentWorkflow ? styles.pipActive : {}),
                    ...(scores[w.id] === true ? styles.pipCorrect : {}),
                    ...(scores[w.id] === false ? styles.pipWrong : {}),
                  }}
                >
                  {scores[w.id] === true
                    ? "✓"
                    : scores[w.id] === false
                    ? "✗"
                    : i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Scenario Card */}
          <div style={styles.scenarioCard}>
            <div style={styles.scenarioHeader}>
              <span style={{ fontSize: "28px" }}>{workflow.emoji}</span>
              <div>
                <div style={styles.scenarioLabel}>
                  SCENARIO {currentWorkflow + 1} OF {WORKFLOWS.length}
                </div>
                <h2 style={styles.scenarioTitle}>{workflow.title}</h2>
              </div>
            </div>
            <p style={styles.scenarioContext}>{workflow.context}</p>
            <div style={styles.scenarioPrompt}>
              💡 Tap a step to reveal what AI would do there. Find the optimal
              insertion point!
            </div>
          </div>

          {/* Workflow Steps */}
          <div style={styles.stepsContainer}>
            {workflow.steps.map((step, idx) => {
              const isFlipped = flippedCards[step.id];
              const isShaking = shakeCard === step.id;

              return (
                <div
                  key={step.id}
                  style={{
                    animation: animateIn
                      ? `slideUp 0.5s ease ${idx * 0.08}s both`
                      : "none",
                  }}
                >
                  {/* Connector */}
                  {idx > 0 && (
                    <div style={styles.connector}>
                      <div style={styles.connectorLine} />
                      <div style={styles.connectorArrow}>▼</div>
                    </div>
                  )}

                  {!isFlipped ? (
                    /* Front of card */
                    <div
                      className={`card-front ${isShaking ? "shake" : ""}`}
                      onClick={() => handleCardClick(step)}
                      style={{
                        ...styles.stepCard,
                        ...(step.isBottleneck
                          ? styles.stepCardBottleneck
                          : {}),
                      }}
                    >
                      <div style={styles.stepHeader}>
                        <div style={styles.stepNumber}>{idx + 1}</div>
                        <span style={{ fontSize: "24px" }}>{step.icon}</span>
                        <h3 style={styles.stepName}>{step.name}</h3>
                        {step.isBottleneck && (
                          <span
                            className="bottleneck-badge"
                            style={styles.bottleneckBadge}
                          >
                            ⚠️ BOTTLENECK
                          </span>
                        )}
                      </div>
                      <p style={styles.stepDesc}>{step.shortDesc}</p>
                      <div style={styles.tapHint}>Tap to check →</div>
                    </div>
                  ) : (
                    /* Back of card */
                    <div
                      style={{
                        ...styles.stepCardBack,
                        ...(step.isOptimal
                          ? styles.stepCardBackCorrect
                          : styles.stepCardBackWrong),
                        animation: "flipIn 0.4s ease",
                      }}
                    >
                      <div style={styles.resultHeader}>
                        <span style={{ fontSize: "24px" }}>
                          {step.isOptimal ? "🎯" : "🤔"}
                        </span>
                        <span
                          style={{
                            ...styles.resultBadge,
                            backgroundColor: step.isOptimal
                              ? COLORS.correct
                              : COLORS.wrong,
                          }}
                        >
                          {step.isOptimal
                            ? "OPTIMAL CHOICE!"
                            : "NOT THE BEST FIT"}
                        </span>
                      </div>
                      <p style={styles.aiExplanation}>{step.aiExplanation}</p>
                      <div
                        style={{
                          ...styles.effectBox,
                          borderColor: step.isOptimal
                            ? COLORS.correct
                            : COLORS.wrong,
                          backgroundColor: step.isOptimal
                            ? COLORS.correctBg
                            : COLORS.wrongBg,
                        }}
                      >
                        <div style={styles.effectLabel}>
                          📊 Effect on Workflow
                        </div>
                        <p style={styles.effectText}>{step.aiEffect}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Action */}
          <div style={styles.bottomBar}>
            {foundOptimal && (
              <button style={styles.nextButton} onClick={handleNext}>
                {currentWorkflow < WORKFLOWS.length - 1
                  ? `Next Scenario →`
                  : `See Results →`}
              </button>
            )}
            {!foundOptimal && Object.keys(flippedCards).length > 0 && (
              <p style={styles.keepTrying}>
                Keep going — find the optimal step! 🔍
              </p>
            )}
          </div>
        </div>
      )}

      {/* Summary Screen */}
      {gamePhase === "summary" && (
        <div
          style={{
            ...styles.introContainer,
            opacity: animateIn ? 1 : 0,
            transform: animateIn ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease",
          }}
        >
          <div style={{ fontSize: "56px", marginBottom: "12px" }}>
            {totalOptimal === 3 ? "🏆" : totalOptimal >= 2 ? "🌟" : "💡"}
          </div>
          <h1 style={styles.introTitle}>Challenge Complete!</h1>
          <div style={styles.scoreCard}>
            <div style={styles.scoreBig}>
              {totalOptimal}/{WORKFLOWS.length}
            </div>
            <div style={styles.scoreLabel}>Optimal choices found</div>
          </div>
          <div style={styles.summaryResults}>
            {WORKFLOWS.map((w) => (
              <div key={w.id} style={styles.summaryRow}>
                <span style={{ fontSize: "20px" }}>{w.emoji}</span>
                <span style={styles.summaryWorkflowName}>{w.title}</span>
                <span
                  style={{
                    ...styles.summaryResult,
                    color: scores[w.id] ? COLORS.correct : COLORS.wrong,
                  }}
                >
                  {scores[w.id] ? "Found it! ✓" : "Missed ✗"}
                </span>
              </div>
            ))}
          </div>
          <p style={styles.summaryTakeaway}>
            The key takeaway? AI has the biggest impact when applied at the{" "}
            <strong style={{ color: COLORS.accent }}>root cause</strong> of a
            bottleneck — not just automating any random step. Think upstream! 🧠
          </p>
          <button style={styles.startButton} onClick={handleReset}>
            🔄 Reset for Next Team
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  root: {
    fontFamily: "'Outfit', sans-serif",
    backgroundColor: COLORS.bg,
    color: COLORS.text,
    minHeight: "100vh",
    padding: "16px",
    position: "relative",
    overflow: "hidden",
  },
  confettiContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: 1000,
  },

  // Intro
  introContainer: {
    maxWidth: "560px",
    margin: "0 auto",
    paddingTop: "40px",
    textAlign: "center",
  },
  introEmoji: {
    fontSize: "64px",
    marginBottom: "8px",
    animation: "float 3s ease-in-out infinite",
    display: "inline-block",
  },
  introTitle: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "clamp(24px, 5vw, 32px)",
    fontWeight: 700,
    marginBottom: "12px",
    background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.purple})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    lineHeight: 1.3,
  },
  introSubtitle: {
    fontSize: "17px",
    color: COLORS.textMuted,
    marginBottom: "32px",
    lineHeight: 1.5,
  },
  introRules: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    textAlign: "left",
    marginBottom: "28px",
  },
  ruleItem: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    backgroundColor: COLORS.card,
    padding: "14px 18px",
    borderRadius: "12px",
    fontSize: "15px",
    lineHeight: 1.5,
  },
  ruleNumber: {
    fontFamily: "'Space Mono', monospace",
    fontWeight: 700,
    fontSize: "14px",
    color: COLORS.bg,
    backgroundColor: COLORS.accent,
    width: "28px",
    height: "28px",
    minWidth: "28px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  introMeta: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "12px",
    color: COLORS.textMuted,
    letterSpacing: "1px",
    textTransform: "uppercase",
    marginBottom: "24px",
  },
  startButton: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: "18px",
    fontWeight: 600,
    padding: "16px 48px",
    borderRadius: "50px",
    border: "none",
    background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.purple})`,
    color: "#fff",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: `0 4px 24px ${COLORS.accentGlow}`,
  },

  // Game
  gameContainer: {
    maxWidth: "640px",
    margin: "0 auto",
    paddingBottom: "100px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "10px",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  headerEmoji: { fontSize: "24px" },
  headerTitle: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "14px",
    fontWeight: 700,
    color: COLORS.accent,
    letterSpacing: "0.5px",
  },
  scorePips: {
    display: "flex",
    gap: "8px",
  },
  pip: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
    fontFamily: "'Space Mono', monospace",
    fontWeight: 700,
    backgroundColor: COLORS.card,
    color: COLORS.textMuted,
    border: `2px solid transparent`,
  },
  pipActive: {
    borderColor: COLORS.accent,
    color: COLORS.accent,
    boxShadow: `0 0 12px ${COLORS.accentGlow}`,
  },
  pipCorrect: {
    backgroundColor: COLORS.correct,
    color: COLORS.bg,
    borderColor: COLORS.correct,
  },
  pipWrong: {
    backgroundColor: COLORS.wrong,
    color: "#fff",
    borderColor: COLORS.wrong,
  },

  // Scenario
  scenarioCard: {
    backgroundColor: COLORS.card,
    borderRadius: "16px",
    padding: "20px",
    marginBottom: "24px",
    border: `1px solid rgba(255,255,255,0.06)`,
  },
  scenarioHeader: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "12px",
  },
  scenarioLabel: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "11px",
    color: COLORS.accent,
    letterSpacing: "2px",
    marginBottom: "4px",
  },
  scenarioTitle: {
    fontSize: "20px",
    fontWeight: 700,
    lineHeight: 1.3,
  },
  scenarioContext: {
    fontSize: "15px",
    lineHeight: 1.6,
    color: COLORS.textMuted,
    marginBottom: "14px",
  },
  scenarioPrompt: {
    fontSize: "14px",
    fontWeight: 500,
    color: COLORS.accent,
    backgroundColor: "rgba(0, 212, 170, 0.08)",
    padding: "10px 14px",
    borderRadius: "10px",
    borderLeft: `3px solid ${COLORS.accent}`,
  },

  // Steps
  stepsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  connector: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "28px",
  },
  connectorLine: {
    width: "2px",
    flex: 1,
    background: `linear-gradient(to bottom, ${COLORS.accent}44, ${COLORS.purple}44)`,
  },
  connectorArrow: {
    fontSize: "10px",
    color: COLORS.textMuted,
    lineHeight: 1,
  },
  stepCard: {
    backgroundColor: COLORS.card,
    borderRadius: "14px",
    padding: "18px",
    border: `1px solid rgba(255,255,255,0.06)`,
    position: "relative",
    transition: "all 0.3s ease",
  },
  stepCardBottleneck: {
    border: `1px solid ${COLORS.bottleneck}55`,
    backgroundColor: COLORS.bottleneckBg,
  },
  stepHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
    flexWrap: "wrap",
  },
  stepNumber: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "11px",
    fontWeight: 700,
    color: COLORS.textMuted,
    backgroundColor: "rgba(255,255,255,0.06)",
    width: "24px",
    height: "24px",
    minWidth: "24px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  stepName: {
    fontSize: "16px",
    fontWeight: 600,
    flex: 1,
  },
  bottleneckBadge: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "10px",
    fontWeight: 700,
    color: COLORS.bottleneck,
    backgroundColor: "rgba(255, 159, 67, 0.15)",
    padding: "4px 10px",
    borderRadius: "20px",
    letterSpacing: "0.5px",
    whiteSpace: "nowrap",
  },
  stepDesc: {
    fontSize: "14px",
    lineHeight: 1.5,
    color: COLORS.textMuted,
  },
  tapHint: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "11px",
    color: COLORS.accent,
    marginTop: "10px",
    textAlign: "right",
    letterSpacing: "0.5px",
  },

  // Flipped card
  stepCardBack: {
    borderRadius: "14px",
    padding: "18px",
    border: `1px solid rgba(255,255,255,0.06)`,
  },
  stepCardBackCorrect: {
    backgroundColor: COLORS.correctBg,
    border: `2px solid ${COLORS.correct}`,
    boxShadow: `0 0 30px ${COLORS.accentGlow}`,
  },
  stepCardBackWrong: {
    backgroundColor: COLORS.wrongBg,
    border: `1px solid ${COLORS.wrong}55`,
  },
  resultHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "12px",
  },
  resultBadge: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "11px",
    fontWeight: 700,
    color: "#fff",
    padding: "5px 14px",
    borderRadius: "20px",
    letterSpacing: "1px",
  },
  aiExplanation: {
    fontSize: "15px",
    lineHeight: 1.7,
    marginBottom: "14px",
  },
  effectBox: {
    padding: "14px",
    borderRadius: "10px",
    borderLeft: "3px solid",
  },
  effectLabel: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "1px",
    marginBottom: "6px",
  },
  effectText: {
    fontSize: "14px",
    lineHeight: 1.6,
    color: COLORS.textMuted,
  },

  // Bottom
  bottomBar: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "16px",
    backgroundColor: `${COLORS.bg}ee`,
    backdropFilter: "blur(10px)",
    display: "flex",
    justifyContent: "center",
    zIndex: 100,
  },
  nextButton: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: "16px",
    fontWeight: 600,
    padding: "14px 40px",
    borderRadius: "50px",
    border: "none",
    background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.purple})`,
    color: "#fff",
    cursor: "pointer",
    boxShadow: `0 4px 24px ${COLORS.accentGlow}`,
    animation: "glowPulse 2s ease-in-out infinite",
  },
  keepTrying: {
    fontSize: "15px",
    color: COLORS.textMuted,
    fontWeight: 500,
  },

  // Summary
  scoreCard: {
    margin: "24px auto",
    padding: "24px",
    backgroundColor: COLORS.card,
    borderRadius: "16px",
    display: "inline-block",
  },
  scoreBig: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "48px",
    fontWeight: 700,
    background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.purple})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  scoreLabel: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "12px",
    color: COLORS.textMuted,
    letterSpacing: "1px",
    textTransform: "uppercase",
    marginTop: "4px",
  },
  summaryResults: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "24px",
    marginBottom: "24px",
    textAlign: "left",
  },
  summaryRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    backgroundColor: COLORS.card,
    padding: "14px 16px",
    borderRadius: "12px",
  },
  summaryWorkflowName: {
    fontSize: "14px",
    fontWeight: 500,
    flex: 1,
  },
  summaryResult: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "12px",
    fontWeight: 700,
  },
  summaryTakeaway: {
    fontSize: "15px",
    lineHeight: 1.7,
    color: COLORS.textMuted,
    marginBottom: "28px",
    padding: "0 10px",
  },
};
