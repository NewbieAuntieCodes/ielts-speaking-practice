import React, { useState } from 'react';
import { styled } from 'styled-components';

interface ScoringPageProps {
    navigateTo: (page: 'home') => void;
}

// FIX: Self-closed SVG elements (<line>, <polyline>) to be valid JSX.
const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
);

// Icons for Notice Cards
// FIX: Self-closed SVG elements (<circle>, <line>) to be valid JSX.
const InfoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>;
// FIX: Self-closed SVG <circle> elements to be valid JSX.
const TargetIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>;
// FIX: Self-closed SVG <path> elements to be valid JSX.
const ScaleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 18a4 4 0 0 0-8 0" /><path d="M12 2v14" /><path d="M8 6a4 4 0 0 0-8 0" /><path d="M16 6a4 4 0 0 1 8 0" /></svg>;
// FIX: Self-closed SVG elements (<circle>, <polygon>) to be valid JSX.
const CompassIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>;


const scoringCriteriaData = [
  {
    band: '9',
    criteria: [
      {
        title: '流利性与连贯性',
        points: [
          '表达流利，极少出现重复或自我纠正的情况；出现犹豫是基于思考内容，而非寻找合适的词汇或语法',
          '表达连贯，衔接手段的使用完全恰当',
          '完全且恰当地展开话题',
        ],
      },
      {
        title: '词汇多样性',
        points: ['准确自如地使用词汇来谈论任何话题', '自然且准确地使用习语'],
      },
      {
        title: '语法多样性与准确性',
        points: [
          '自如得体地使用语法结构',
          '除了以英语为母语者也会出现的口误外，始终使用准确的语法结构',
        ],
      },
    ],
  },
  {
    band: '8',
    criteria: [
      {
        title: '发音',
        points: [
          '准确运用丰富多样的发音特点，能表达微妙差异',
          '表达过程中始终灵活地使用各种发音特点',
          '听者理解时毫无障碍',
        ],
      },
      {
        title: '流利性与连贯性',
        points: [
          '表达流利，偶尔出现重复或自我纠正的情况，出现犹豫通常是基于思考内容，在少数情况下是寻找合适的语言',
          '连贯且恰当地展开话题',
        ],
      },
      {
        title: '词汇多样性',
        points: [
          '词汇使用丰富，运用灵活自如，表达意思准确',
          '熟练地使用常见的词汇以及习语，偶尔欠准确',
          '按需进行有效的改述',
        ],
      },
      {
        title: '语法多样性与准确性',
        points: [
          '灵活地使用多种语法结构',
          '除极其偶然情况下出现的不当或非系统性的错误外，大部分语句均准确无误',
        ],
      },
      {
        title: '发音',
        points: [
          '使用多样的发音特点',
          '表达过程中灵活地使用多种发音特点，但偶尔出现偏差',
          '表达易于听者理解，母语的口音对听者的理解影响极小',
        ],
      },
    ],
  },
  {
    band: '7',
    criteria: [
      {
        title: '流利性与连贯性',
        points: [
          '表达详尽，并无明显困难，不失连贯',
          '有时出现与语言相关的犹豫或出现重复及/或自我纠正',
          '具有一定灵活度地使用一系列连接词或语篇标记',
        ],
      },
      {
        title: '词汇多样性',
        points: [
          '灵活地使用词汇讨论各种话题',
          '使用一些非常见的词汇及习语，对语体及词汇搭配有所认识，但有时词语选择不甚恰当',
          '有效地进行改述',
        ],
      },
      {
        title: '语法多样性与准确性',
        points: [
          '较灵活地使用一系列复杂的语法结构',
          '虽然反复出现一些语法错误，但语句通常无误',
        ],
      },
      {
        title: '发音',
        points: ['表现出 6 分水平中所有的积极表现，也表现出 8 分水平中的部分积极表现'],
      },
    ],
  },
  {
    band: '6',
    criteria: [
      {
        title: '流利性与连贯性',
        points: [
          '表现出充分交流的意愿，但有时由于偶尔的重复、自我纠正或犹豫而缺乏连贯性',
          '能使用一系列连接词及语篇标记，但无法保持一贯恰当',
        ],
      },
      {
        title: '词汇多样性',
        points: [
          '有足以详尽讨论各种话题的词汇量，虽然有时使用不当但意思表达清晰',
          '基本上能成功地进行改述',
        ],
      },
      {
        title: '语法多样性与准确性',
        points: [
          '结合使用简单复杂的句型，但灵活性有限',
          '使用复杂结构时经常出现错误，尽管这些错误极少造成理解困难',
        ],
      },
      {
        title: '发音',
        points: [
          '使用多种发音特点，但掌握程度不一',
          '展现出某些有效使用发音特点的能力，但不能持续表现这一能力',
          '表达过程中听者基本能理解，但有时部分单词或发音不准确导致清晰度下降',
        ],
      },
    ],
  },
];

