import React, { useState } from 'react';
import { styled, createGlobalStyle, ThemeProvider } from 'styled-components';
import HomePage from './pages/HomePage';
import QuestionBankPage from './pages/QuestionBankPage';
import TipsPage from './pages/TipsPage';
import { Page } from './types';

// FIX: Add styled-components theme type definition to fix errors like "Property 'colors' does not exist on type 'DefaultTheme'".
import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            bg: string;
            cardBg: string;
            boxBg: string;
            text: string;
            header: string;
            border: string;
            shadow: string;
            dragOverBorder: string;
            label: string;
            primaryBlue: string;
            primaryOrange: string;
            highlightBg: string;
            highlightBorder: string;
    
            person: string;
            event: string;
            place: string;
            object: string;
            newTag: string;
    
            personBg: string;
            eventBg: string;
            placeBg: string;
            objectBg: string;
            
            personText: string;
            placeText: string;
    
            what: string;
            where: string;
            when: string;
            why: string;
            whyNot: string;
            how: string;
        };
        fonts: {
            body: string;
        };
        breakpoints: {
            mobile: string;
        }
    }
}


const theme = {
    colors: {
        bg: '#f4f7f9',
        cardBg: '#ffffff',
        boxBg: '#e9eef2',
        text: '#333',
        header: '#1a2533',
        border: '#d1d9e0',
        shadow: 'rgba(0, 0, 0, 0.08)',
        dragOverBorder: '#3498db',
        label: '#8899a6',
        primaryBlue: '#4a90e2',
        primaryOrange: '#ff9f43',
        highlightBg: '#e9f2ff',
        highlightBorder: '#c7dfff',

        person: '#f1c40f',
        event: '#1d93e2',
        place: '#2ecc71',
        object: '#9b59b6',
        newTag: '#ff4322',

        personBg: 'rgba(241, 196, 15, 0.15)',
        eventBg: 'rgba(29, 147, 226, 0.15)',
        placeBg: 'rgba(46, 204, 113, 0.15)',
        objectBg: 'rgba(155, 89, 182, 0.15)',
        
        personText: '#b49100',
        placeText: '#208e4c',

        what: '#3498db',
        where: '#2ecc71',
        when: '#f39c12',
        why: '#9b59b6',
        whyNot: '#e74c3c',
        how: '#e67e22',
    },
    fonts: {
        body: "'Inter', sans-serif",
    },
    breakpoints: {
        mobile: '768px',
    }
};

const GlobalStyles = createGlobalStyle`
    body {
        background-color: ${({ theme }) => theme.colors.bg};
        color: ${({ theme }) => theme.colors.text};
        margin: 0;
        font-family: ${({ theme }) => theme.fonts.body};
        font-size: 16px;
        line-height: 1.6;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .hidden {
        display: none;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes slideIn {
        from { transform: translateY(-30px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes slideInMobile {
        from { transform: translateY(100%); }
        to { transform: translateY(0); }
    }
`;

const AppWrapper = styled.div`
    padding: 2rem;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 1rem;
    }
`;

const App: React.FC = () => {
    const [page, setPage] = useState<Page>('home');

    const navigateTo = (targetPage: Page) => {
        window.scrollTo(0, 0); // Scroll to top on page change
        setPage(targetPage);
    };

    const renderPage = () => {
        switch (page) {
            case 'bank':
                return <QuestionBankPage navigateTo={() => navigateTo('home')} />;
            case 'tips':
                return <TipsPage navigateTo={() => navigateTo('home')} />;
            case 'home':
            default:
                return <HomePage navigateTo={navigateTo} />;
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <AppWrapper>{renderPage()}</AppWrapper>
        </ThemeProvider>
    );
};

export default App;