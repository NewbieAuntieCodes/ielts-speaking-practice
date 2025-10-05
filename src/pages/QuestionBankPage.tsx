import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import TopicContainer from '../components/TopicContainer';
import { initialPart1Data, initialPart2Data, CueCardData } from '../data';

interface QuestionBankPageProps {
    navigateTo: (page: 'home') => void;
    navigateToAnalysis: (card: CueCardData) => void;
}

interface TopicModalProps {
    card: CueCardData;
    onClose: () => void;
    navigateToAnalysis: (card: CueCardData) => void;
}

// FIX: Self-closed SVG elements (<line>, <polyline>) to be valid JSX.
const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
    </svg>
);

// FIX: Self-closed SVG elements (<circle>, <line>) to be valid JSX.
const HelmIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="3" />
        <line x1="12" y1="2" x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="22" />
        <line x1="2" y1="12" x2="5" y2="12" />
        <line x1="19" y1="12" x2="22" y2="12" />
        <line x1="4.93" y1="4.93" x2="7.05" y2="7.05" />
        <line x1="16.95" y1="16.95" x2="19.07" y2="19.07" />
        <line x1="4.93" y1="19.07" x2="7.05" y2="16.95" />
        <line x1="16.95" y1="7.05" x2="19.07" y2="4.93" />
    </svg>
);

// FIX: Self-closed SVG <polyline> element to be valid JSX.
const PrevIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>;
// FIX: Self-closed SVG <polyline> element to be valid JSX.
const NextIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>;


