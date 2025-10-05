import React, { useState } from 'react';
import { styled } from 'styled-components';

interface TipsPageProps {
    navigateTo: (page: 'home') => void;
}

// FIX: Self-closed SVG elements (<line>, <polyline>) to be valid JSX.
const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
);

// FIX: Self-closed SVG <path> elements to be valid JSX.
const LightbulbIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13a6 6 0 0 1-6 6 6 6 0 0 1-6-6 6 6 0 0 1 6-6 6 6 0 0 1 6 6z" />
        <path d="M12 19v2" /><path d="M12 3v2" />
        <path d="M5 12H3" /><path d="M21 12h-2" />
        <path d="m18.36 18.36-.78-.78" />
        <path d="m6.42 6.42-.78-.78" />
        <path d="m18.36 5.64-.78.78" />
        <path d="m6.42 17.58-.78.78" />
    </svg>
);

// FIX: Self-closed SVG elements to be valid JSX.
const PromptIcon = ({ type }: { type: string }) => {
    const icons: { [key: string]: React.JSX.Element } = {
        who: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
        what: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>,
        where: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
        when: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
        why: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
        'why-not': <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
        how: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>,
        point: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
        point2: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
        reason: <LightbulbIcon />,
        example: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
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
];

const prePart3Examples = [
    {
        label: '出国旅行',
        question: "Do you think it's important for people to travel to other countries?",
        prompts: [
            { id: 'point', title: 'P - Point (观点)', text: '明确地陈述你的观点。', keywords: ["Yes, I believe it's extremely important.", "I think it is beneficial, but not essential."] },
            { id: 'reason', title: 'R - Reason (理由)', text: '解释你为什么这么认为。', keywords: ["because it broadens our horizons...", "it helps us understand different cultures."] },
            { id: 'example', title: 'E - Example (例子)', text: '提供一个具体的例子来支持你的理由。', keywords: ['For example, when I visited...', 'To illustrate this...'] },
        ],
        answer: () => (
            <p>
                <Highlight type="point">Yes, I believe it's incredibly important for people to travel internationally</Highlight>. <Highlight type="reason">The main reason is that it broadens our horizons and fosters a deeper understanding of different cultures in a way that reading books or watching documentaries simply cannot</Highlight>. <Highlight type="example">For instance, before visiting Japan, I had a very stereotypical image of the country. But after spending time there, interacting with local people and experiencing their daily life, I gained a much more nuanced and respectful perspective on their culture. That kind of personal experience is truly invaluable</Highlight>.
            </p>
        ),
        legend: [
            { id: 'point', text: 'Point' },
            { id: 'reason', text: 'Reason' },
            { id: 'example', text: 'Example' },
        ]
    },
];


const idToPromptType: {[key: string]: string} = {
    what: 'what', where: 'where', when: 'when',
    why: 'why', 'why-not': 'whyNot', how: 'how', who: 'who',
    point: 'point', point2: 'point', reason: 'reason', example: 'example'
};

const renderPromptCard = (prompt: typeof examples5w1h[0]['prompts'][0]) => (
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

const Part1TipsContent: React.FC = () => {
    const [exampleIndex, setExampleIndex] = useState(0);
    const [preExampleIndex, setPreExampleIndex] = useState(0);
    const [activeSkill, setActiveSkill] = useState<'5w1h' | 'pre'>('5w1h');

    const current5w1hExample = examples5w1h[exampleIndex];
    const currentPreExample = preExamples[preExampleIndex];

    return (
        <ContentWrapper>
            <IntroSection>
                <h3>Part 1: 快速、连贯地回答</h3>
                <p>在 Part 1 中，目标是给出长度适中（3-5句话）、内容清晰的回答。考官希望看到你能够轻松地谈论日常话题。以下两个技巧将帮助你轻松扩展答案，避免回答过短或逻辑混乱。</p>
            </IntroSection>

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
                    <GuideContainer>
                        <StepHeader>
                            <StepNumber>1</StepNumber>
                            <StepTitle>审题：分析问题</StepTitle>
                        </StepHeader>
                        <FlowQuestion>{current5w1hExample.question}</FlowQuestion>
                        <StepDivider />
                        <StepHeader>
                            <StepNumber>2</StepNumber>
                            <StepTitle>拆解：用 5W1H 扩展思路</StepTitle>
                        </StepHeader>
                        <StepDescription>围绕问题，从不同角度发散思考。每个角度都能成为你答案的一部分。</StepDescription>
                        <PromptsGridV2>
                            {current5w1hExample.prompts.map(renderPromptCard)}
                        </PromptsGridV2>
                        <StepDivider />
                        <StepHeader>
                            <StepNumber>3</StepNumber>
                            <StepTitle>组合：组织成一个完整的答案</StepTitle>
                        </StepHeader>
                        <StepDescription>将刚才的思路点串联起来，形成一段流暢、详细的回答。</StepDescription>
                        <FinalAnswerBox>{current5w1hExample.answer()}</FinalAnswerBox>
                        <AnswerLegend>
                            {current5w1hExample.legend.map(item => (
                                <LegendItem key={item.id}><LegendColorBox type={idToPromptType[item.id]} />{item.text}</LegendItem>
                            ))}
                        </AnswerLegend>
                    </GuideContainer>
                </div>
            )}
            
            {activeSkill === 'pre' && (
                 <div key="pre" style={{ animation: 'fadeIn 0.4s ease' }}>
                    <GuideContainer>
                        <StepHeader>
                            <StepNumber>1</StepNumber>
                            <StepTitle>审题：分析问题</StepTitle>
                        </StepHeader>
                        <FlowQuestion>{currentPreExample.question}</FlowQuestion>
                        <StepDivider />
                        <StepHeader>
                            <StepNumber>2</StepNumber>
                            <StepTitle>拆解：用 PRE 构建思路</StepTitle>
                        </StepHeader>
                        <StepDescription>围绕问题，按照“观点-理由-例子”的顺序组织你的想法。</StepDescription>
                        <PromptsGridV2>
                            {currentPreExample.prompts.map(renderPromptCard)}
                        </PromptsGridV2>
                        <StepDivider />
                        <StepHeader>
                            <StepNumber>3</StepNumber>
                            <StepTitle>组合：组织成一个完整的答案</StepTitle>
                        </StepHeader>
                        <StepDescription>将刚才的思路点串联起来，形成一段逻辑清晰、有理有据的回答。</StepDescription>
                        <FinalAnswerBox>{currentPreExample.answer()}</FinalAnswerBox>
                        <AnswerLegend>
                            {currentPreExample.legend.map(item => (
                                <LegendItem key={item.id}><LegendColorBox type={idToPromptType[item.id]} />{item.text}</LegendItem>
                            ))}
                        </AnswerLegend>
                    </GuideContainer>
                </div>
            )}
            <ImportantNote>
                <LightbulbIcon />
                <p><strong>Part 1 总结:</strong> 5W1H 帮助你丰富<strong>内容</strong>，PRE 帮助你构建<strong>逻辑</strong>。熟练运用这两个技巧，选择其中2-3个角度展开，就能给出一个既饱满又清晰的答案。</p>
            </ImportantNote>
        </ContentWrapper>
    );
};

