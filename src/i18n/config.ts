export type SupportedLanguage = 'zh-CN' | 'en';

export interface LanguageOption {
  value: SupportedLanguage;
  label: string;
  cardsPath: string;
}

interface UiCopy {
  selectThemeLabel: string;
  collapseBackground: string;
  viewBackground: string;
  alcoholVersion: string;
  soberVersion: string;
  loadingHeadline: string;
  idleHeadline: string;
  loadingSubhead: string;
  idleSubhead: string;
  cardsRemaining: (count: number) => string;
  shuffleInProgress: string;
  drawCard: string;
  languageTrigger: string;
  languagePlaceholder: string;
  // Header
  brandLink: string;
  themeSwitcher: string;
  githubLink: string;
  languageSelector: string;
  reshuffleButton: string;
}

export const LANGUAGE_STORAGE_KEY = 'philo:language';

export const languageOptions: LanguageOption[] = [
  {
    value: 'zh-CN',
    label: '简体中文',
    cardsPath: '/cards.json',
  },
  {
    value: 'en',
    label: 'English',
    cardsPath: '/cards.en.json',
  },
];

const languageMap = languageOptions.reduce<Record<SupportedLanguage, LanguageOption>>((acc, option) => {
  acc[option.value] = option;
  return acc;
}, {} as Record<SupportedLanguage, LanguageOption>);

export const translations: Record<SupportedLanguage, UiCopy> = {
  'zh-CN': {
    selectThemeLabel: '选择主题',
    collapseBackground: '收起背景',
    viewBackground: '查看哲学背景',
    alcoholVersion: '🍺 酒精版本',
    soberVersion: '🥤 无酒精版本',
    loadingHeadline: '正在加载卡片...',
    idleHeadline: '准备好挑战哲学派对了吗？',
    loadingSubhead: '请稍候，正在读取卡片内容。',
    idleSubhead: '点击下方按钮抽取你的命运。',
    cardsRemaining: (count) => '剩余 ' + count + ' 张卡片',
    shuffleInProgress: '自动洗牌中',
    drawCard: '抽卡',
    languageTrigger: '语言',
    languagePlaceholder: '选择语言',
    // Header
    brandLink: '返回主页',
    themeSwitcher: '切换主题',
    githubLink: 'GitHub 仓库',
    languageSelector: '切换语言',
    reshuffleButton: '重新洗牌',
  },
  en: {
    selectThemeLabel: 'Choose Theme',
    collapseBackground: 'Hide Background',
    viewBackground: 'See Philosophical Background',
    alcoholVersion: '🍺 Classic Mode',
    soberVersion: '🥤 Alcohol-Free Mode',
    loadingHeadline: 'Loading your deck...',
    idleHeadline: 'Ready to spark a philosophical party?',
    loadingSubhead: 'Hang tight while we prepare every card.',
    idleSubhead: 'Tap the button below to draw your fate.',
    cardsRemaining: (count) => (count === 1 ? '1 card left' : count + ' cards left'),
    shuffleInProgress: 'Shuffling Automatically',
    drawCard: 'Draw a Card',
    languageTrigger: 'Language',
    languagePlaceholder: 'Select a language',
    // Header
    brandLink: 'Back to Homepage',
    themeSwitcher: 'Change Theme',
    githubLink: 'GitHub Repository',
    languageSelector: 'Change Language',
    reshuffleButton: 'Reshuffle Deck',
  },
};

export const getCardsPath = (language: SupportedLanguage): string => {
  return languageMap[language]?.cardsPath ?? languageMap['zh-CN'].cardsPath;
};

export const isSupportedLanguage = (value: string | null): value is SupportedLanguage => {
  return value === 'zh-CN' || value === 'en';
};
