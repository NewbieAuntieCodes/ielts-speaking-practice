import React, { useState, useEffect, useCallback, useRef } from 'react';
// FIX: Removed a redundant `import 'styled-components';` statement that was causing a module augmentation error.
import { styled, createGlobalStyle, ThemeProvider } from 'styled-components';
import HomePage from './pages/HomePage';
import QuestionBankPage from './pages/QuestionBankPage';
import TipsPage from './pages/TipsPage';
import AnalysisPage from './pages/AnalysisPage';
import { Page } from './types';
import { CueCardData } from './data';
import Toast from './components/Toast';
import VocabularyFab from './components/VocabularyFab';
import VocabularyModal from './components/VocabularyModal';
import SelectionAddButton from './components/SelectionAddButton';

const theme = {
    colors: {
        bg: '#eef5f9',
        cardBg: '#ffffff',
        boxBg: '#e9eef2',
        cardYellowBg: '#fefbed',
        text: '#333',
        header: '#1a2533',
        border: '#d1d9e0',
        shadow: 'rgba(0, 0, 0, 0.08)',
        dragOverBorder: '#3498db',
        label: '#8899a6',
        primaryBlue: '#4a90e2',
        primaryOrange: '#ff9f43',
        highlightBg: '#e9f2ff',
        highlightBorder: '#c7dfff',

        person: '#f1c40f',
        event: '#1d93e2',
        place: '#2ecc71',
        object: '#9b59b6',
        newTag: '#ff9f43',

        personBg: 'rgba(241, 196, 15, 0.15)',
        eventBg: 'rgba(29, 147, 226, 0.15)',
        placeBg: 'rgba(46, 204, 113, 0.15)',
        objectBg: 'rgba(155, 89, 182, 0.15)',
        
        personText: '#b49100',
        placeText: '#208e4c',

        what: '#3498db',
        where: '#2ecc71',
        when: '#f39c12',
        why: '#9b59b6',
        whyNot: '#e74c3c',
        how: '#e67e22',
        who: '#1abc9c',

        point: '#3498db',
        reason: '#e67e22',
        example: '#27ae60',

        analysisVocab: '#3498db',
        analysisPhrase: '#e67e22',
        analysisSentence: '#27ae60',
        analysisVocabBg: 'rgba(52, 152, 219, 0.1)',
        analysisPhraseBg: 'rgba(230, 126, 34, 0.1)',
        analysisSentenceBg: 'rgba(39, 174, 96, 0.1)',
    },
    fonts: {
        body: "'Noto Sans', sans-serif",
    },
    breakpoints: {
        mobile: '768px',
    }
};

// FIX: Add module declaration for `styled-components` to provide strong typing for the theme object.
// This resolves numerous TypeScript errors where theme properties (e.g., `colors`, `breakpoints`) 
// were not found on the `DefaultTheme` type.
type ThemeType = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}

const GlobalStyles = createGlobalStyle`
    body {
        background-color: ${({ theme }) => theme.colors.bg};
        color: ${({ theme }) => theme.colors.text};
        margin: 0;
        font-family: ${({ theme }) => theme.fonts.body};
        font-size: 16px;
        line-height: 1.6;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .hidden {
        display: none;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes slideIn {
        from { transform: translateY(-30px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes slideInMobile {
        from { transform: translateY(100%); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
`;

const AppWrapper = styled.div`
    padding: 2rem;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 1rem;
    }
`;

