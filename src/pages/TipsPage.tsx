import React, { useState } from 'react';
import { styled } from 'styled-components';

interface TipsPageProps {
    navigateTo: (page: 'home') => void;
}

const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
);

const LightbulbIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13a6 6 0 0 1-6 6 6 6 0 0 1-6-6 6 6 0 0 1 6-6 6 6 0 0 1 6 6z"></path>
        <path d="M12 19v2"></path><path d="M12 3v2"></path>
        <path d="M5 12H3"></path><path d="M21 12h-2"></path>
        <path d="m18.36 18.36-.78-.78"></path>
        <path d="m6.42 6.42-.78-.78"></path>
        <path d="m18.36 5.64-.78.78"></path>
        <path d="m6.42 17.58-.78.78"></path>
    </svg>
);

const PromptIcon = ({ type }: { type: string }) => {
    // FIX: Changed JSX.Element to React.JSX.Element to fix "Cannot find namespace 'JSX'" error.
    const icons: { [key: string]: React.JSX.Element } = {
        who: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
        what: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>,
        where: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
        when: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
        why: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>,
        'why-not': <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>,
        how: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>,
        point: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
        reason: <LightbulbIcon />,
        example: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>,
    };
    return icons[type] || icons['what'];
};

const examples5w1h = [
    {
        label: '听音乐',
        question: 'Do you like music?',
        prompts: [
            { id: 'what', title: 'What? (喜欢吗?)', text: '直接回答，清晰表明你的态度。', keywords: ["Yes, absolutely", "I'm a big fan of music."] },
            { id: 'why', title: 'Why? (为什么?)', text: '解释你为什么喜欢音乐，说明它的作用。', keywords: ["It's a great way to relax", 'It helps me de-stress.'] },
            { id: 'how', title: 'How? (感觉如何?)', text: '描述音乐带给你的感受，增加情感色彩。', keywords: ['It puts me in a good mood.', 'It makes me feel energized.'] },
            { id: 'when', title: 'When? (何时听?)', text: '说出你听音乐的具体场景，让回答更生动。', keywords: ['every day', 'when commuting', 'while studying'] },
        ],
        answer: () => (
            <p>
                <Highlight type="what">Yes, absolutely, I'm a big fan of music</Highlight>. <Highlight type="why">For me, it's a great way to relax after a long day</Highlight>, and <Highlight type="how">it always puts me in a good mood</Highlight>. I listen to it pretty much every day, <Highlight type="when">especially when I'm commuting on the subway</Highlight>.
            </p>
        ),
        legend: [
            { id: 'what', text: 'Answer' },
            { id: 'why', text: 'Why' },
            { id: 'how', text: 'How' },
            { id: 'when', text: 'When' },
        ]
    },
    {
        label: '近期旅行',
        question: 'Tell me about a recent trip you took.',
        prompts: [
            { id: 'when', title: 'When? (何时去?)', text: '描述旅行发生的时间，展示正确的时态。', keywords: ['last month', 'during the summer', 'for three days'] },
            { id: 'what', title: 'What? (做什么?)', text: '直接回答问题核心，这是一次什么样的旅行？', keywords: ['a weekend getaway', 'a family vacation', 'sightseeing'] },
            { id: 'who', title: 'Who? (和谁去?)', text: '补充和谁一起去的，让故事更完整。', keywords: ['with my family', 'by myself', 'with friends'] },
            { id: 'where', title: 'Where? (去哪里?)', text: '说出你去的具体地点，让回答更具体。', keywords: ['a coastal city', 'the mountains', 'Hangzhou'] },
            { id: 'why', title: 'Why? (为什么去?)', text: '解释你为什么要去那里，体现你的动机。', keywords: ['to relax', 'celebrate a birthday', 'see the scenery'] },
            { id: 'how', title: 'How? (感觉如何?)', text: '描述你在旅途中的感受，增加情感色彩。', keywords: ['felt refreshed', 'a wonderful time', 'it was amazing'] },
        ],
        answer: () => (
            <p>
                Sure. <Highlight type="when">Last month</Highlight>, I went on <Highlight type="what">a short weekend trip</Highlight> <Highlight type="who">with my family</Highlight> to <Highlight type="where">Hangzhou, a famous city not far from here</Highlight>. I went mainly <Highlight type="why">to relax and escape the stress from work for a couple of days</Highlight>. Overall, I <Highlight type="how">had a wonderful time and felt so refreshed</Highlight>.
            </p>
        ),
        legend: [
            { id: 'when', text: 'When' },
            { id: 'what', text: 'What' },
            { id: 'who', text: 'Who' },
            { id: 'where', text: 'Where' },
            { id: 'why', text: 'Why' },
            { id: 'how', text: 'How' },
        ]
    }
];