const TopicModal: React.FC<TopicModalProps> = ({ card, onClose, navigateToAnalysis }) => {
    const [currentView, setCurrentView] = useState<'part2' | 'part3'>('part2');

    // Reset view to Part 2 when the card changes, ensuring a fresh start.
    useEffect(() => {
        setCurrentView('part2');
    }, [card.id]);

    const handleModalContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const handleAnalysisClick = () => {
        // P2+3 cards currently don't have sample answers, so this button is for future use.
        // For P1 cards, it will navigate to the analysis page.
        if (card.sampleAnswers && card.sampleAnswers.length > 0) {
            onClose();
            navigateToAnalysis(card);
        }
    };

    const isPart2Card = !!card.part2Title;
    
    // Part 2+3 Card Layout
    if (isPart2Card) {
        return (
            <ModalOverlay onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title-p2">
                 <ModalContainerP2 onClick={handleModalContentClick}>
                     <HeaderP2>
                        <BackButtonP2 
                            onClick={currentView === 'part2' ? onClose : () => setCurrentView('part2')} 
                            aria-label={currentView === 'part2' ? "返回" : "返回 Part 2"}
                        >
                            <BackArrowIcon />
                        </BackButtonP2>
                        <h3>{currentView === 'part2' ? 'P2 题卡' : 'P3 题卡'}</h3>
                        {/* FIX: Self-closed SVG <path> elements to be valid JSX. */}
                        <RefreshButtonP2 aria-label="刷新"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6" /><path d="M1 20v-6h6" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L20.5 10a5 5 0 0 0-7.82 5.42L11 17.5" /></svg></RefreshButtonP2>
                     </HeaderP2>
                     <ContentP2>
                        <CardWrapper>
                             <Sidebar>
                                <HelmIcon />
                                <DateText>【2025年 9-12月】</DateText>
                             </Sidebar>
                             <MainContent>
                                {card.status === 'New' && <NewTag>新题</NewTag>}
                                
                                <CardTitle id="modal-title-p2">{card.title}</CardTitle>
                                
                                {currentView === 'part2' && (
                                    <PartSection>
                                        <PartLabel>Part 2</PartLabel>
                                        <Part2Title>{card.part2Title}</Part2Title>
                                        <p><strong>{card.part2Description}</strong></p>
                                        <Part2Prompts>
                                            {card.part2Prompts?.map((prompt, i) => <li key={i}>{prompt}</li>)}
                                        </Part2Prompts>
                                    </PartSection>
                                )}

                                {currentView === 'part3' && (
                                    <PartSection>
                                        <PartLabel>Part 3</PartLabel>
                                        <Part3Questions>
                                             {card.part3Questions?.map((q, i) => <li key={i}>{q}</li>)}
                                        </Part3Questions>
                                    </PartSection>
                                )}
                             </MainContent>
                        </CardWrapper>
                     </ContentP2>
                     <FooterP2>
                        <PrevNextNav>
                             <button disabled><PrevIcon /> 上一题</button>
                             <button disabled>下一题 <NextIcon /></button>
                        </PrevNextNav>
                         <MainActions>
                             <ActionButtonOrange onClick={handleAnalysisClick}>参考答案</ActionButtonOrange>
                             {currentView === 'part2' ? (
                                <ActionButtonBlue onClick={() => setCurrentView('part3')}>查看 Part 3 问题</ActionButtonBlue>
                             ) : (
                                <ActionButtonBlue>立即练习</ActionButtonBlue>
                             )}
                         </MainActions>
                         <SupplementaryAction>我要补充</SupplementaryAction>
                     </FooterP2>
                 </ModalContainerP2>
            </ModalOverlay>
        );
    }

    // Default Part 1 Card Layout
    const hasSampleAnswers = card.sampleAnswers && card.sampleAnswers.length > 0;
    return (
        <ModalOverlay onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title-p1">
            <ModalContainerP1 onClick={handleModalContentClick}>
                <ModalHeaderP1>
                    <div className="modal-header-content">
                         <ModalHeaderTag>【2025年 9-12月】</ModalHeaderTag>
                         <h2 id="modal-title-p1">{card.title}</h2>
                    </div>
                     {card.status === 'New' && <ModalNewTagP1>新题</ModalNewTagP1>}
                    <ModalCloseButtonP1 onClick={onClose} aria-label="关闭">
                        {/* FIX: Self-closed SVG <line> elements to be valid JSX. */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </ModalCloseButtonP1>
                </ModalHeaderP1>
                <ModalContentP1>
                    <QuestionsSectionP1>
                        <h3>问题列表</h3>
                        <ol>
                            {card.part1Questions?.map((q, index) => (
                                <li key={index}>{q}</li>
                            ))}
                        </ol>
                    </QuestionsSectionP1>
                    
                    {hasSampleAnswers && (
                         <AnswerSectionP1>
                             <ModalActionsP1>
                                <ActionButton isPrimary={false} onClick={handleAnalysisClick}>
                                    查看范文与精讲
                                </ActionButton>
                                <ActionButton isPrimary={true}>立即练习</ActionButton>
                            </ModalActionsP1>
                        </AnswerSectionP1>
                    )}
                </ModalContentP1>
                 <ModalFooterP1>
                    <SecondaryButton>我要补充</SecondaryButton>
                </ModalFooterP1>
            </ModalContainerP1>
        </ModalOverlay>
    );
};

const QuestionBankPage: React.FC<QuestionBankPageProps> = ({ navigateTo, navigateToAnalysis }) => {
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

            {selectedCard && <TopicModal card={selectedCard} onClose={handleCloseModal} navigateToAnalysis={navigateToAnalysis} />}
        </>
    );
};

// --- GENERAL STYLED COMPONENTS ---
const Header = styled.header`
    text-align: center;
    margin-bottom: 3rem;
    position: relative;

    h1 {
        font-size: 2.5rem;
        font-weight: 700;
        color: ${({ theme }) => theme.colors.header};
        margin: 0 6rem; /* Avoids overlap with back button */
    }
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        margin-bottom: 2rem;
        h1 {
            font-size: 1.5rem;
            margin: 0 3.5rem;
        }
    }
`;

const Nav = styled.nav`
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1.5rem;
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
    top: 50%;
    left: 0;
    transform: translateY(-50%);

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 0.6rem;
        top: 0;
        transform: none;

        span {
            display: none;
        }
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


// --- PART 1 MODAL STYLES ---

const ModalContainerP1 = styled.div`
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

const ModalHeaderP1 = styled.header`
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

const ModalNewTagP1 = styled.span`
    background-color: ${({ theme }) => theme.colors.primaryOrange};
    color: white;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    align-self: flex-start;
    margin-left: 1rem;
`;

const ModalCloseButtonP1 = styled.button`
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

const ModalContentP1 = styled.main`
    padding: 1.5rem;
    overflow-y: auto;
    flex-grow: 1;
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 1rem;
    }
`;