// FIX: Self-closed SVG elements (<line>, <polyline>) to be valid JSX.
const RightArrowIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>;

const Part2TipsContent: React.FC = () => {
    return (
        <ContentWrapper>
            <IntroSection>
                <h3>Part 2: 讲述一个有吸引力的故事</h3>
                <p>Part 2 的核心是在1分钟准备后，进行1-2分钟的个人陈述。话题卡通常分为<b>人物、地点、事物、事件</b>等几大类。本部分考验的是你快速构建思路和讲述一个有结构、有细节故事的能力。5W1H 和 PRE 同样是你的得力助手。</p>
            </IntroSection>
            
            <GuideContainer>
                <div>
                    <StepHeader>
                        <StepNumber>1</StepNumber>
                        <StepTitle>1分钟准备: 用 5W1H 构建故事蓝图</StepTitle>
                    </StepHeader>
                    <StepDescription>
                        题卡上的提示 (prompts) 其实就是 5W1H 的变体。利用一分钟准备时间，针对每个提示写下关键词，这就是你故事的骨架。
                    </StepDescription>
                    <VisualAidGrid>
                        <MockCueCard>
                            <h4>Describe a good friend...</h4>
                            <ul>
                                <li>Who this person is</li>
                                <li>How you met</li>
                                <li>What you do together</li>
                                <li>Why this person is important</li>
                            </ul>
                        </MockCueCard>
                        <ArrowIcon><RightArrowIcon /></ArrowIcon>
                        <MockNotepad>
                            <h4>My Notes (1 min)</h4>
                            <ul>
                                <li><Highlight type="who">Who:</Highlight> Li Wei, classmate</li>
                                <li><Highlight type="how">How:</Highlight> university project</li>
                                <li><Highlight type="what">What:</Highlight> study, basketball</li>
                                <li><Highlight type="why">Why:</Highlight> supportive (exam), funny</li>
                            </ul>
                        </MockNotepad>
                    </VisualAidGrid>
                </div>

                <StepDivider />

                <div>
                    <StepHeader>
                        <StepNumber>2</StepNumber>
                        <StepTitle>充实细节: 用 PRE 让故事更饱满</StepTitle>
                    </StepHeader>
                    <StepDescription>
                        在讲述故事时，特别是解释原因 (Why) 或阐述感受 (How) 时，可以巧妙地使用 PRE 结构，让你的论证更有力、更具说服力。
                    </StepDescription>
                    <PREExampleContainer>
                        <PREPrompt>Prompt: "And explain why this person is important to you."</PREPrompt>
                        <PREStep type="point">
                            <PRELabel>P - Point</PRELabel>
                            <PREText>He's incredibly supportive, which is the main reason he's so important to me.</PREText>
                        </PREStep>
                        <PREStep type="reason">
                            <PRELabel>R - Reason</PRELabel>
                            <PREText>This is because he always encourages me when I'm facing challenges.</PREText>
                        </PREStep>
                        <PREStep type="example">
                            <PRELabel>E - Example</PRELabel>
                            <PREText>For instance, right before my final exams, I was really stressed out. He spent a whole afternoon helping me review and told me he believed in me. That gesture made a huge difference.</PREText>
                        </PREStep>
                    </PREExampleContainer>
                </div>

                <StepDivider />

                <div>
                    <StepHeader>
                        <StepNumber>3</StepNumber>
                        <StepTitle>实战演练：一个完整的故事</StepTitle>
                    </StepHeader>
                    <FlowQuestion>Describe an old person you know and respect.</FlowQuestion>
                     <FinalAnswerBox>
                        <p><Highlight type="introduction">I'd like to talk about my grandfather. He's in his late seventies, and he's been a huge influence in my life.</Highlight></p>
                        <p><Highlight type="body1">One of his main qualities is his incredible patience. (PRE Starts) I remember when I was struggling with a complex math problem. I wanted to give up, but he sat with me for over an hour, calmly explaining it from different angles until I understood. That taught me the value of persistence.</Highlight></p>
                        <p><Highlight type="body2">Another thing I respect is his optimistic attitude. (PRE Starts) He has faced many challenges, but he always finds something positive. For example, after a knee surgery, he treated the recovery period as a great opportunity to catch up on his reading. His "every cloud has a silver lining" mindset is truly inspiring.</Highlight></p>
                        <p><Highlight type="conclusion">So, he is not just a family member to me; he is a role model. His patience and optimism have shaped my character, and that's why I respect him so much.</Highlight></p>
                     </FinalAnswerBox>
                     <AnswerLegend>
                        <LegendItem><LegendColorBox type="introduction" /> Introduction</LegendItem>
                        <LegendItem><LegendColorBox type="body1" /> Story 1 (with PRE)</LegendItem>
                        <LegendItem><LegendColorBox type="body2" /> Story 2 (with PRE)</LegendItem>
                        <LegendItem><LegendColorBox type="conclusion" /> Conclusion</LegendItem>
                    </AnswerLegend>
                </div>
            </GuideContainer>
        </ContentWrapper>
    );
};

