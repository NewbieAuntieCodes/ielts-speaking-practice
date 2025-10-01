import React from 'react';
import { styled, css } from 'styled-components';
import { CueCardData } from '../data';

interface CueCardProps {
    card: CueCardData;
    fromTopicId: string;
    onCardClick: (card: CueCardData) => void;
}

const CueCard: React.FC<CueCardProps> = ({ card, fromTopicId, onCardClick }) => {
    
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.stopPropagation(); // Prevent card click from firing
        e.dataTransfer.setData('cardId', card.id);
        e.dataTransfer.setData('fromTopicId', fromTopicId);
        // Use a timeout to allow the browser to render the drag image before applying the class
        setTimeout(() => {
            (e.target as HTMLDivElement).classList.add('dragging');
        }, 0);
    };

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        e.stopPropagation();
        (e.target as HTMLDivElement).classList.remove('dragging');
    };

    const handleClick = () => {
        // A card is considered "clickable" if it contains questions to display.
        // For Part 1, we check for a non-empty `part1Questions` array.
        // For Part 2/3, we check for the existence of `part2Title`.
        // This prevents placeholder cards without content from opening an empty modal.
        if ((card.part1Questions && card.part1Questions.length > 0) || card.part2Title) {
            onCardClick(card);
        }
    };

    return (
        <CueCardWrapper
            categoryClass={card.categoryClass}
            draggable="true"
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick()}
        >
            {card.status === 'New' && <CardStatus>New</CardStatus>}
            <CardCategory categoryClass={card.categoryClass}>{card.category}</CardCategory>
            <h3>{card.title}</h3>
        </CueCardWrapper>
    );
};

const categoryStyles = css<{ categoryClass: string }>`
    ${({ categoryClass, theme }) => {
        switch (categoryClass) {
            case 'person-card':
                return css`
                    border-left-color: ${theme.colors.person};
                    ${CardCategory} {
                        background-color: ${theme.colors.personBg};
                        color: ${theme.colors.personText};
                    }
                `;
            case 'event-card':
                return css`
                    border-left-color: ${theme.colors.event};
                    ${CardCategory} {
                        background-color: ${theme.colors.eventBg};
                        color: ${theme.colors.event};
                    }
                `;
            case 'place-card':
                return css`
                    border-left-color: ${theme.colors.place};
                    ${CardCategory} {
                        background-color: ${theme.colors.placeBg};
                        color: ${theme.colors.placeText};
                    }
                `;
            case 'object-card':
                return css`
                    border-left-color: ${theme.colors.object};
                    ${CardCategory} {
                        background-color: ${theme.colors.objectBg};
                        color: ${theme.colors.object};
                    }
                `;
            default:
                return '';
        }
    }}
`;

const CardCategory = styled.div<{ categoryClass: string }>`
    font-size: 0.8rem;
    font-weight: 600;
    padding: 0.25em 0.8em;
    border-radius: 9999px;
    display: inline-block;
    white-space: nowrap;
`;

const CardStatus = styled.div`
    position: absolute;
    top: -10px;
    right: 12px;
    background-color: ${({ theme }) => theme.colors.newTag};
    color: white;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 0.2em 0.7em;
    border-radius: 9999px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CueCardWrapper = styled.div<{ categoryClass: string }>`
    background-color: ${({ theme }) => theme.colors.cardBg};
    border-radius: 12px;
    padding: 1.25rem;
    box-shadow: 0 4px 8px ${({ theme }) => theme.colors.shadow};
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    position: relative; /* Needed for status tag */
    border-left: 6px solid;

    ${categoryStyles}

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.12);
    }

    &.dragging {
        opacity: 0.5;
        cursor: grabbing;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        transform: scale(1.02);
    }

    h3 {
        margin: 0;
        font-size: 1rem;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.header};
        line-height: 1.4;
    }
`;

export default CueCard;