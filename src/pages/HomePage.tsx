import React from 'react';
import { styled } from 'styled-components';
import { Page } from '../types';

interface HomePageProps {
    navigateTo: (page: Page) => void;
}

const QuestionBankIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        <line x1="12" y1="8" x2="16" y2="8"></line>
        <line x1="8" y1="12" x2="16" y2="12"></line>
        <line x1="8" y1="16" x2="12" y2="16"></line>
    </svg>
);

const TipsIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13a6 6 0 0 1-6 6 6 6 0 0 1-6-6 6 6 0 0 1 6-6 6 6 0 0 1 6 6z"></path>
        <path d="M12 19v2"></path><path d="M12 3v2"></path>
        <path d="M5 12H3"></path><path d="M21 12h-2"></path>
        <path d="m18.36 18.36-.78-.78"></path>
        <path d="m6.42 6.42-.78-.78"></path>
        <path d="m18.36 5.64-.78.78"></path>
        <path d="m6.42 17.58-.78.78"></path>
    </svg>
);


const HomePage: React.FC<HomePageProps> = ({ navigateTo }) => {
    return (
        <HomeContainer>
            <HomeHeader>
                <h1>雅思口语全攻略</h1>
                <p>2025 年 9-12 月题库 &amp; 回答技巧</p>
            </HomeHeader>
            <NavCards>
                <NavCard onClick={() => navigateTo('tips')} role="button" tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigateTo('tips')}>
                    <NavCardIcon><TipsIcon /></NavCardIcon>
                    <h2>回答技巧</h2>
                    <p>掌握官方评分标准，全面提升流利度、词汇、语法和发音水平。</p>
                </NavCard>
                <NavCard onClick={() => navigateTo('bank')} role="button" tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigateTo('bank')}>
                    <NavCardIcon><QuestionBankIcon /></NavCardIcon>
                    <h2>口语题库</h2>
                    <p>覆盖 Part 1/2/3 最新题目，包含完整问题列表与高质量参考范文。</p>
                </NavCard>
            </NavCards>
        </HomeContainer>
    );
};

const HomeContainer = styled.div`
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
    animation: fadeIn 0.5s ease;
`;

const HomeHeader = styled.header`
    margin-bottom: 3rem;

    h1 {
        font-size: 3rem;
        font-weight: 700;
        color: ${({ theme }) => theme.colors.header};
        margin-bottom: 0.5rem;
    }

    p {
        font-size: 1.2rem;
        color: ${({ theme }) => theme.colors.label};
        margin-top: 0;
    }
`;

const NavCards = styled.main`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
`;

const NavCardIcon = styled.div`
    width: 48px;
    height: 48px;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.primaryBlue};
`;

const NavCard = styled.div`
    background-color: ${({ theme }) => theme.colors.cardBg};
    border-radius: 24px;
    padding: 2.5rem 2rem;
    text-align: left;
    box-shadow: 0 8px 16px ${({ theme }) => theme.colors.shadow};
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    border: 1px solid ${({ theme }) => theme.colors.border};
    display: flex;
    flex-direction: column;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 24px rgba(0,0,0,0.12);
    }

    h2 {
        font-size: 1.75rem;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.header};
        margin: 0 0 0.5rem 0;
    }

    p {
        font-size: 1rem;
        color: ${({ theme }) => theme.colors.label};
        line-height: 1.6;
        margin: 0;
        flex-grow: 1;
    }

    &:nth-child(1) ${NavCardIcon} {
        color: ${({ theme }) => theme.colors.primaryOrange};
    }
`;


export default HomePage;