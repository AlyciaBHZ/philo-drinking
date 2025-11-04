import { useState, useEffect } from 'react';
import { useGameEngine } from './hooks/useGameEngine';
import { Shuffle, Undo, Palette, Flame, Github } from 'lucide-react';
import { Button } from './components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './components/ui/collapsible';
import { Popover, PopoverContent, PopoverTrigger } from './components/ui/popover';
import { Badge } from './components/ui/badge';
import { motion, AnimatePresence } from 'motion/react';
 
interface ColorTheme {
  name: string;
  colors: {
    bg: string;
    border: string;
    cardBg: string;
    text: string;
    textMuted: string;
    accent: string;
    accentHover: string;
  };
}

const colorThemes: ColorTheme[] = [
  {
    name: 'Zinc',
    colors: {
      bg: 'bg-zinc-950',
      border: 'border-zinc-800',
      cardBg: 'bg-zinc-900',
      text: 'text-zinc-50',
      textMuted: 'text-zinc-500',
      accent: 'bg-zinc-50 text-zinc-950',
      accentHover: 'hover:bg-zinc-200'
    }
  },
  {
    name: 'Blue',
    colors: {
      bg: 'bg-blue-950',
      border: 'border-blue-800',
      cardBg: 'bg-blue-900',
      text: 'text-blue-50',
      textMuted: 'text-blue-400',
      accent: 'bg-blue-400 text-blue-950',
      accentHover: 'hover:bg-blue-300'
    }
  },
  {
    name: 'Purple',
    colors: {
      bg: 'bg-purple-950',
      border: 'border-purple-800',
      cardBg: 'bg-purple-900',
      text: 'text-purple-50',
      textMuted: 'text-purple-400',
      accent: 'bg-purple-400 text-purple-950',
      accentHover: 'hover:bg-purple-300'
    }
  },
  {
    name: 'Emerald',
    colors: {
      bg: 'bg-emerald-950',
      border: 'border-emerald-800',
      cardBg: 'bg-emerald-900',
      text: 'text-emerald-50',
      textMuted: 'text-emerald-400',
      accent: 'bg-emerald-400 text-emerald-950',
      accentHover: 'hover:bg-emerald-300'
    }
  },
  {
    name: 'Rose',
    colors: {
      bg: 'bg-rose-950',
      border: 'border-rose-800',
      cardBg: 'bg-rose-900',
      text: 'text-rose-50',
      textMuted: 'text-rose-400',
      accent: 'bg-rose-400 text-rose-950',
      accentHover: 'hover:bg-rose-300'
    }
  },
  {
    name: 'Amber',
    colors: {
      bg: 'bg-amber-950',
      border: 'border-amber-800',
      cardBg: 'bg-amber-900',
      text: 'text-amber-50',
      textMuted: 'text-amber-400',
      accent: 'bg-amber-400 text-amber-950',
      accentHover: 'hover:bg-amber-300'
    }
  }
];

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function App() {
  const { currentCard, deckCount, historyCount, isLoading, drawCard, undoCard, shuffleDeck } = useGameEngine();
  const [showAlt, setShowAlt] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [themeIndex, setThemeIndex] = useState(0);

  const theme = colorThemes[themeIndex];
  const drawDisabled = isLoading || (deckCount === 0 && historyCount === 0 && !currentCard);

  const handleReshuffle = () => {
    shuffleDeck();
    setShowAlt(false);
    setDetailOpen(false);
  };

  const handleDrawCard = () => {
    drawCard();
    setShowAlt(false);
    setDetailOpen(false);
  };

  const handleUndo = () => {
    if (historyCount === 0) return;
    undoCard();
    setShowAlt(false);
    setDetailOpen(false);
  };

  // Keyboard support: Space to draw card
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !drawDisabled) {
        e.preventDefault();
        handleDrawCard();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [drawDisabled]);

  return (
    <motion.div 
      className={`min-h-screen ${theme.colors.bg} ${theme.colors.text} flex flex-col transition-colors duration-500`}
      key={themeIndex}
      initial={{ opacity: 0.8 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.header 
        className={`flex items-center justify-between px-4 py-3 border-b ${theme.colors.border}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={theme.colors.text}>PhiloDrink</h1>
        <div className="flex gap-2">
          {/* GitHub Link */}
          <motion.div whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className={`${theme.colors.textMuted} hover:${theme.colors.text}`}
            >
              <a 
                href="https://github.com/AlyciaBHZ/philo-drinking" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub Repository"
              >
                <Github className="h-5 w-5" />
              </a>
            </Button>
          </motion.div>

          {/* Color Theme Selector */}
          <Popover>
            <PopoverTrigger asChild>
              <motion.div whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`${theme.colors.textMuted} hover:${theme.colors.text}`}
                >
                  <Palette className="h-5 w-5" />
                </Button>
              </motion.div>
            </PopoverTrigger>
            <PopoverContent className={`w-48 ${theme.colors.cardBg} ${theme.colors.border} border`}>
              <div className="space-y-2">
                <p className={`${theme.colors.textMuted} mb-3`}>选择主题</p>
                <div className="grid grid-cols-3 gap-2">
                  {colorThemes.map((colorTheme, index) => (
                    <motion.button
                      key={colorTheme.name}
                      onClick={() => setThemeIndex(index)}
                      className={`h-12 rounded-md border-2 ${
                        index === themeIndex 
                          ? `${theme.colors.border} border-opacity-100` 
                          : 'border-transparent'
                      } ${colorTheme.colors.cardBg} relative overflow-hidden`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className={`absolute inset-0 ${colorTheme.colors.cardBg}`} />
                      <span className={`relative z-10 text-xs ${colorTheme.colors.text}`}>
                        {colorTheme.name}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Reshuffle Button */}
          <motion.div whileTap={{ scale: 0.9, rotate: 180 }} transition={{ duration: 0.3 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleReshuffle}
              className={`${theme.colors.textMuted} hover:${theme.colors.text}`}
            >
              <Shuffle className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </motion.header>

      {/* Card Viewport - 80% of screen */}
      <main className="flex-1 flex items-center justify-center px-5 py-4 overflow-y-auto">
        <AnimatePresence mode="wait">
          {currentCard ? (
            <motion.div
              key={currentCard.id}
              className="w-full max-w-md space-y-6"
              initial={{ rotateY: 90, opacity: 0, scale: 0.8 }}
              animate={{ rotateY: 0, opacity: 1, scale: 1 }}
              exit={{ rotateY: -90, opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.25, type: "spring", stiffness: 150 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Philosopher name : Title (centered) */}
              <motion.div
                className="text-center space-y-2.5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
              >
                <h2 className={`${theme.colors.textMuted} text-xl`}>
                  <span className={theme.colors.text}>{currentCard.philosopher}</span>
                  <span className={theme.colors.textMuted}>：</span>
                  <span className={theme.colors.textMuted}>{currentCard.title}</span>
                </h2>
                {/* Level indicator */}
                {currentCard.level && (
                  <div className="flex items-center justify-center gap-1">
                    {Array.from({ length: currentCard.level }).map((_, i) => (
                      <Flame key={i} className={`h-4 w-4 ${theme.colors.textMuted}`} />
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Tags */}
              {currentCard.tags && currentCard.tags.length > 0 && (
                <motion.div
                  className="flex justify-center gap-2 flex-wrap pb-2"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.12 }}
                >
                  {currentCard.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className={`${theme.colors.border} border ${theme.colors.textMuted} text-xs`}
                    >
                      {tag}
                    </Badge>
                  ))}
                </motion.div>
              )}

              {/* Summary - Most important */}
              <motion.div
                className={`${theme.colors.cardBg} rounded-lg p-6 border ${theme.colors.border} space-y-3`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 }}
              >
                <AnimatePresence mode="wait">
                  <motion.p
                    key={showAlt ? 'alt' : 'summary'}
                    className={`text-xl leading-relaxed ${theme.colors.text}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {showAlt && currentCard.alt ? currentCard.alt : currentCard.summary}
                  </motion.p>
                </AnimatePresence>

                {/* Detail - Always visible below summary */}
                {!showAlt && currentCard.detail && (
                  <motion.p
                    className={`text-xl leading-relaxed ${theme.colors.textMuted} italic pt-2`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                  >
                    {currentCard.detail}
                  </motion.p>
                )}
              </motion.div>

              {/* Background - Collapsible */}
              {currentCard.background && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Collapsible open={detailOpen} onOpenChange={setDetailOpen}>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`w-full ${theme.colors.textMuted} hover:${theme.colors.text}`}
                      >
                        {detailOpen ? '收起背景' : '查看哲学背景'}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2">
                      <motion.p
                        className={`${theme.colors.textMuted} text-center px-4`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        {currentCard.background}
                      </motion.p>
                    </CollapsibleContent>
                  </Collapsible>
                </motion.div>
              )}

              {/* Alt version toggle */}
              {currentCard.alt && (
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  <motion.div whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAlt(!showAlt)}
                      className={`${theme.colors.cardBg} ${theme.colors.border} border ${theme.colors.text} hover:opacity-80`}
                    >
                      {showAlt ? '🍺 酒精版本' : '🥤 无酒精版本'}
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="placeholder"
              className="text-center space-y-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <motion.p 
                className={theme.colors.textMuted}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {isLoading ? '正在加载卡片...' : '准备好挑战哲学派对了吗？'}
              </motion.p>
              <p className={theme.colors.textMuted}>
                {isLoading ? '请稍候，正在读取卡片内容。' : '点击下方按钮抽取你的命运。'}
              </p>
            
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Action Bar - Fixed Footer */}
      <motion.footer 
        className={`border-t ${theme.colors.border} p-4 ${theme.colors.bg}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="max-w-md mx-auto space-y-3">
          {/* Card count */}
          <motion.p 
            className={`text-center ${theme.colors.textMuted}`}
            key={deckCount}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            剩余 {deckCount} 张卡片
          </motion.p>

          {/* Buttons */}
          <div className="flex gap-3">
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={handleUndo}
                disabled={historyCount === 0}
                className={`shrink-0 ${theme.colors.border} border ${theme.colors.textMuted} hover:${theme.colors.text} disabled:opacity-30`}
              >
                <Undo className="h-5 w-5" />
              </Button>
            </motion.div>

            <motion.div 
              className="flex-1"
              whileTap={{ scale: 0.97 }}
            >
              <Button
                onClick={handleDrawCard}
                disabled={drawDisabled}
                className={`w-full ${theme.colors.accent} ${theme.colors.accentHover} disabled:opacity-30 h-12`}
              >
                <motion.span
                  animate={!drawDisabled ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {deckCount === 0 && !isLoading ? '自动洗牌中' : '抽卡'}
                </motion.span>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.footer>
    </motion.div>
  );
}