const ScoringCriteriaComponent: React.FC = () => {
    type Band = '9' | '8' | '7' | '6';
    const [activeBand, setActiveBand] = useState<Band>('9');

    const currentData = scoringCriteriaData.find(d => d.band === activeBand);

    return (
        <TipsContentV2>
            <IntroSection>
                <h3>官方评分标准 (Official Band Descriptors)</h3>
                <p>了解雅思口语的四大评分标准至关重要。这能帮助你理解考官的期望，有针对性地进行练习，从而在考试中取得更好的成绩。点击下方分数，查看各级别对应的具体能力要求。</p>
            </IntroSection>
            
            <ExampleSelectorContainer>
                {(['9', '8', '7', '6'] as Band[]).map(band => (
                    <ExampleSelectorButton
                        key={band}
                        $active={activeBand === band}
                        onClick={() => setActiveBand(band)}
                    >
                        {`评分标准 ${band}分`}
                    </ExampleSelectorButton>
                ))}
            </ExampleSelectorContainer>

            {currentData && (
                <ScoringTableWrapper>
                    <ScoringTable>
                        {currentData.criteria.map((criterion, critIndex) => (
                            <React.Fragment key={`${criterion.title}-${critIndex}`}>
                                <CriteriaTitle>{criterion.title}</CriteriaTitle>
                                <CriteriaDetails>
                                    <ul>
                                        {criterion.points.map((point, index) => (
                                            <li key={index}>{point}</li>
                                        ))}
                                    </ul>
                                </CriteriaDetails>
                            </React.Fragment>
                        ))}
                    </ScoringTable>
                </ScoringTableWrapper>
            )}
        </TipsContentV2>
    );
};


const ScoringPage: React.FC<ScoringPageProps> = ({ navigateTo }) => {
    return (
        <PageContainer>
            <PageHeader>
                <BackButton onClick={() => navigateTo('home')} aria-label="返回主页">
                    <BackArrowIcon />
                    <span>返回主页</span>
                </BackButton>
                <h1>雅思口语评分标准和考试需知</h1>
            </PageHeader>
            <main>
                <ScoringCriteriaComponent />

                <SectionDivider>
                    <SectionDividerText>备考须知</SectionDividerText>
                </SectionDivider>

                <GeneralInfoContainer>
                    <NoticeCard accentColor="#4a90e2">
                        <NoticeCardHeader accentColor="#4a90e2">
                            <InfoIcon />
                            <h3>雅思口语的基本信息</h3>
                        </NoticeCardHeader>
                        <NoticeCardContent>
                            <ul>
                                <li>口语考试时间 <HighlightText>11 ~ 14 分钟</HighlightText>。一个口语考官来面试你，他会用录音笔记录你们之间的谈话。</li>
                                <li>考官会严格控制时间，所以如果他打断你的谈话，你也不要觉得奇怪。</li>
                                <li>口语分为三个部分：
                                    <SubList>
                                        <li><b>Part 1 自我介绍:</b> 大概 <HighlightText>10 个问题</HighlightText>, <HighlightText>4 ~ 5 分钟</HighlightText></li>
                                        <li><b>Part 2 话题卡:</b> <HighlightText>1 分钟</HighlightText>准备时间, <HighlightText>2 分钟</HighlightText>陈述时间</li>
                                        <li><b>Part 3 讨论:</b> 大概 <HighlightText>5 个问题</HighlightText>, <HighlightText>4 ~ 5 分钟</HighlightText></li>
                                    </SubList>
                                </li>
                            </ul>
                        </NoticeCardContent>
                    </NoticeCard>
                    <NoticeCard accentColor="#208e4c">
                        <NoticeCardHeader accentColor="#208e4c">
                            <TargetIcon />
                            <h3>不要使用大词、生僻词，要地道表达</h3>
                        </NoticeCardHeader>
                        <NoticeCardContent>
                             <p>口语得分高，不是一定要用很多高分词汇、俚语等， 但是这样做的结果往往<Keyword>适得其反</Keyword>，由于掌握词汇的能力还不达标，经常会出现<Keyword>词不达意</Keyword>或与语境不符的情况。建议用<HighlightText>地道表达</HighlightText>，可能会用一些很简短、很平常的短语，这些词你都认识， 但<HighlightText>言简意赅</HighlightText>，这便足矣。</p>
                        </NoticeCardContent>
                    </NoticeCard>
                    <NoticeCard accentColor="#f1c40f">
                        <NoticeCardHeader accentColor="#f1c40f">
                            <ScaleIcon />
                            <h3>哪一部分更重要？</h3>
                        </NoticeCardHeader>
                        <NoticeCardContent>
                            <p>口语的三个部分在评分时是<HighlightText>同样重要</HighlightText>。它们不是分开评分的，考官是根据学生的<Keyword>整体表现</Keyword>来打分的，从这个意义上说，三个部分一样重要。</p>
                            <ul>
                                <li><b>Part 1</b> 一般问题比较简单（有点像热身），所以如果你只有这部分答得很好的话，是拿不到高分的。</li>
                                <li><b>Part 2</b> 是考官评价你水平的重要部分，这时他对你的口语水平已经有一个整体的印象了。</li>
                                <li><b>Part 3</b> 是考官最后做评分决定的部分。如果你这部分表现得非常棒，绝对可以给自己加分。</li>
                            </ul>
                            <p>所以，总的来说, <HighlightText>Part 1 是你给自己预热的环节</HighlightText>, <HighlightText>Part 2 是考官考察你最重要的环节</HighlightText>, <HighlightText>Part 3 是你加分的环节</HighlightText>。</p>
                        </NoticeCardContent>
                    </NoticeCard>
                    <NoticeCard accentColor="#9b59b6">
                        <NoticeCardHeader accentColor="#9b59b6">
                            <CompassIcon />
                            <h3>口语三个部分的实战指导</h3>
                        </NoticeCardHeader>
                        <NoticeCardContent>
                             <ul>
                                <li>
                                    <b>Part 1:</b> <HighlightText>尽量简单</HighlightText>，在这个部分不要过于炫技。给出一个简短直接的答案，外加一句解释。因为如果你 keep talking,考官是会打断你的。不要害羞，Part 1就是一个热身赛，说出你脑子里那个一闪而过的想法即可。
                                </li>
                                <li>
                                    <b>Part 2:</b> 考前一定要<HighlightText>准备好口语大类素材</HighlightText>。专注于<Keyword>词汇</Keyword>，而不是语法或连接词。在拿到话题卡准备的1分钟内，尽量多地把你的想法写在纸上，一定要用准备好的素材，<Keyword>现编是绝对不行的</Keyword>。没有必要把话题卡上的每一个点都说到，可以把某一点说透。尽量用你的亲身经历举一些例子，这样也可以凑一些时间。
                                </li>
                                <li>
                                    <b>Part 3:</b> 在回答这一部分问题时，建议大家按照<HighlightText>给出答案、解释答案、举例的结构</HighlightText>来回答，平时练习时还可以加上另一种选择、对立面等。
                                </li>
                            </ul>
                        </NoticeCardContent>
                    </NoticeCard>
                </GeneralInfoContainer>
            </main>
        </PageContainer>
    );
};

