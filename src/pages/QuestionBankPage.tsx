import React, { useState } from 'react';
import { styled } from 'styled-components';
import TopicContainer from '../components/TopicContainer';
import { initialPart1Data, initialPart2Data, CueCardData } from '../data';

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

const TopicModal: React.FC<TopicModalProps> = ({ card, onClose }) => {
    const [isAnswerVisible, setIsAnswerVisible] = useState(false);

    const handleModalContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const sampleAnswers = card.sampleAnswer ? card.sampleAnswer.split('\n---\n') : [];

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
                    
                    {card.sampleAnswer && (
                         <AnswerSection>
                             <ModalActions>
                                <ActionButton isPrimary={false} onClick={() => setIsAnswerVisible(!isAnswerVisible)}>
                                    {isAnswerVisible ? '隐藏范文' : '参考范文'}
                                </ActionButton>
                                <ActionButton isPrimary={true}>立即练习</ActionButton>
                            </ModalActions>
                            {isAnswerVisible && (
                                <AnswerContent>
                                    <h4>参考范文 (IELTS 5.5)</h4>
                                    <div>
                                        {card.questions?.map((question, index) => (
                                            <QAPair key={index}>
                                                <AnswerQuestion>{index + 1}. {question}</AnswerQuestion>
                                                <AnswerText>
                                                    {sampleAnswers[index] || ''}
                                                </AnswerText>
                                            </QAPair>
                                        ))}
                                    </div>
                                </AnswerContent>
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
    margin-bottom: 1.5rem;

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

const AnswerContent = styled.div`
    margin-top: 1.5rem;
    background-color: ${({ theme }) => theme.colors.highlightBg};
    border: 1px solid ${({ theme }) => theme.colors.highlightBorder};
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

const AnswerQuestion = styled.p`
    font-weight: 600;
    color: ${({ theme }) => theme.colors.header};
    margin: 0 0 0.5rem 0;
    line-height: 1.5;
`;

const AnswerText = styled.p`
    margin: 0 0 0 1.5em; /* Indent whole paragraph */
    line-height: 1.7;
    color: #34495e;
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