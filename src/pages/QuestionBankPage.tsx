import React, { useState } from 'react';
import { styled } from 'styled-components';
import TopicContainer from '../components/TopicContainer';
import { initialPart1Data, initialPart2Data, CueCardData, AnalysisData } from '../data';

interface QuestionBankPageProps {
    navigateTo: (page: 'home') => void;
}

interface TopicModalProps {
    card: CueCardData;
    onClose: () => void;
}

const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
);

const AnalysisIcon = ({ type }: { type: AnalysisData['type'] }) => {
    const icons: { [key in AnalysisData['type']]: React.ReactElement } = {
        vocab: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>,
        phrase: <svg xmlns="http://www.w.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-3-3-4-6-4S1 2 1 5v8c0 7 4 8 7 8Z"></path><path d="M21 21c-3 0-7-1-7-8V5c0-3 3-4 6-4s5 1 5 4v8c0 7-4 8-7 8Z"></path></svg>,
        sentence: <svg xmlns="http://www.w.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>,
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


const TopicModal: React.FC<TopicModalProps> = ({ card, onClose }) => {
    const [isAnalysisVisible, setIsAnalysisVisible] = useState(false);
    const [activeAnalysisTab, setActiveAnalysisTab] = useState<'answer' | 'analysis'>('answer');

    const handleModalContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const hasSampleAnswers = card.sampleAnswers && card.sampleAnswers.length > 0;
    const hasAnalysis = hasSampleAnswers && card.sampleAnswers.some(s => s.analysis && s.analysis.length > 0);

    return (
        <ModalOverlay onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <ModalContainer onClick={handleModalContentClick}>
                <ModalHeader>
                    <div className="modal-header-content">
                         <ModalHeaderTag>【2025年 9-12月】</ModalHeaderTag>
                         <h2 id="modal-title">{card.title}</h2>
                    </div>
                     {card.status === 'New' && <ModalNewTag>新题</ModalNewTag>}
                    <ModalCloseButton onClick={onClose} aria-label="关闭">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </ModalCloseButton>
                </ModalHeader>
                <ModalContent>
                    <QuestionsSection>
                        <h3>问题列表</h3>
                        <ol>
                            {card.questions?.map((q, index) => (
                                <li key={index}>{q}</li>
                            ))}
                        </ol>
                    </QuestionsSection>
                    
                    {hasSampleAnswers && (
                         <AnswerSection>
                             <ModalActions>
                                <ActionButton isPrimary={false} onClick={() => setIsAnalysisVisible(!isAnalysisVisible)}>
                                    {isAnalysisVisible ? '隐藏解析' : '显示解析'}
                                </ActionButton>
                                <ActionButton isPrimary={true}>立即练习</ActionButton>
                            </ModalActions>
                            {isAnalysisVisible && (
                                <AnalysisContainer>
                                    <AnalysisTabNav>
                                        <AnalysisTabButton $active={activeAnalysisTab === 'answer'} onClick={() => setActiveAnalysisTab('answer')}>参考范文</AnalysisTabButton>
                                        {hasAnalysis && <AnalysisTabButton $active={activeAnalysisTab === 'analysis'} onClick={() => setActiveAnalysisTab('analysis')}>范文精讲</AnalysisTabButton>}
                                    </AnalysisTabNav>
                                    
                                    {activeAnalysisTab === 'answer' && (
                                        <AnswerContent>
                                            <h4>参考范文 (IELTS 5.5)</h4>
                                            <div>
                                                {card.sampleAnswers?.map((qa, index) => (
                                                    <QAPair key={index}>
                                                        <AnswerQuestion>{index + 1}. {qa.question}</AnswerQuestion>
                                                        <AnswerText>{qa.answer}</AnswerText>
                                                    </QAPair>
                                                ))}
                                            </div>
                                        </AnswerContent>
                                    )}

                                    {activeAnalysisTab === 'analysis' && hasAnalysis && (
                                        <AnswerContent>
                                            <h4>范文精讲 (IELTS 5.5)</h4>
                                            <div>
                                                {card.sampleAnswers?.map((qa, index) => (
                                                    <QAPairAnalysis key={index}>
                                                        <AnswerQuestion>{index + 1}. {qa.question}</AnswerQuestion>
                                                        <AnalyzedText answer={qa.answer} analysis={qa.analysis || []} />
                                                        {qa.analysis && qa.analysis.length > 0 && (
                                                            <AnalysisDetailsGrid>
                                                                {qa.analysis.map((item, idx) => (
                                                                    <AnalysisDetailCard key={idx} item={item} />
                                                                ))}
                                                            </AnalysisDetailsGrid>
                                                        )}
                                                    </QAPairAnalysis>
                                                ))}
                                            </div>
                                        </AnswerContent>
                                    )}
                                </AnalysisContainer>
                            )}
                        </AnswerSection>
                    )}
                </ModalContent>
                 <ModalFooter>
                    <SecondaryButton>我要补充</SecondaryButton>
                </ModalFooter>
            </ModalContainer>
        </ModalOverlay>
    );
};

const AnalysisDetailCard: React.FC<{ item: AnalysisData }> = ({ item }) => (
    <AnalysisCardWrapper type={item.type}>
        <AnalysisCardHeader>
            <AnalysisIcon type={item.type} />
            <AnalysisCardText>{item.text}</AnalysisCardText>
        </AnalysisCardHeader>
        <AnalysisCardExplanation>
            {item.explanation}
        </AnalysisCardExplanation>
    </AnalysisCardWrapper>
);

const QuestionBankPage: React.FC<QuestionBankPageProps> = ({ navigateTo }) => {
    const [activePage, setActivePage] = useState<'part1' | 'part2'>('part1');
    const [selectedCard, setSelectedCard] = useState<CueCardData | null>(null);

    const handleCardClick = (card: CueCardData) => {
        setSelectedCard(card);
    };

    const handleCloseModal = () => {
        setSelectedCard(null);
    };

    return (
        <>
            <Header>
                <HeaderBackButton onClick={() => navigateTo('home')} aria-label="返回主页">
                    <BackArrowIcon />
                    <span>返回</span>
                </HeaderBackButton>
                <h1>雅思口语 2025 年 9-12 月题库</h1>
                <Nav>
                    <NavButton 
                        $active={activePage === 'part1'}
                        onClick={() => setActivePage('part1')}>
                        Part1
                    </NavButton>
                    <NavButton 
                        $active={activePage === 'part2'}
                        onClick={() => setActivePage('part2')}>
                        Part2+3
                    </NavButton>
                </Nav>
            </Header>

            <div id="page-part1" className={activePage === 'part1' ? '' : 'hidden'}>
                <TopicContainer 
                    key="part1" 
                    initialTopics={initialPart1Data} 
                    onCardClick={handleCardClick} 
                />
            </div>

            <div id="page-part2" className={activePage === 'part2' ? '' : 'hidden'}>
                <TopicContainer 
                    key="part2" 
                    initialTopics={initialPart2Data} 
                    onCardClick={handleCardClick} 
                />
            </div>

            {selectedCard && <TopicModal card={selectedCard} onClose={handleCloseModal} />}
        </>
    );
};

// Styled Components
const Header = styled.header`
    text-align: center;
    margin-bottom: 3rem;
    position: relative;
    h1 {
        font-size: 2.5rem;
        font-weight: 700;
        color: ${({ theme }) => theme.colors.header};
    }
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        margin-bottom: 2rem;
        h1 {
            font-size: 2rem;
        }
    }
`;

const Nav = styled.nav`
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
`;

const NavButton = styled.button<{ $active?: boolean }>`
    font-family: inherit;
    font-size: 1rem;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    border-radius: 9999px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    background-color: ${({ theme }) => theme.colors.cardBg};
    color: ${({ theme }) => theme.colors.label};
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;

    &:hover {
        background-color: ${({ theme }) => theme.colors.boxBg};
        color: ${({ theme }) => theme.colors.header};
    }

    ${({ $active, theme }) => $active && `
        background-color: ${theme.colors.header};
        color: white;
        border-color: ${theme.colors.header};
    `}
     @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 0.6rem 1.2rem;
        font-size: 0.9rem;
    }
`;

const BackButton = styled.button`
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
`;

const HeaderBackButton = styled(BackButton)`
    position: absolute;
    top: 10px;
    left: 0;
    transform: none;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        position: static;
        margin: 0 auto 1.5rem auto;
    }
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease;
`;

const ModalContainer = styled.div`
    background-color: #f0f3f8;
    border-radius: 24px;
    width: 90%;
    max-width: 700px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    animation: slideIn 0.3s ease-out;
    overflow: hidden;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        width: 100%;
        max-width: 100vw;
        height: 100%;
        max-height: 100vh;
        border-radius: 0;
        animation: slideInMobile 0.35s ease-out;
    }
`;

const ModalHeader = styled.header`
    background: linear-gradient(135deg, #4a90e2, #2e6ab8);
    color: white;
    padding: 1rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    flex-shrink: 0;

    .modal-header-content {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        flex-grow: 1;
    }

    h2 {
        font-size: 1.75rem;
        font-weight: 700;
        margin: 0;
        line-height: 1.2;
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 1rem;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        h2 {
            font-size: 1.25rem;
        }
    }
`;

const ModalHeaderTag = styled.div`
    font-size: 0.8rem;
    font-weight: 500;
    opacity: 0.8;
`;

const ModalNewTag = styled.span`
    background-color: ${({ theme }) => theme.colors.primaryOrange};
    color: white;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    align-self: flex-start;
    margin-left: 1rem;
`;

const ModalCloseButton = styled.button`
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: background-color 0.2s;
    opacity: 0.8;
    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
        opacity: 1;
    }
`;

const ModalContent = styled.main`
    padding: 1.5rem;
    overflow-y: auto;
    flex-grow: 1;
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 1rem;
    }
`;

const QuestionsSection = styled.section`
    background-color: ${({ theme }) => theme.colors.cardBg};
    padding: 1.5rem;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

    h3 {
        margin: 0 0 1rem 0;
        font-size: 1.1rem;
        font-weight: 700;
        color: #4a90e2;
        padding-left: 0.75rem;
        border-left: 4px solid #4a90e2;
    }
    ol {
        margin: 0;
        padding-left: 1.5rem;
        list-style-type: decimal;
        color: ${({ theme }) => theme.colors.text};
    }
    li {
        margin-bottom: 0.75rem;
        line-height: 1.6;
    }
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 1rem;
    }
`;

const AnswerSection = styled.section`
    margin-top: 1.5rem;
`;

const AnalysisContainer = styled.div`
    margin-top: 1.5rem;
    animation: fadeIn 0.4s ease;
`;

const AnalysisTabNav = styled.nav`
    display: flex;
    gap: 0.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    margin-bottom: 1.5rem;
`;

const AnalysisTabButton = styled.button<{ $active?: boolean }>`
    font-family: inherit;
    font-size: 1rem;
    font-weight: 600;
    padding: 0.75rem 0.5rem;
    border: none;
    background: none;
    cursor: pointer;
    color: ${({ theme, $active }) => $active ? theme.colors.header : theme.colors.label};
    border-bottom: 3px solid ${({ theme, $active }) => $active ? theme.colors.primaryBlue : 'transparent'};
    margin-bottom: -1px;
    transition: all 0.2s ease;

    &:hover {
        color: ${({ theme }) => theme.colors.header};
    }
`;

const AnswerContent = styled.div`
    background-color: ${({ theme }) => theme.colors.cardBg};
    border: 1px solid ${({ theme }) => theme.colors.border};
    padding: 1.5rem;
    border-radius: 16px;

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

const QAPair = styled.div`
    margin-bottom: 1.25rem;
    &:last-child {
        margin-bottom: 0;
    }
`;

const QAPairAnalysis = styled(QAPair)`
    border-bottom: 1px dashed ${({ theme }) => theme.colors.border};
    padding-bottom: 1.5rem;
`;

const AnswerQuestion = styled.p`
    font-weight: 600;
    color: ${({ theme }) => theme.colors.header};
    margin: 0 0 0.5rem 0;
    line-height: 1.5;
`;

const AnswerText = styled.p`
    margin: 0;
    line-height: 1.7;
    color: #34495e;
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


const ModalActions = styled.div`
    display: flex;
    gap: 1rem;
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        flex-direction: column;
    }
`;

const ActionButton = styled.button<{ isPrimary: boolean }>`
    flex: 1;
    padding: 0.8rem 1rem;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    background-color: ${({ theme, isPrimary }) => isPrimary ? theme.colors.primaryBlue : theme.colors.primaryOrange};
    color: white;

    &:hover {
        background-color: ${({ theme, isPrimary }) => isPrimary ? '#3a7ac2' : '#e88f33'};
    }
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 1rem;
    }
`;

const ModalFooter = styled.footer`
    padding: 1rem 1.5rem;
    text-align: center;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    flex-shrink: 0;
    background-color: #f0f3f8;
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 0.75rem 1rem;
    }
`;

const SecondaryButton = styled.button`
    background: none;
    border: none;
    color: #4a90e2;
    font-weight: 600;
    cursor: pointer;
    font-size: 0.9rem;
    &:hover {
        text-decoration: underline;
    }
`;

export default QuestionBankPage;