import React, { useState } from 'react';
import { styled } from 'styled-components';
import { TopicData, CueCardData } from '../data';
import CardBox from './CardBox';

interface TopicContainerProps {
    initialTopics: TopicData[];
    onCardClick: (card: CueCardData) => void;
}

const TopicContainer: React.FC<TopicContainerProps> = ({ initialTopics, onCardClick }) => {
    const [topics, setTopics] = useState<TopicData[]>(initialTopics);
    const [nextTopicId, setNextTopicId] = useState(initialTopics.length);
    const [nextCardId, setNextCardId] = useState(100); // Simple ID generator

    const handleCardMove = (cardId: string, fromTopicId: string, toTopicId: string, targetCardId: string | null = null, insertBefore = true) => {
        if (cardId === targetCardId) return;
    
        setTopics(prevTopics => {
            const newTopics = JSON.parse(JSON.stringify(prevTopics));
    
            const fromTopic = newTopics.find((t: TopicData) => t.id === fromTopicId);
            const toTopic = newTopics.find((t: TopicData) => t.id === toTopicId);
    
            if (!fromTopic || !toTopic) return prevTopics;
    
            const cardIndex = fromTopic.cards.findIndex((c: CueCardData) => c.id === cardId);
            if (cardIndex === -1) return prevTopics;
    
            const [movedCard] = fromTopic.cards.splice(cardIndex, 1);
    
            if (targetCardId) {
                let targetIndex = toTopic.cards.findIndex((c: CueCardData) => c.id === targetCardId);
                if (targetIndex !== -1) {
                    if (!insertBefore) {
                        targetIndex++;
                    }
                    toTopic.cards.splice(targetIndex, 0, movedCard);
                } else {
                    toTopic.cards.push(movedCard); // Fallback if target not found
                }
            } else {
                // If no target card (e.g., dropped on the box), add to the end.
                toTopic.cards.push(movedCard);
            }
    
            return newTopics;
        });
    };

    const handleTopicUpdate = (topicId: string, newTitle: string) => {
        setTopics(prevTopics => 
            prevTopics.map(topic => {
                if (topic.id === topicId) {
                    const { isNew, ...rest } = topic;
                    return { ...rest, title: newTitle };
                }
                return topic;
            })
        );
    };

    const handleAddTopic = () => {
        const newTopic: TopicData = {
            id: `box-topic-new-${nextTopicId}`,
            title: '新话题',
            cards: [],
            isNew: true,
        };
        setNextTopicId(nextTopicId + 1);
        setTopics(prevTopics => [...prevTopics, newTopic]);
    };

    const handleAddCard = (topicId: string) => {
        const newCard: CueCardData = {
            id: `card-new-${nextCardId}`,
            title: 'New Card',
            category: '事物题', // Default category
            categoryClass: 'object-card',
            status: 'New',
        };
        setNextCardId(nextCardId + 1);

        setTopics(prevTopics =>
            prevTopics.map(topic => {
                if (topic.id === topicId) {
                    return {
                        ...topic,
                        cards: [...topic.cards, newCard],
                    };
                }
                return topic;
            })
        );
    };

    return (
        <Container>
            {topics.map(topic => (
                <CardBox 
                    key={topic.id} 
                    topic={topic} 
                    onCardMove={handleCardMove}
                    onTopicUpdate={handleTopicUpdate}
                    onAddCard={handleAddCard}
                    onCardClick={onCardClick}
                />
            ))}
            <AddNewTopicBox>
                <AddTopicButton aria-label="添加新话题" onClick={handleAddTopic}>
                    {/* FIX: Self-closed SVG <line> elements to be valid JSX. */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                    <span>添加新话题</span>
                </AddTopicButton>
            </AddNewTopicBox>
        </Container>
    );
};

const Container = styled.main`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        gap: 1.5rem;
    }
`;

const AddNewTopicBox = styled.div`
    border: 2px dashed ${({ theme }) => theme.colors.border};
    border-radius: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 300px;
    transition: border-color 0.2s ease, background-color 0.2s ease;
    cursor: pointer;
    background-color: transparent;

    &:hover {
        border-color: ${({ theme }) => theme.colors.dragOverBorder};
        background-color: ${({ theme }) => theme.colors.boxBg};
    }
`;

const AddTopicButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    font-size: 1.1rem;
    font-weight: 600;
    font-family: inherit;
    color: ${({ theme }) => theme.colors.label};
    transition: color 0.2s ease;
    padding: 2rem;
    border-radius: 24px;
    width: 100%;
    height: 100%;

    ${AddNewTopicBox}:hover & {
        color: ${({ theme }) => theme.colors.header};
    }

    svg {
        width: 32px;
        height: 32px;
        transition: transform 0.2s ease;
    }

    ${AddNewTopicBox}:hover & svg {
        transform: scale(1.1);
    }
`;


export default TopicContainer;