const preExamples = [
    {
        label: '看电影',
        question: 'Do you like watching movies?',
        prompts: [
            { id: 'point', title: 'P - Point (观点)', text: '直接、清晰地陈述你的核心观点。', keywords: ["Yes, I'm a huge fan.", "No, not really."] },
            { id: 'reason', title: 'R - Reason (理由)', text: '解释你持有该观点的原因。', keywords: ["The main reason is...", "because..."] },
            { id: 'example', title: 'E - Example (例子)', text: '给出一个具体的例子来支撑你的理由。', keywords: ['For example,', 'For instance,'] },
        ],
        answer: () => (
            <p>
                <Highlight type="point">Yes, I'm quite a movie buff. I really enjoy watching films</Highlight>. <Highlight type="reason">I think it's a fantastic way to unwind and escape from reality for a bit</Highlight>. <Highlight type="example">For instance, last weekend I watched a new sci-fi movie, and it was so immersive that I completely forgot about all my work stress</Highlight>.
            </p>
        ),
        legend: [
            { id: 'point', text: 'Point' },
            { id: 'reason', text: 'Reason' },
            { id: 'example', text: 'Example' },
        ]
    },
    {
        label: '工作',
        question: 'Do you like your job?',
        prompts: [
            { id: 'point', title: 'P - Point (观点)', text: '直接、清晰地陈述你的核心观点。', keywords: ["Yes, I enjoy my job a lot.", "To be honest, it's okay."] },
            { id: 'reason', title: 'R - Reason (理由)', text: '解释你持有该观点的原因。', keywords: ["The work is meaningful.", "My colleagues are great."] },
            { id: 'example', title: 'E - Example (例子)', text: '给出一个具体的例子来支撑你的理由。', keywords: ['For example,', 'Specifically,'] },
        ],
        answer: () => (
            <p>
                <Highlight type="point">Yes, for the most part, I really enjoy my job</Highlight>. <Highlight type="reason">I think the main reason is that I find the work itself very meaningful, and my colleagues are fantastic</Highlight>. <Highlight type="example">For example, last week we finished a really challenging project, and the sense of accomplishment was incredible. Everyone on the team was so supportive, which made a huge difference</Highlight>.
            </p>
        ),
        legend: [
            { id: 'point', text: 'Point' },
            { id: 'reason', text: 'Reason' },
            { id: 'example', text: 'Example' },
        ]
    }
];


const idToPromptType: {[key: string]: string} = {
    what: 'what', where: 'where', when: 'when',
    why: 'why', 'why-not': 'whyNot', how: 'how', who: 'who',
    point: 'point', reason: 'reason', example: 'example'
};