// --- Styled Components ---
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

const ScoringTableWrapper = styled(GuideContainer)`
    padding: 0;
    overflow: hidden;
`;

const ScoringTable = styled.div`
    display: grid;
    grid-template-columns: 200px 1fr;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        grid-template-columns: 1fr;
    }
`;

const CriteriaTitle = styled.div`
    background-color: ${({ theme }) => theme.colors.boxBg};
    font-weight: 600;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    border-right: 1px solid ${({ theme }) => theme.colors.border};
    display: flex;
    align-items: center;

    &:last-of-type {
       border-bottom: none;
    }
    
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        border-right: none;
        padding: 0.75rem 1rem;
    }
`;

const CriteriaDetails = styled.div`
    padding: 1rem 1.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    
    &:last-of-type {
       border-bottom: none;
    }

    ul {
        margin: 0;
        padding-left: 1.25rem;
    }

    li {
        margin-bottom: 0.5rem;
        line-height: 1.7;
        &:last-child {
            margin-bottom: 0;
        }
    }
    
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
       padding: 1rem;
       border-left: 3px solid ${({ theme }) => theme.colors.primaryBlue};
       background-color: ${({ theme }) => theme.colors.bg};
    }
`;

const SectionDivider = styled.div`
    position: relative;
    text-align: center;
    margin: 4rem 0 2.5rem 0;
    
    &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 1px;
        background-color: ${({ theme }) => theme.colors.border};
        z-index: 1;
    }
`;

const SectionDividerText = styled.span`
    background-color: ${({ theme }) => theme.colors.bg};
    padding: 0 1.5rem;
    position: relative;
    z-index: 2;
    font-weight: 600;
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.label};
`;

const GeneralInfoContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
`;

const NoticeCard = styled.div<{ accentColor: string }>`
    background-color: ${({ theme }) => theme.colors.cardBg};
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
    border-top: 4px solid ${({ accentColor }) => accentColor};
    display: flex;
    flex-direction: column;

    h3 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 700;
        color: ${({ theme }) => theme.colors.header};
    }

    p, li {
        color: ${({ theme }) => theme.colors.text};
        line-height: 1.8;
    }
    
    ul {
        padding-left: 1.25rem;
        margin: 0;
        list-style-position: outside;
    }

    li {
        margin-bottom: 0.5rem;
        &:last-child {
            margin-bottom: 0;
        }
    }
`;

const NoticeCardHeader = styled.div<{ accentColor: string }>`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
    color: ${({ accentColor }) => accentColor};
`;

const NoticeCardContent = styled.div`
    flex-grow: 1;
`;

const HighlightText = styled.strong`
    color: ${({ theme }) => theme.colors.primaryOrange};
    font-weight: 600;
`;

const Keyword = styled.span`
    background-color: ${({ theme }) => theme.colors.highlightBg};
    color: ${({ theme }) => theme.colors.primaryBlue};
    padding: 0.1em 0.4em;
    border-radius: 4px;
    font-weight: 600;
    font-size: 0.95em;
`;

const SubList = styled.ul`
    margin-top: 0.75rem;
    padding-left: 1rem !important;
`;

export default ScoringPage;
