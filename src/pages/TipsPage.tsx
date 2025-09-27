import React, { useState } from 'react';
import { styled } from 'styled-components';

interface TipsPageProps {
    navigateTo: (page: 'home') => void;
}

const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
);

const NextIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
);

const PromptIcon = ({ type }: { type: string }) => {
    const icons: { [key: string]: JSX.Element } = {
        what: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>,
        where: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
        when: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
        why: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>,
        'why-not': <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>,
        how: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>,
    };
    return icons[type] || icons['what'];
};

const examples = [
    {
        question: 'What do you usually do with your friends?',
        prompts: [
            { id: 'what', title: 'What? (做什么?)', text: '直接回答问题核心，你会做什么具体活动？', keywords: ['go to a cafe', 'go shopping', 'watch movies'] },
            { id: 'where', title: 'Where? (在哪做?)', text: '补充活动发生的具体地点，让回答更生动。', keywords: ['a quiet coffee shop', 'city center mall', 'park'] },
            { id: 'when', title: 'When? (何时做?)', text: '描述活动的频率或时间，展示时态运用。', keywords: ['every weekend', 'twice a month', 'when we are free'] },
            { id: 'why', title: 'Why? (为什么?)', text: '解释你喜欢这些活动的原因，体现思考深度。', keywords: ['relaxing', 'convenient', 'catch up'] },
            { id: 'how', title: 'How? (感觉如何?)', text: '描述和朋友在一起的感受，增加情感色彩。', keywords: ['very happy', 'important to me', 'enjoy the time'] },
        ],
        answer: () => (
            <p>
                Well, I often <Highlight type="what">go to a cafe to drink coffee and chat</Highlight> with my friends. We usually meet at <Highlight type="where">a quiet coffee shop near my house</Highlight> because it is <Highlight type="why">relaxing</Highlight>. I try to meet them <Highlight type="when">every weekend</Highlight>. For me, friends are very important, and talking with them always makes me <Highlight type="how">feel happy</Highlight>.
            </p>
        ),
        legend: [
            { id: 'what', text: 'What' },
            { id: 'where', text: 'Where' },
            { id: 'when', text: 'When' },
            { id: 'why', text: 'Why' },
            { id: 'how', text: 'How' },
        ]
    },
    {
        question: 'Do you like crowded places?',
        prompts: [
            { id: 'what', title: 'What? (喜欢吗?)', text: '避免简单的Yes/No，使用"It depends"来展开。', keywords: ["It depends", "Sometimes yes, sometimes no"] },
            { id: 'why', title: 'Why? (为什么喜欢?)', text: '给出你喜欢拥挤地方的理由和具体场景。', keywords: ['concerts', 'lively atmosphere', 'exciting'] },
            { id: 'why-not', title: 'Why Not? (为什么不喜欢?)', text: '给出你不喜欢拥挤地方的理由和场景。', keywords: ['crowded subway', 'stressful', 'hard to move'] },
            { id: 'where', title: 'Where? (举例说明)', text: '用你身边的具体地点来举例，使回答更真实。', keywords: ['the local shopping mall', 'the train station'] },
            { id: 'when', title: 'When? (何时拥挤?)', text: '描述这些地方通常在什么时候拥挤。', keywords: ['on weekends', 'during rush hour'] },
        ],
        answer: () => (
            <p>
                Well, <Highlight type="what">it depends</Highlight>. Sometimes I like the energy of a crowded place, <Highlight type="why">like at a concert, because the atmosphere is very exciting</Highlight>. But most of the time, I prefer quiet places. I don't like being in <Highlight type="why-not">a crowded subway because it can be a bit stressful</Highlight>. For example, <Highlight type="where">the big shopping mall near my home</Highlight> is always full of people, especially <Highlight type="when">on weekends</Highlight>.
            </p>
        ),
        legend: [
            { id: 'what', text: 'Answer' },
            { id: 'why', text: 'Why (Pro)' },
            { id: 'why-not', text: 'Why (Con)' },
            { id: 'where', text: 'Where' },
            { id: 'when', text: 'When' },
        ]
    }
];

