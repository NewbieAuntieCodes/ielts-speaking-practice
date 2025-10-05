// FIX: The module augmentation was failing because TypeScript could not find the 'styled-components' module. Adding a side-effect import ensures the module's types are loaded before augmentation, resolving the error.
import 'styled-components';
import { createGlobalStyle } from 'styled-components';

export const theme = {
    colors: {
        bg: '#eef5f9',
        cardBg: '#ffffff',
        boxBg: '#e9eef2',
        cardYellowBg: '#fefbed',
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
        newTag: '#ff9f43',

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
        who: '#1abc9c',

        point: '#3498db',
        reason: '#e67e22',
        example: '#27ae60',

        analysisVocab: '#3498db',
        analysisPhrase: '#e67e22',
        analysisSentence: '#27ae60',
        analysisVocabBg: 'rgba(52, 152, 219, 0.1)',
        analysisPhraseBg: 'rgba(230, 126, 34, 0.1)',
        analysisSentenceBg: 'rgba(39, 174, 96, 0.1)',
    },
    fonts: {
        body: "'Noto Sans', sans-serif",
    },
    breakpoints: {
        mobile: '768px',
    }
};

type ThemeType = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}

export const GlobalStyles = createGlobalStyle`
    body {
        background-color: ${({ theme }) => theme.colors.bg};
        color: ${({ theme }) => theme.colors.text};
        margin: 0;
        font-family: ${({ theme }) => theme.fonts.body};
        font-size: 15px;
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
        from { transform: translateY(100%); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
`;