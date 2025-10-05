import React from 'react';
import HomePage from '../pages/HomePage';
import QuestionBankPage from '../pages/QuestionBankPage';
import TipsPage from '../pages/TipsPage';
import AnalysisPage from '../pages/AnalysisPage';
import ScoringPage from '../pages/ScoringPage';
import { Page } from '../types';
import { CueCardData } from '../data';

interface PageRouterProps {
    page: Page;
    analysisCard: CueCardData | null;
    navigateTo: (page: Page) => void;
    navigateToAnalysis: (card: CueCardData) => void;
    handleAddWord: (word: string) => void;
    cleanWord: (text: string) => string | null;
}

const PageRouter: React.FC<PageRouterProps> = ({ 
    page, 
    analysisCard, 
    navigateTo, 
    navigateToAnalysis,
    handleAddWord,
    cleanWord
}) => {
    switch (page) {
        case 'bank':
            return <QuestionBankPage navigateTo={() => navigateTo('home')} navigateToAnalysis={navigateToAnalysis} />;
        case 'tips':
            return <TipsPage navigateTo={() => navigateTo('home')} />;
        case 'scoring':
            return <ScoringPage navigateTo={() => navigateTo('home')} />;
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

export default PageRouter;