const QuestionsSectionP1 = styled.section`
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

const AnswerSectionP1 = styled.section`
    margin-top: 1.5rem;
`;

const ModalActionsP1 = styled.div`
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
        opacity: 0.9;
    }
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 1rem;
    }
`;

const ModalFooterP1 = styled.footer`
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

// --- PART 2+3 MODAL STYLES ---

const ModalContainerP2 = styled.div`
    background-color: ${({ theme }) => theme.colors.bg};
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    animation: slideInMobile 0.35s ease-out;
`;

const HeaderP2 = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    flex-shrink: 0;
    
    h3 {
        margin: 0;
        font-size: 1.1rem;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.header};
    }
`;

const HeaderButton = styled.button`
    background: none;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.header};
`;
const BackButtonP2 = styled(HeaderButton)``;
const RefreshButtonP2 = styled(HeaderButton)``;

const ContentP2 = styled.main`
    flex-grow: 1;
    overflow-y: auto;
    padding: 0 1rem 1rem 1rem;
`;

const CardWrapper = styled.div`
    background-color: ${({ theme }) => theme.colors.cardYellowBg};
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    display: flex;
    position: relative;
    padding-bottom: 1rem;
`;

const Sidebar = styled.div`
    background-color: #559bd9;
    padding: 1.5rem 0.5rem;
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
`;

const DateText = styled.p`
    color: white;
    writing-mode: vertical-rl;
    text-orientation: mixed;
    margin: 0;
    font-size: 0.8rem;
    font-weight: 500;
    opacity: 0.9;
    letter-spacing: 1px;
`;

const MainContent = styled.div`
    padding: 1rem 1.5rem 1rem 1.25rem;
    color: ${({ theme }) => theme.colors.text};
    width: 100%;

    p {
        margin: 0.5rem 0;
        line-height: 1.7;
    }
`;

const NewTag = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    background-color: ${({ theme }) => theme.colors.newTag};
    color: white;
    padding: 0.3rem 1rem;
    font-weight: 700;
    font-size: 0.8rem;
    border-radius: 0 16px 0 16px;
`;

const CardTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.header};
    margin: 0.5rem 0 1.5rem 0;
`;

const PartSection = styled.section`
    margin-bottom: 1.5rem;
    animation: fadeIn 0.4s ease;
`;

const PartLabel = styled.div`
    background-color: #cde4f8;
    color: #3b87d0;
    display: inline-block;
    padding: 0.25rem 0.8rem;
    border-radius: 999px;
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 0.75rem;
`;

const Part2Title = styled.p`
    font-weight: 600;
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.header};
`;

const Part2Prompts = styled.ul`
    list-style-type: none;
    padding-left: 1rem;
    li {
        position: relative;
        padding-left: 1rem;
        margin-bottom: 0.5rem;
        &:before {
            content: '•';
            position: absolute;
            left: 0;
            color: ${({ theme }) => theme.colors.label};
        }
    }
`;

const Part3Questions = styled.ol`
    padding-left: 1.5rem;
    li {
        margin-bottom: 0.75rem;
        line-height: 1.7;
    }
`;

const FooterP2 = styled.footer`
    flex-shrink: 0;
    background-color: white;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`;

const PrevNextNav = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    color: ${({ theme }) => theme.colors.label};
    
    button {
        background: none;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1rem;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.primaryBlue};

        &:disabled {
            color: ${({ theme }) => theme.colors.label};
            cursor: not-allowed;
        }
    }
`;

const MainActions = styled.div`
    display: flex;
    gap: 1rem;
    width: 100%;
`;

const ActionButtonBase = styled.button`
    flex: 1;
    padding: 0.9rem;
    border-radius: 12px;
    border: none;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
    color: white;

    &:hover {
        opacity: 0.9;
    }
`;
const ActionButtonOrange = styled(ActionButtonBase)`
    background-color: ${({ theme }) => theme.colors.primaryOrange};
`;
const ActionButtonBlue = styled(ActionButtonBase)`
    background-color: ${({ theme }) => theme.colors.primaryBlue};
`;

const SupplementaryAction = styled.button`
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.label};
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;

    &:hover {
        color: ${({ theme }) => theme.colors.primaryBlue};
    }
`;

export default QuestionBankPage;
