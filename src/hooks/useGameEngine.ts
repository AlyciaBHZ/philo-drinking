import { useCallback, useEffect, useMemo, useState } from 'react';
import { getCardsPath, SupportedLanguage } from '../i18n/config';

export interface Card {
  id: string;
  philosopher: string;
  title: string;
  summary: string;
  detail?: string;
  background?: string;
  alt?: string;
  tags: string[];
  level: number;
}

const fisherYatesShuffle = <T,>(items: T[]): T[] => {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useGameEngine = (language: SupportedLanguage) => {
  const [allCards, setAllCards] = useState<Card[]>([]);
  const [deck, setDeck] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const cardLookup = useMemo(() => {
    return allCards.reduce<Record<string, Card>>((acc, card) => {
      acc[card.id] = card;
      return acc;
    }, {});
  }, [allCards]);

  const shuffleDeck = useCallback(() => {
    if (!allCards.length) {
      setDeck([]);
      setHistory([]);
      setCurrentCard(null);
      return;
    }

    const shuffledIds = fisherYatesShuffle(allCards.map((card) => card.id));
    setDeck(shuffledIds);
    setHistory([]);
    setCurrentCard(null);
  }, [allCards]);

  const drawCard = useCallback(() => {
    if (deck.length === 0) {
      shuffleDeck();
      return;
    }

    setDeck((prevDeck) => {
      const nextDeck = [...prevDeck];
      const nextId = nextDeck.pop() as string;

      setHistory((prevHistory) => [...prevHistory, nextId]);
      setCurrentCard(cardLookup[nextId] ?? null);

      return nextDeck;
    });
  }, [cardLookup, deck.length, shuffleDeck]);

  const undoCard = useCallback(() => {
    setHistory((prevHistory) => {
      if (prevHistory.length === 0) {
        return prevHistory;
      }

      const nextHistory = [...prevHistory];
      const lastId = nextHistory.pop() as string;

      setDeck((prevDeck) => [...prevDeck, lastId]);

      const previousId = nextHistory[nextHistory.length - 1];
      setCurrentCard(previousId ? cardLookup[previousId] ?? null : null);

      return nextHistory;
    });
  }, [cardLookup]);

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    const loadCards = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(getCardsPath(language), { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Failed to load cards: ${response.status}`);
        }

        const data: Card[] = await response.json();
        if (cancelled) {
          return;
        }

        setAllCards(data);
        setDeck(fisherYatesShuffle(data.map((card) => card.id)));
        setHistory([]);
        setCurrentCard(null);
      } catch (error) {
        if (cancelled || (error as Error).name === 'AbortError') {
          return;
        }

        console.error('Failed to load cards.json', error);
        setAllCards([]);
        setDeck([]);
        setHistory([]);
        setCurrentCard(null);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadCards();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [language]);

  return {
    currentCard,
    deckCount: deck.length,
    historyCount: history.length,
    isLoading,
    drawCard,
    undoCard,
    shuffleDeck,
  };
};

export type UseGameEngineReturn = ReturnType<typeof useGameEngine>;