const App: React.FC = () => {
    const [page, setPage] = useState<Page>('home');
    const [analysisCard, setAnalysisCard] = useState<CueCardData | null>(null);

    // State for vocabulary feature
    const [vocabulary, setVocabulary] = useState<string[]>([]);
    const [isVocabModalOpen, setIsVocabModalOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    // State for selection add button
    const [selectedWord, setSelectedWord] = useState<string | null>(null);
    const [selectionPosition, setSelectionPosition] = useState<{ top: number, left: number } | null>(null);
    const debounceTimeoutRef = useRef<number | null>(null);

    // Load vocab from localStorage on mount
    useEffect(() => {
        try {
            const storedVocab = localStorage.getItem('ielts-vocabulary');
            if (storedVocab) {
                setVocabulary(JSON.parse(storedVocab));
            }
        } catch (error) {
            console.error("Failed to parse vocabulary from localStorage", error);
            localStorage.removeItem('ielts-vocabulary');
        }
    }, []);

    // Save vocab to localStorage on change
    useEffect(() => {
        try {
            if (vocabulary.length > 0) {
                 localStorage.setItem('ielts-vocabulary', JSON.stringify(vocabulary));
            } else {
                 localStorage.removeItem('ielts-vocabulary');
            }
        } catch (error) {
            console.error("Failed to save vocabulary to localStorage", error);
        }
    }, [vocabulary]);

    const showToast = (message: string) => {
        setToastMessage(message);
        setTimeout(() => {
            setToastMessage(prev => (prev === message ? '' : prev));
        }, 3000);
    };
    
    const handleAddWord = useCallback((word: string) => {
        setVocabulary(currentVocab => {
            if (currentVocab.includes(word)) {
                showToast(`“${word}” 已在单词本中`);
                return currentVocab;
            } else {
                showToast(`已添加: “${word}”`);
                return [...currentVocab, word].sort();
            }
        });
        setSelectedWord(null);
    }, []);

    const cleanWord = (text: string): string | null => {
        const word = text.trim().toLowerCase()
            .replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, "")
            .replace(/’s|'s/g, '');
        
        if (word && !word.includes(' ')) {
            return word;
        }
        return null;
    }
    
    const handleDeleteWord = (wordToDelete: string) => {
        setVocabulary(prev => prev.filter(word => word !== wordToDelete));
    };

    const handleClearVocabulary = () => {
        setVocabulary([]);
    };

    // Global listeners for vocabulary features
    useEffect(() => {
        // For desktop: double-click to add
        const handleDoubleClick = () => {
            const selection = window.getSelection();
            if (selection) {
                const word = cleanWord(selection.toString());
                if (word) {
                    handleAddWord(word);
                }
            }
        };

        // For mobile: show add button on text selection
        const handleMouseUp = () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
            debounceTimeoutRef.current = window.setTimeout(() => {
                const selection = window.getSelection();
                if (selection && !selection.isCollapsed) {
                    const word = cleanWord(selection.toString());
                    if (word) {
                        const range = selection.getRangeAt(0);
                        const rect = range.getBoundingClientRect();
                        setSelectionPosition({
                            top: rect.top + window.scrollY - 40,
                            left: rect.left + window.scrollX + rect.width / 2,
                        });
                        setSelectedWord(word);
                    } else {
                        setSelectedWord(null);
                    }
                }
            }, 100); // Small debounce
        };

        const handleInteractionStart = () => {
            setSelectedWord(null);
        };
        
        document.addEventListener('dblclick', handleDoubleClick);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('touchend', handleMouseUp);
        document.addEventListener('mousedown', handleInteractionStart);
        document.addEventListener('touchstart', handleInteractionStart);
        window.addEventListener('scroll', handleInteractionStart);

        return () => {
            document.removeEventListener('dblclick', handleDoubleClick);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchend', handleMouseUp);
            document.removeEventListener('mousedown', handleInteractionStart);
            document.removeEventListener('touchstart', handleInteractionStart);
            window.removeEventListener('scroll', handleInteractionStart);
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, [handleAddWord]);

    const navigateTo = (targetPage: Page) => {
        window.scrollTo(0, 0); // Scroll to top on page change
        setPage(targetPage);
        if (targetPage !== 'analysis') {
            setAnalysisCard(null);
        }
    };

    const navigateToAnalysis = (card: CueCardData) => {
        setAnalysisCard(card);
        navigateTo('analysis');
    };

    const renderPage = () => {
        switch (page) {
            case 'bank':
                return <QuestionBankPage navigateTo={() => navigateTo('home')} navigateToAnalysis={navigateToAnalysis} />;
            case 'tips':
                return <TipsPage navigateTo={() => navigateTo('home')} />;
            case 'analysis':
                if (analysisCard) {
                    return <AnalysisPage 
                                card={analysisCard} 
                                navigateTo={() => navigateTo('bank')}
                                handleAddWord={handleAddWord}
                                cleanWord={cleanWord}
                            />;
                }
                 // Fallback to bank page if card is not set
                return <QuestionBankPage navigateTo={() => navigateTo('home')} navigateToAnalysis={navigateToAnalysis} />;
            case 'home':
            default:
                return <HomePage navigateTo={navigateTo} />;
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <AppWrapper>{renderPage()}</AppWrapper>

            {/* Vocabulary Feature Components */}
            {selectedWord && selectionPosition && (
                <SelectionAddButton
                    position={selectionPosition}
                    onAdd={() => handleAddWord(selectedWord)}
                />
            )}
            <VocabularyFab count={vocabulary.length} onClick={() => setIsVocabModalOpen(true)} />
            {isVocabModalOpen && (
                <VocabularyModal
                    words={vocabulary}
                    onClose={() => setIsVocabModalOpen(false)}
                    onDelete={handleDeleteWord}
                    onClear={handleClearVocabulary}
                />
            )}
            <Toast message={toastMessage} />
        </ThemeProvider>
    );
};

export default App;