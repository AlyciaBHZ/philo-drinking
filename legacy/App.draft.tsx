import React, { useState } from 'react';
import { useGameEngine } from './hooks/useGameEngine';
import './App.css'; // Assuming Figma AI gave you CSS

// --- Import your Figma AI components ---
// (These names are guesses, replace them with your actual component names)
// import { CardContainer, AnimatedButton, ToggleButton, PhilosophyLink } from './components/FigmaUI';

// --- Helper component to show loading/empty state ---
const EmptyState = () => (
  <div className="card-placeholder">
    <h1>PhiloDrink</h1>
    <p>Get ready to question your existence... and your sobriety.</p>
    {/* This button will trigger the FIRST draw */}
  </div>
);

function App() {
  // 1. Call your CORE logic hook
  const { 
    currentCard, 
    drawCard, 
    undoCard, 
    shuffleDeck, 
    deckCount, 
    isLoading 
  } = useGameEngine('zh-CN');

  // 2. Manage UI state based on your screenshots
  const [isSoberMode, setIsSoberMode] = useState(false);
  const [isBackgroundVisible, setIsBackgroundVisible] = useState(false);

  // 3. Handle the main "Draw" action
  const handleDraw = () => {
    // When we draw, hide the background for the new card
    setIsBackgroundVisible(false);
    drawCard();
  };

  // --- Render Logic ---
  if (isLoading) {
    return <div>Loading Philosophers...</div>;
  }

  return (
    <div className="game-container">
      {/* This is your main UI. 
        You will replace these <div>s with your actual 
        Figma AI motion components. 
      */}

      <header className="game-header">
        <button onClick={shuffleDeck}>Reshuffle ({deckCount} left)</button>
        <button onClick={undoCard}>Undo</button>
      </header>

      <main className="card-viewport">
        {!currentCard ? (
          <EmptyState />
        ) : (
          {/* This is the main Card component from Figma */}
          {/* <CardContainer> */}
          <div className="card-content">
            <p className="philosopher-name">{currentCard.philosopher}</p>
            <h2 className="philosopher-idea">{currentCard.title}</h2>
            
            <div className="rule-box">
              {/* THIS IS THE KEY: Conditionally render the rule */}
              <p className="rule-text">
                {isSoberMode ? currentCard.alt : currentCard.summary}
              </p>
            </div>

            {/* Link to toggle philosophy background */}
            <button 
              className="philosophy-link" 
              onClick={() => setIsBackgroundVisible(!isBackgroundVisible)}
            >
              {isBackgroundVisible ? '收起解释' : '查看哲学背景'}
            </button>

            {/* Conditionally render the background text */}
            {isBackgroundVisible && (
              <p className="philosophy-background">
                {currentCard.background}
              </p>
            )}
          </div>
          {/* </CardContainer> */}
        )}
      </main>

      <footer className="action-bar">
        {/* The "Sober Mode" toggle button */}
        <button 
          className="toggle-sober"
          onClick={() => setIsSoberMode(!isSoberMode)}
        >
          {isSoberMode ? '酒精版本' : '无酒精版本'}
        </button>

        {/* The main "Draw" button */}
        <button className="draw-button" onClick={handleDraw}>
          DRAW CARD
        </button>
      </footer>
    </div>
  );
}

export default App;