const Part3TipsContent: React.FC = () => {
    const currentPREExample = prePart3Examples[0];
    return (
        <ContentWrapper>
            <IntroSection>
                <h3>Part 3: 深入探讨，展现思辨能力</h3>
                <p>Part 3 要求你就 Part 2 的相关话题进行更深入、更抽象的讨论。考官希望看到你的逻辑思维和论证能力。PRE 结构是这一部分的关键技巧，能帮助你构建一个逻辑严密、有理有据的回答。</p>
            </IntroSection>

            <GuideContainer>
                <div>
                    <StepHeader>
                        <StepNumber>1</StepNumber>
                        <StepTitle>审题：分析问题</StepTitle>
                    </StepHeader>
                    <FlowQuestion>{currentPREExample.question}</FlowQuestion>
                </div>

                <StepDivider />

                <div>
                    <StepHeader>
                        <StepNumber>2</StepNumber>
                        <StepTitle>拆解：用 PRE 构建论点</StepTitle>
                    </StepHeader>
                    <StepDescription>
                        <b>P</b>oint (观点) → <b>R</b>eason (理由) → <b>E</b>xample (例子). 
                        这个经典结构可以帮助你清晰地表达任何观点。
                    </StepDescription>
                    <PromptsGridV2>
                        {currentPREExample.prompts.map(renderPromptCard)}
                    </PromptsGridV2>
                </div>

                <StepDivider />
                
                <div>
                    <StepHeader>
                        <StepNumber>3</StepNumber>
                        <StepTitle>组合：形成一个有说服力的答案</StepTitle>
                    </StepHeader>
                    <StepDescription>将你的观点、理由和例子串联起来，形成一个逻辑连贯的完整回答。</StepDescription>
                    <FinalAnswerBox>{currentPREExample.answer()}</FinalAnswerBox>
                    <AnswerLegend>
                        {currentPREExample.legend.map(item => (
                            <LegendItem key={item.id}><LegendColorBox type={idToPromptType[item.id]} />{item.text}</LegendItem>
                        ))}
                    </AnswerLegend>
                </div>
            </GuideContainer>
            <ImportantNote>
                <LightbulbIcon />
                <p><strong>Part 3 总结:</strong> 始终尝试用 PRE 结构来组织你的思想。即使你对某个话题不熟悉，这个框架也能帮助你清晰地表达观点。关键是展示你的思考过程，而不仅仅是给出一个简单的答案。</p>
            </ImportantNote>
        </ContentWrapper>
    );
};


