import React, { useState } from 'react';
import { styled, keyframes } from 'styled-components';
import { CueCardData, AnalysisData } from '../data';

interface AnalysisPageProps {
    card: CueCardData;
    navigateTo: (page: 'bank') => void;
    handleAddWord: (word: string) => void;
    cleanWord: (text: string) => string | null;
}

const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
);

const AnalysisIcon = ({ type }: { type: AnalysisData['type'] }) => {
    const icons: { [key in AnalysisData['type']]: React.ReactElement } = {
        vocab: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>,
        phrase: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-3-3-4-6-4S1 2 1 5v8c0 7 4 8 7 8Z"></path><path d="M21 21c-3 0-7-1-7-8V5c0-3 3-4 6-4s5 1 5 4v8c0 7-4 8-7 8Z"></path></svg>,
        sentence: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>,
    };
    return <AnalysisIconWrapper type={type}>{icons[type]}</AnalysisIconWrapper>;
}

// Helper to safely create a regex for splitting
function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const AnalyzedText: React.FC<{ answer: string; analysis: AnalysisData[] }> = ({ answer, analysis }) => {
    if (!analysis || analysis.length === 0) {
        return <p>{answer}</p>;
    }

    const analysisMap = new Map<string, AnalysisData>();
    analysis.forEach(item => analysisMap.set(item.text, item));

    const regex = new RegExp(`(${analysis.map(item => escapeRegExp(item.text)).join('|')})`, 'g');
    const parts = answer.split(regex).filter(part => part);

    return (
        <AnalyzedAnswerContainer>
            {parts.map((part, index) => {
                const analysisItem = analysisMap.get(part);
                if (analysisItem) {
                    return <Highlight key={index} type={analysisItem.type}>{part}</Highlight>;
                }
                return <span key={index}>{part}</span>;
            })}
        </AnalyzedAnswerContainer>
    );
};

// FIX: Added quotes to SVG properties to resolve TypeScript errors where values were being interpreted as variables instead of strings.
const AddIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;

const AnalysisDetailCard: React.FC<{ item: AnalysisData; handleAddWord: (word: string) => void; cleanWord: (text: string) => string | null; }> = ({ item, handleAddWord, cleanWord }) => {
    
    const handleAddClick = () => {
        const wordToAdd = cleanWord(item.text);
        if (wordToAdd) {
            handleAddWord(wordToAdd);
        }
    };

    return (
        <AnalysisCardWrapper type={item.type}>
            <AnalysisCardHeader>
                <AnalysisIcon type={item.type} />
                <AnalysisCardText>{item.text}</AnalysisCardText>
                {item.type === 'vocab' && <AddButton onClick={handleAddClick} aria-label={`添加单词 ${item.text}`}><AddIcon /></AddButton>}
            </AnalysisCardHeader>
            <AnalysisCardExplanation>
                {item.explanation}
            </AnalysisCardExplanation>
        </AnalysisCardWrapper>
    );
};

