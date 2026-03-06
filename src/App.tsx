import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import IntroScreen from './components/IntroScreen';
import GameplayScreen from './components/GameplayScreen';
import SummaryScreen from './components/SummaryScreen';
import { SCENARIOS } from './data';

export type ScreenState = 'intro' | 'gameplay' | 'summary';

export default function App() {
    const [currentScreen, setCurrentScreen] = useState<ScreenState>('intro');
    const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
    const [scenarioResults, setScenarioResults] = useState<boolean[]>([]); // true if optimal found

    const handleStart = () => {
        setCurrentScreen('gameplay');
        setCurrentScenarioIndex(0);
        setScenarioResults([]);
    };

    const handleNextScenario = (optimalFound: boolean) => {
        const newResults = [...scenarioResults, optimalFound];
        setScenarioResults(newResults);

        if (currentScenarioIndex < SCENARIOS.length - 1) {
            setCurrentScenarioIndex(currentScenarioIndex + 1);
        } else {
            setCurrentScreen('summary');
        }
    };

    const handleReset = () => {
        setCurrentScreen('intro');
        setCurrentScenarioIndex(0);
        setScenarioResults([]);
    };

    return (
        <div className="min-h-screen w-full overflow-hidden flex flex-col">
            <AnimatePresence mode="wait">
                {currentScreen === 'intro' && (
                    <IntroScreen key="intro" onStart={handleStart} />
                )}
                {currentScreen === 'gameplay' && (
                    <GameplayScreen
                        key={`gameplay-${currentScenarioIndex}`}
                        scenario={SCENARIOS[currentScenarioIndex]}
                        scenarioIndex={currentScenarioIndex}
                        totalScenarios={SCENARIOS.length}
                        results={scenarioResults}
                        onNext={handleNextScenario}
                    />
                )}
                {currentScreen === 'summary' && (
                    <SummaryScreen
                        key="summary"
                        results={scenarioResults}
                        scenarios={SCENARIOS}
                        onReset={handleReset}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