const Part1Tips: React.FC = () => {
    const [exampleIndex, setExampleIndex] = useState(0);
    const [preExampleIndex, setPreExampleIndex] = useState(0);
    const [activeSkill, setActiveSkill] = useState<'5w1h' | 'pre'>('5w1h');

    const current5w1hExample = examples5w1h[exampleIndex];
    const currentPreExample = preExamples[preExampleIndex];

    const renderPromptCard = (prompt: typeof current5w1hExample.prompts[0]) => (
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
    );

    return (
        <TipsContentV2>
             <SkillNavContainer>
                <SkillNavButton $active={activeSkill === '5w1h'} onClick={() => setActiveSkill('5w1h')}>
                    技巧一: 5W1H 扩展法
                </SkillNavButton>
                <SkillNavButton $active={activeSkill === 'pre'} onClick={() => setActiveSkill('pre')}>
                    技巧二: PRE 结构法
                </SkillNavButton>
            </SkillNavContainer>

            {activeSkill === '5w1h' && (
                <div key="5w1h" style={{ animation: 'fadeIn 0.4s ease' }}>
                    <IntroSection>
                        <h3>核心技巧一: 5W1H 内容扩展法</h3>
                        <p>在 Part 1 中，最常见的错误是回答过短。5W1H 方法可以帮助你轻松地扩展答案，使其内容丰富、结构清晰，向考官展示你的语言能力。</p>
                    </IntroSection>

                     <ExampleSelectorContainer>
                        {examples5w1h.map((example, index) => (
                            <ExampleSelectorButton
                                key={index}
                                $active={exampleIndex === index}
                                onClick={() => setExampleIndex(index)}
                            >
                                {`例子 ${index + 1}: ${example.label}`}
                            </ExampleSelectorButton>
                        ))}
                    </ExampleSelectorContainer>

                    <GuideContainer>
                        <div>
                            <StepHeader>
                                <StepNumber>1</StepNumber>
                                <StepTitle>审题：分析问题</StepTitle>
                            </StepHeader>
                            <FlowQuestion>{current5w1hExample.question}</FlowQuestion>
                        </div>

                        <StepDivider />

                        <div>
                            <StepHeader>
                                <StepNumber>2</StepNumber>
                                <StepTitle>拆解：用 5W1H 扩展思路</StepTitle>
                            </StepHeader>
                            <StepDescription>围绕问题，从不同角度发散思考。每个角度都能成为你答案的一部分。</StepDescription>
                            <PromptsGridV2>
                                {current5w1hExample.prompts.map(renderPromptCard)}
                            </PromptsGridV2>
                        </div>
                        
                        <StepDivider />

                        <div>
                            <StepHeader>
                                <StepNumber>3</StepNumber>
                                <StepTitle>组合：组织成一个完整的答案</StepTitle>
                            </StepHeader>
                            <StepDescription>将刚才的思路点串联起来，形成一段流暢、详细的回答。</StepDescription>
                            <FinalAnswerBox>{current5w1hExample.answer()}</FinalAnswerBox>
                            <AnswerLegend>
                                {current5w1hExample.legend.map(item => (
                                    <LegendItem key={item.id}>
                                        <LegendColorBox type={idToPromptType[item.id]} />
                                        {item.text}
                                    </LegendItem>
                                ))}
                            </AnswerLegend>
                        </div>
                    </GuideContainer>

                    <ImportantNote>
                        <LightbulbIcon />
                        <p><strong>注意:</strong> 5W1H 只是一个帮助你发散思维的工具，你不需要在每个回答中都包含所有要素。通常来说，Part 1 的每个问题回答 <strong>3-5 句话</strong>即可，选择其中 2-3 个角度进行阐述就非常充分了。</p>
                    </ImportantNote>
                </div>
            )}
            
            {activeSkill === 'pre' && (
                 <div key="pre" style={{ animation: 'fadeIn 0.4s ease' }}>
                    <IntroSection>
                        <h3>核心技巧二: PRE 结构法 (Point-Reason-Example)</h3>
                        <p>除了扩展内容，清晰的逻辑结构同样重要。PRE 方法是一个简单、高效的论证结构，能让你的回答更有条理、更具说服力，避免因逻辑混乱而失分。</p>
                    </IntroSection>

                    <ExampleSelectorContainer>
                        {preExamples.map((example, index) => (
                            <ExampleSelectorButton
                                key={index}
                                $active={preExampleIndex === index}
                                onClick={() => setPreExampleIndex(index)}
                            >
                                {`例子 ${index + 1}: ${example.label}`}
                            </ExampleSelectorButton>
                        ))}
                    </ExampleSelectorContainer>

                    <GuideContainer>
                        <div>
                            <StepHeader>
                                <StepNumber>1</StepNumber>
                                <StepTitle>审题：分析问题</StepTitle>
                            </StepHeader>
                            <FlowQuestion>{currentPreExample.question}</FlowQuestion>
                        </div>

                        <StepDivider />

                        <div>
                            <StepHeader>
                                <StepNumber>2</StepNumber>
                                <StepTitle>拆解：用 PRE 构建思路</StepTitle>
                            </StepHeader>
                            <StepDescription>围绕问题，按照“观点-理由-例子”的顺序组织你的想法。</StepDescription>
                            <PromptsGridV2>
                                {currentPreExample.prompts.map(renderPromptCard)}
                            </PromptsGridV2>
                        </div>
                        
                        <StepDivider />

                        <div>
                            <StepHeader>
                                <StepNumber>3</StepNumber>
                                <StepTitle>组合：组织成一个完整的答案</StepTitle>
                            </StepHeader>
                            <StepDescription>将刚才的思路点串联起来，形成一段逻辑清晰、有理有据的回答。</StepDescription>
                            <FinalAnswerBox>{currentPreExample.answer()}</FinalAnswerBox>
                            <AnswerLegend>
                                {currentPreExample.legend.map(item => (
                                    <LegendItem key={item.id}>
                                        <LegendColorBox type={idToPromptType[item.id]} />
                                        {item.text}
                                    </LegendItem>
                                ))}
                            </AnswerLegend>
                        </div>
                    </GuideContainer>

                    <ImportantNote>
                        <LightbulbIcon />
                        <p><strong>注意:</strong> PRE 结构非常适合 Part 1 的大多数问题。它能帮你快速组织一个长度适中 (3-4句话)、逻辑清晰的答案。熟练运用后，你可以根据问题灵活调整，比如提供多个 Reason 或 Example。</p>
                    </ImportantNote>
                </div>
            )}
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

const SkillNavContainer = styled.div`
    display: flex;
    justify-content: center;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    margin-bottom: 2.5rem;
`;

const SkillNavButton = styled.button<{ $active: boolean }>`
    font-family: inherit;
    font-size: 1.1rem;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: ${({ theme, $active }) => $active ? theme.colors.header : theme.colors.label};
    border-bottom: 3px solid ${({ $active, theme }) => $active ? theme.colors.primaryOrange : 'transparent'};
    margin-bottom: -2px;
    transition: color 0.2s ease;

    &:hover {
        color: ${({ theme }) => theme.colors.header};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 1rem;
        padding: 0.75rem 1rem;
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

        & + p {
            margin-top: 1rem;
        }
    }
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 1.5rem;
        h3 { font-size: 1.5rem; }
        p { font-size: 1rem; }
    }
`;

const GuideContainer = styled.div`
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

const StepDivider = styled.hr`
    border: 0;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.border};
    margin: 2.5rem 0;
`;

const PromptsGridV2 = styled.div`
    display: flex;
    flex-direction: column;
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
    who: { bg: 'rgba(26, 188, 156, 0.2)', text: '#117a65' },
    what: { bg: 'rgba(52, 152, 219, 0.2)', text: '#1d6a9f' },
    where: { bg: 'rgba(46, 204, 113, 0.2)', text: '#18894b' },
    when: { bg: 'rgba(243, 156, 18, 0.2)', text: '#b47a00' },
    why: { bg: 'rgba(155, 89, 182, 0.2)', text: '#6d3a82' },
    whyNot: { bg: 'rgba(231, 76, 60, 0.2)', text: '#a43328' },
    how: { bg: 'rgba(230, 126, 34, 0.2)', text: '#a05716' },
    point: { bg: 'rgba(52, 152, 219, 0.2)', text: '#1d6a9f' },
    reason: { bg: 'rgba(230, 126, 34, 0.2)', text: '#a05716' },
    example: { bg: 'rgba(39, 174, 96, 0.2)', text: '#1e8449' },
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

const ExampleSelectorContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 2.5rem;
`;

const ExampleSelectorButton = styled.button<{ $active: boolean }>`
    background-color: ${({ theme, $active }) => $active ? theme.colors.primaryOrange : theme.colors.cardBg};
    color: ${({ theme, $active }) => $active ? 'white' : theme.colors.header};
    border: 1px solid ${({ theme, $active }) => $active ? theme.colors.primaryOrange : theme.colors.border};
    padding: 0.8rem 1.5rem;
    border-radius: 9999px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background-color: ${({ theme, $active }) => $active ? '#e88f33' : theme.colors.boxBg};
        border-color: ${({ theme, $active }) => $active ? '#e88f33' : theme.colors.label};
    }
    
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 0.7rem 1.2rem;
        font-size: 0.9rem;
    }
`;

const ImportantNote = styled.section`
    background-color: ${({ theme }) => theme.colors.cardBg};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-left: 4px solid ${({ theme }) => theme.colors.primaryOrange};
    border-radius: 16px;
    padding: 1.5rem;
    margin: 2.5rem auto 0 auto;
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};

    svg {
        flex-shrink: 0;
        width: 24px;
        height: 24px;
        color: ${({ theme }) => theme.colors.primaryOrange};
        margin-top: 3px;
    }

    p {
        margin: 0;
        line-height: 1.7;
        color: ${({ theme }) => theme.colors.text};
        font-size: 1rem;

        strong {
            font-weight: 600;
            color: ${({ theme }) => theme.colors.header};
        }
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