const idToPromptType: {[key: string]: string} = {
    what: 'what', where: 'where', when: 'when',
    why: 'why', 'why-not': 'whyNot', how: 'how'
};

const Part1Tips: React.FC = () => {
    const [exampleIndex, setExampleIndex] = useState(0);
    const currentExample = examples[exampleIndex];

    const handleNextExample = () => {
        setExampleIndex((prevIndex) => (prevIndex + 1) % examples.length);
    };

    return (
        <TipsContentV2>
            <IntroSection>
                <h3>核心技巧一: 5W1H 内容扩展法</h3>
                <p>在 Part 1 中，最常见的错误是回答过短。5W1H 方法可以帮助你轻松地扩展答案，使其内容丰富、结构清晰，向考官展示你的语言能力。</p>
            </IntroSection>

            <InteractiveFlow>
                <FlowStep>
                    <StepHeader>
                        <StepNumber>1</StepNumber>
                        <StepTitle>审题：分析问题</StepTitle>
                    </StepHeader>
                    <FlowQuestion>{currentExample.question}</FlowQuestion>
                </FlowStep>

                <StepConnector />

                <FlowStep>
                    <StepHeader>
                        <StepNumber>2</StepNumber>
                        <StepTitle>拆解：用 5W1H 扩展思路</StepTitle>
                    </StepHeader>
                    <StepDescription>围绕问题，从不同角度发散思考。每个角度都能成为你答案的一部分。</StepDescription>
                    <PromptsGridV2>
                        {currentExample.prompts.map(prompt => (
                            <PromptCardV2 key={prompt.id} type={idToPromptType[prompt.id]}>
                                <PromptHeader>
                                    <PromptIcon type={prompt.id} />
                                    <strong>{prompt.title}</strong>
                                </PromptHeader>
                                <p>{prompt.text}</p>
                                <PromptKeywords>
                                    {prompt.keywords.map(kw => <code key={kw}>{kw}</code>)}
                                </PromptKeywords>
                            </PromptCardV2>
                        ))}
                    </PromptsGridV2>
                </FlowStep>
                
                <StepConnector />

                <FlowStep>
                    <StepHeader>
                        <StepNumber>3</StepNumber>
                        <StepTitle>组合：组织成一个完整的答案</StepTitle>
                    </StepHeader>
                     <StepDescription>将刚才的思路点串联起来，形成一段流暢、详细的回答。</StepDescription>
                    <FinalAnswerBox>{currentExample.answer()}</FinalAnswerBox>
                    <AnswerLegend>
                        {currentExample.legend.map(item => (
                             <LegendItem key={item.id}>
                                <LegendColorBox type={idToPromptType[item.id]} />
                                {item.text}
                            </LegendItem>
                        ))}
                    </AnswerLegend>
                </FlowStep>
            </InteractiveFlow>
            
            <ToolActions>
                <NextExampleButton onClick={handleNextExample}>
                    <span>换个例子</span>
                    <NextIcon />
                </NextExampleButton>
            </ToolActions>
        </TipsContentV2>
    );
};


