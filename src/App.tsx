import React, { useState } from 'react';
import { styled, ThemeProvider } from 'styled-components';
import { Page } from './types';
import { CueCardData } from './data';
import Toast from './components/Toast';
import VocabularyFab from './components/VocabularyFab';
import VocabularyModal from './components/VocabularyModal';
import SelectionAddButton from './components/SelectionAddButton';
import PageRouter from './components/PageRouter';

import { theme, GlobalStyles } from './theme';
import { useVocabulary } from './hooks/useVocabulary';

const AppWrapper = styled.div`
    padding: 2rem;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 1rem;
    }
`;

const App: React.FC = () => {
    const [page, setPage] = useState<Page>('home');
    const [analysisCard, setAnalysisCard] = useState<CueCardData | null>(null);

    const {
        vocabulary,
        isVocabModalOpen,
        toastMessage,
        selectedWord,
        selectionPosition,
        setIsVocabModalOpen,
        handleAddWord,
        handleDeleteWord,
        handleClearVocabulary,
        cleanWord,
    } = useVocabulary();
    
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

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <AppWrapper>
                <PageRouter 
                    page={page}
                    analysisCard={analysisCard}
                    navigateTo={navigateTo}
                    navigateToAnalysis={navigateToAnalysis}
                    handleAddWord={handleAddWord}
                    cleanWord={cleanWord}
                />
            </AppWrapper>

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