const TipsPage: React.FC<TipsPageProps> = ({ navigateTo }) => {
    type ActivePart = 'part1' | 'part2' | 'part3';
    const [activePart, setActivePart] = useState<ActivePart>('part1');

    return (
        <PageContainer>
            <PageHeader>
                <BackButton onClick={() => navigateTo('home')} aria-label="返回主页">
                    <BackArrowIcon />
                    <span>返回主页</span>
                </BackButton>
                <h1>雅思口语回答技巧</h1>
            </PageHeader>
            
            <PartNavigation>
                <PartNavButton $active={activePart === 'part1'} onClick={() => setActivePart('part1')}>
                    Part 1 技巧
                </PartNavButton>
                <PartNavButton $active={activePart === 'part2'} onClick={() => setActivePart('part2')}>
                    Part 2 技巧
                </PartNavButton>
                <PartNavButton $active={activePart === 'part3'} onClick={() => setActivePart('part3')}>
                    Part 3 技巧
                </PartNavButton>
            </PartNavigation>

            <main>
                {activePart === 'part1' && <Part1TipsContent />}
                {activePart === 'part2' && <Part2TipsContent />}
                {activePart === 'part3' && <Part3TipsContent />}
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

const ContentWrapper = styled.div`
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

const PartNavigation = styled.nav`
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 2.5rem;
    border-radius: 999px;
    background-color: ${({ theme }) => theme.colors.boxBg};
    padding: 0.5rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
`;

const PartNavButton = styled.button<{ $active: boolean }>`
    flex: 1;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 600;
    padding: 0.75rem 1rem;
    border: none;
    border-radius: 999px;
    cursor: pointer;
    transition: all 0.2s ease;
    background-color: ${({ $active, theme }) => $active ? theme.colors.primaryBlue : 'transparent'};
    color: ${({ $active, theme }) => $active ? 'white' : theme.colors.label};

    &:hover:not(:disabled) {
        color: ${({ $active, theme }) => $active ? 'white' : theme.colors.header};
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
    margin-bottom: -1px;
    transition: color 0.2s ease;

    &:hover {
        color: ${({ theme }) => theme.colors.header};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 1rem;
        padding: 0.75rem 1rem;
        flex-grow: 1;
    }
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
    margin: 1rem 0 0 0;
    border-left: 5px solid ${({ theme }) => theme.colors.primaryBlue};
`;

const StepDescription = styled.p`
    color: ${({ theme }) => theme.colors.label};
    font-size: 1.1rem;
    margin: 0 0 1.5rem 0;
    padding-left: calc(40px + 1rem);
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding-left: 0;
        font-size: 1rem;
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
    gap: 1rem;
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

    p {
        margin: 0 0 1em 0;
        &:last-child {
            margin-bottom: 0;
        }
    }

     @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 1rem;
    }
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
    introduction: { bg: 'rgba(52, 152, 219, 0.2)', text: '#1d6a9f' },
    body1: { bg: 'rgba(230, 126, 34, 0.2)', text: '#a05716' },
    body2: { bg: 'rgba(39, 174, 96, 0.2)', text: '#1e8449' },
    conclusion: { bg: 'rgba(155, 89, 182, 0.2)', text: '#6d3a82' },
};

const Highlight = styled.span<{ type: string }>`
    background-color: ${({ type }) => highlightColors[idToPromptType[type] || type]?.bg || 'transparent'};
    font-weight: 500;
    color: ${({ type }) => highlightColors[idToPromptType[type] || type]?.text || 'inherit'};
    border-radius: 3px;
    padding: 0.1em 0;
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
    background-color: ${({ type }) => highlightColors[idToPromptType[type] || type]?.bg?.replace('0.2', '0.4') || 'transparent'};
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

// --- Part 2 Specific Styles ---

const VisualAidGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 1.5rem;
    padding-left: calc(40px + 1rem);

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        grid-template-columns: 1fr;
        gap: 1rem;
        padding-left: 0;
    }
`;

const MockCardBase = styled.div`
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 12px;
    padding: 1.5rem;
    background-color: ${({ theme }) => theme.colors.cardBg};
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    height: 100%;

    h4 {
        margin: 0 0 1rem 0;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.header};
    }
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
        li {
            margin-bottom: 0.5rem;
        }
    }
`;

const MockCueCard = styled(MockCardBase)`
    background-color: ${({ theme }) => theme.colors.cardYellowBg};
    border-color: #fbe5a2;
    li::before {
        content: '•';
        color: ${({ theme }) => theme.colors.label};
        margin-right: 0.5rem;
    }
`;

const MockNotepad = styled(MockCardBase)`
    li {
        display: flex;
        gap: 0.5rem;
    }
`;

const ArrowIcon = styled.div`
    color: ${({ theme }) => theme.colors.label};
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        transform: rotate(90deg);
        margin: 0 auto;
    }
`;

const PREExampleContainer = styled.div`
    padding-left: calc(40px + 1rem);
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding-left: 0;
    }
`;

const PREPrompt = styled.div`
    font-style: italic;
    color: ${({ theme }) => theme.colors.label};
    margin-bottom: 0.5rem;
`;

const PREStep = styled.div<{ type: string }>`
    border-left: 4px solid;
    padding: 0.75rem 1.25rem;
    border-color: ${({ theme, type }) => theme.colors[type as keyof typeof theme.colors]};
    background-color: ${({ theme, type }) => theme.colors[`analysis${type.charAt(0).toUpperCase() + type.slice(1)}Bg` as keyof typeof theme.colors]};
    border-radius: 0 8px 8px 0;
`;

const PRELabel = styled.div`
    font-weight: 700;
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
    color: ${({ theme }) => theme.colors.header};
`;

const PREText = styled.p`
    margin: 0;
`;

export default TipsPage;