const TipsPage: React.FC<TipsPageProps> = ({ navigateTo }) => {
    const [activeTab, setActiveTab] = useState<'part1' | 'part2' | 'part3'>('part1');

    const renderContent = () => {
        switch (activeTab) {
            case 'part1':
                return <Part1Tips />;
            case 'part2':
                return (
                    <PlaceholderSection>
                        <h3>Part 2 技巧正在精心准备中...</h3>
                        <p>敬请期待关于个人陈述的结构、时间管理和故事讲述技巧的详细指南。</p>
                    </PlaceholderSection>
                );
            case 'part3':
                return (
                     <PlaceholderSection>
                        <h3>Part 3 技巧正在精心准备中...</h3>
                        <p>敬请期待关于深入讨论、抽象思维和展示批判性观点的互动练习。</p>
                    </PlaceholderSection>
                );
            default:
                return null;
        }
    };

    return (
        <PageContainer>
            <PageHeader>
                <BackButton onClick={() => navigateTo('home')} aria-label="返回主页">
                    <BackArrowIcon />
                    <span>返回主页</span>
                </BackButton>
                <h1>雅思口语回答技巧</h1>
            </PageHeader>
            <TipsNav>
                <TipsNavButton $active={activeTab === 'part1'} onClick={() => setActiveTab('part1')}>
                    Part 1
                </TipsNavButton>
                <TipsNavButton $active={activeTab === 'part2'} onClick={() => setActiveTab('part2')}>
                    Part 2
                </TipsNavButton>
                <TipsNavButton $active={activeTab === 'part3'} onClick={() => setActiveTab('part3')}>
                    Part 3
                </TipsNavButton>
            </TipsNav>
            <main>
                {renderContent()}
            </main>
        </PageContainer>
    );
};

// Styled Components

const PageContainer = styled.div`
    max-width: 900px;
    margin: 0 auto;
    animation: fadeIn 0.5s ease;
`;

const PageHeader = styled.header`
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    position: relative;
    justify-content: center;

    h1 {
        margin: 0;
        font-size: 2rem;
        font-weight: 700;
        color: ${({ theme }) => theme.colors.header};
    }
    
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
        margin-bottom: 2.5rem;
        h1 {
            font-size: 1.75rem;
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
        position: static;
        transform: none;
        margin-bottom: 0.5rem;
    }
`;

const TipsNav = styled.nav`
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    background-color: ${({ theme }) => theme.colors.boxBg};
    padding: 0.5rem;
    border-radius: 9999px;
    margin-bottom: 2.5rem;
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        gap: 0.25rem;
        padding: 0.25rem;
    }
`;

const TipsNavButton = styled.button<{ $active: boolean }>`
    font-family: inherit;
    font-size: 1rem;
    font-weight: 600;
    padding: 0.6rem 1.5rem;
    border-radius: 9999px;
    border: none;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.label};
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;

    ${({ $active, theme }) => $active && `
        background-color: ${theme.colors.cardBg};
        color: ${theme.colors.header};
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    `}
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
    }
`;

const TipsContentV2 = styled.div`
    animation: fadeIn 0.4s ease;
`;

const IntroSection = styled.section`
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primaryBlue}, #2e6ab8);
    color: white;
    padding: 2rem;
    border-radius: 16px;
    margin-bottom: 2.5rem;
    box-shadow: 0 8px 16px rgba(0,0,0,0.1);

    h3 {
        margin: 0 0 0.5rem 0;
        font-size: 1.75rem;
        font-weight: 700;
    }
    p {
        margin: 0;
        font-size: 1.1rem;
        opacity: 0.9;
        line-height: 1.7;
        max-width: 80ch;
    }
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 1.5rem;
        h3 { font-size: 1.5rem; }
        p { font-size: 1rem; }
    }
`;

const InteractiveFlow = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FlowStep = styled.div`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.cardBg};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 1.5rem;
    }
`;

const StepHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
`;

const StepNumber = styled.span`
    background-color: ${({ theme }) => theme.colors.primaryBlue};
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.25rem;
    flex-shrink: 0;
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        width: 32px; height: 32px; font-size: 1rem;
    }
`;

const StepTitle = styled.h4`
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.header};
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 1.25rem;
    }
`;

const FlowQuestion = styled.p`
    background-color: ${({ theme }) => theme.colors.boxBg};
    padding: 1.25rem 1.5rem;
    border-radius: 12px;
    font-weight: 500;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.header};
    margin: 1.5rem 0 0 0;
    border-left: 5px solid ${({ theme }) => theme.colors.primaryBlue};
`;

const StepDescription = styled.p`
    color: ${({ theme }) => theme.colors.label};
    font-size: 1.1rem;
    margin: 0 0 1.5rem 0;
    padding-left: calc(40px + 1rem);
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding-left: 0;
    }