const AnalysisPage: React.FC<AnalysisPageProps> = ({ card, navigateTo, handleAddWord, cleanWord }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const hasSampleAnswers = card.sampleAnswers && card.sampleAnswers.length > 0;
    const totalAnswers = hasSampleAnswers ? card.sampleAnswers!.length : 0;

    const handleNext = () => {
        if (currentIndex < totalAnswers - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };
    
    const currentQA = hasSampleAnswers ? card.sampleAnswers![currentIndex] : null;

    return (
        <PageContainer>
            <PageHeader>
                <BackButton onClick={() => navigateTo('bank')} aria-label="返回题库">
                    <BackArrowIcon />
                    <span>返回题库</span>
                </BackButton>
                <h1>{card.title}</h1>
            </PageHeader>
            <main>
                {currentQA ? (
                    <AnswerContent>
                        <h4>范文精讲 (IELTS 5.5)</h4>
                        <QAPairWrapper key={currentIndex}>
                            <QAPairAnalysis>
                                <AnswerQuestion>{currentIndex + 1}. {currentQA.question}</AnswerQuestion>
                                <AnalyzedText answer={currentQA.answer} analysis={currentQA.analysis || []} />
                                {currentQA.analysis && currentQA.analysis.length > 0 && (
                                    <AnalysisDetailsGrid>
                                        {currentQA.analysis.map((item, idx) => (
                                            <AnalysisDetailCard 
                                                key={idx} 
                                                item={item} 
                                                handleAddWord={handleAddWord}
                                                cleanWord={cleanWord}
                                            />
                                        ))}
                                    </AnalysisDetailsGrid>
                                )}
                            </QAPairAnalysis>
                        </QAPairWrapper>

                        {totalAnswers > 1 && (
                            <NavigationControls>
                                <NavButton onClick={handlePrev} disabled={currentIndex === 0}>
                                    上一题
                                </NavButton>
                                <ProgressIndicator>
                                    {currentIndex + 1} / {totalAnswers}
                                </ProgressIndicator>
                                <NavButton onClick={handleNext} disabled={currentIndex === totalAnswers - 1}>
                                    下一题
                                </NavButton>
                            </NavigationControls>
                        )}
                    </AnswerContent>
                ) : (
                    <p>暂无范文解析。</p>
                )}
            </main>
        </PageContainer>
    );
};

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateX(15px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const PageContainer = styled.div`
    max-width: 900px;
    margin: 0 auto;
    animation: fadeIn 0.5s ease;
`;

const PageHeader = styled.header`
    position: relative;
    text-align: center;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
        margin: 0;
        font-size: 2rem;
        font-weight: 700;
        color: ${({ theme }) => theme.colors.header};
    }
    
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        margin-bottom: 2rem;
        h1 {
            font-size: 1.5rem;
            margin: 0 3.5rem; /* Space for back button */
        }
    }
`;

const BackButton = styled.button`
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: ${({ theme }) => theme.colors.boxBg};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 9999px;
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.label};
    cursor: pointer;
    transition: all 0.2s ease;

    svg {
        width: 20px;
        height: 20px;
    }

    &:hover {
        background-color: ${({ theme }) => theme.colors.border};
        color: ${({ theme }) => theme.colors.header};
    }
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 0.6rem;
        gap: 0;
        span {
            display: none;
        }
    }
`;

const AnswerContent = styled.div`
    background-color: ${({ theme }) => theme.colors.cardBg};
    border: 1px solid ${({ theme }) => theme.colors.border};
    padding: 1.5rem;
    border-radius: 16px;
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};

    h4 {
        margin: 0 0 1rem 0;
        font-size: 1rem;
        font-weight: 600;
        color: #2e6ab8;
    }
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 1rem;
    }
`;

const QAPairWrapper = styled.div`
    animation: ${fadeInAnimation} 0.4s ease-out;
`;

const QAPairAnalysis = styled.div`
    /* Previously had border and margin, now it's just a container */
`;

const AnswerQuestion = styled.p`
    font-weight: 600;
    color: ${({ theme }) => theme.colors.header};
    margin: 0 0 0.5rem 0;
    line-height: 1.5;
`;

const AnalyzedAnswerContainer = styled.p`
    margin: 0;
    line-height: 1.8;
    color: #34495e;
`;

const Highlight = styled.span<{ type: AnalysisData['type'] }>`
    background-color: ${({ theme, type }) => theme.colors[`analysis${type.charAt(0).toUpperCase() + type.slice(1)}Bg` as keyof typeof theme.colors]};
    border-bottom: 2px solid ${({ theme, type }) => theme.colors[`analysis${type.charAt(0).toUpperCase() + type.slice(1)}` as keyof typeof theme.colors]};
    border-radius: 3px 3px 0 0;
    padding: 0.1em 0.2em;
    font-weight: 500;
`;

const AnalysisDetailsGrid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1.25rem;
`;

const AnalysisCardWrapper = styled.div<{ type: AnalysisData['type'] }>`
    background-color: ${({ theme }) => theme.colors.bg};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-left: 4px solid ${({ theme, type }) => theme.colors[`analysis${type.charAt(0).toUpperCase() + type.slice(1)}` as keyof typeof theme.colors]};
    border-radius: 8px;
    padding: 0.75rem 1rem;
`;

const AnalysisCardHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
`;

const AnalysisIconWrapper = styled.div<{ type: AnalysisData['type'] }>`
    color: ${({ theme, type }) => theme.colors[`analysis${type.charAt(0).toUpperCase() + type.slice(1)}` as keyof typeof theme.colors]};
    svg {
        width: 20px;
        height: 20px;
    }
`;

const AnalysisCardText = styled.div`
    font-weight: 600;
    color: ${({ theme }) => theme.colors.header};
    font-size: 1rem;
`;

const AnalysisCardExplanation = styled.div`
    font-size: 0.95rem;
    color: #34495e;
    line-height: 1.6;
    padding-left: calc(20px + 0.75rem);
`;

const AddButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    margin-left: auto;
    padding: 0.25rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.label};
    transition: background-color 0.2s ease, color 0.2s ease;

    &:hover {
        background-color: ${({ theme }) => theme.colors.highlightBg};
        color: ${({ theme }) => theme.colors.primaryBlue};
    }

    svg {
        width: 18px;
        height: 18px;
    }
`;

const NavigationControls = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const NavButton = styled.button`
    background-color: ${({ theme }) => theme.colors.primaryBlue};
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 9999px;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.2s ease, opacity 0.2s ease;

    &:hover:not(:disabled) {
        background-color: #3a7ac2;
    }

    &:disabled {
        background-color: ${({ theme }) => theme.colors.border};
        color: ${({ theme }) => theme.colors.label};
        cursor: not-allowed;
    }
`;

const ProgressIndicator = styled.div`
    font-weight: 600;
    color: ${({ theme }) => theme.colors.label};
    font-size: 1rem;
    font-variant-numeric: tabular-nums;
`;

export default AnalysisPage;