`;

const StepConnector = styled.div`
    height: 50px;
    width: 2px;
    background-color: ${({ theme }) => theme.colors.border};
    margin: 0;
    position: relative;
    &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 12px;
        height: 12px;
        background-color: ${({ theme }) => theme.colors.bg};
        border: 2px solid ${({ theme }) => theme.colors.border};
        border-radius: 50%;
    }
`;

const PromptsGridV2 = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    padding-left: calc(40px + 1rem);
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding-left: 0;
    }
`;

const PromptCardV2 = styled.div<{ type: string }>`
    background-color: ${({ theme }) => theme.colors.bg};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-left-width: 5px;
    border-radius: 12px;
    padding: 1rem;
    border-left-color: ${({ theme, type }) => theme.colors[type as keyof typeof theme.colors] || theme.colors.what};

    svg {
      color: ${({ theme, type }) => theme.colors[type as keyof typeof theme.colors] || theme.colors.what};
    }
`;

const PromptHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    svg {
        width: 20px;
        height: 20px;
    }
    strong {
        font-weight: 600;
        color: ${({ theme }) => theme.colors.header};
        font-size: 1.1rem;
    }
`;

const PromptKeywords = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
    code {
        background-color: ${({ theme }) => theme.colors.cardBg};
        border-radius: 6px;
        padding: 0.3rem 0.7rem;
        font-size: 0.9rem;
        color: ${({ theme }) => theme.colors.text};
        border: 1px solid ${({ theme }) => theme.colors.border};
    }
`;

const FinalAnswerBox = styled.div`
    background-color: ${({ theme }) => theme.colors.highlightBg};
    padding: 1.5rem;
    border-radius: 12px;
    line-height: 1.8;
    color: #34495e;
    font-size: 1.1rem;
    margin-top: 1.5rem;
`;

const highlightColors: { [key: string]: { bg: string, text: string } } = {
    what: { bg: 'rgba(52, 152, 219, 0.2)', text: '#1d6a9f' },
    where: { bg: 'rgba(46, 204, 113, 0.2)', text: '#18894b' },
    when: { bg: 'rgba(243, 156, 18, 0.2)', text: '#b47a00' },
    why: { bg: 'rgba(155, 89, 182, 0.2)', text: '#6d3a82' },
    whyNot: { bg: 'rgba(231, 76, 60, 0.2)', text: '#a43328' },
    how: { bg: 'rgba(230, 126, 34, 0.2)', text: '#a05716' },
};

const Highlight = styled.span<{ type: string }>`
    background-color: ${({ type }) => highlightColors[idToPromptType[type]]?.bg || 'transparent'};
    font-weight: 500;
    color: ${({ type }) => highlightColors[idToPromptType[type]]?.text || 'inherit'};
`;

const AnswerLegend = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-top: 1.5rem;
    padding-left: 1rem;
`;

const LegendItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    font-weight: 500;
`;

const LegendColorBox = styled.span<{ type: string }>`
    width: 16px;
    height: 16px;
    border-radius: 4px;
    background-color: ${({ type }) => highlightColors[type]?.bg?.replace('0.2', '0.4') || 'transparent'};
`;

const ToolActions = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 2.5rem;
`;

const NextExampleButton = styled.button`
    background-color: ${({ theme }) => theme.colors.primaryOrange};
    color: white;
    border: none;
    padding: 0.8rem 2rem;
    border-radius: 9999px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);

    &:hover {
        background-color: #e88f33;
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(0,0,0,0.12);
    }
    svg {
        width: 20px;
        height: 20px;
    }
`;

const PlaceholderSection = styled.section`
    background-color: ${({ theme }) => theme.colors.cardBg};
    border-radius: 16px;
    padding: 3rem 2rem;
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
    text-align: center;
    h3 {
        margin: 0 0 1rem 0;
        font-size: 1.5rem;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.header};
    }
    p {
        color: ${({ theme }) => theme.colors.label};
        font-size: 1.1rem;
    }
`;


export default TipsPage;