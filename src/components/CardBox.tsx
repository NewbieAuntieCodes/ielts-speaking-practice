import React, { useState, useRef, useEffect } from 'react';
import { styled } from 'styled-components';
import { TopicData, CueCardData } from '../data';
import CueCard from './CueCard';

interface CardBoxProps {
    topic: TopicData;
    onCardDrop: (cardId: string, fromTopicId: string, toTopicId: string) => void;
    onTopicUpdate: (topicId: string, newTitle: string) => void;
    onAddCard: (topicId: string) => void;
    onCardClick: (card: CueCardData) => void;
}

const AddIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;
const SaveIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;

const CardBox: React.FC<CardBoxProps> = ({ topic, onCardDrop, onTopicUpdate, onAddCard, onCardClick }) => {
    const [isEditing, setIsEditing] = useState(!!topic.isNew);
    const [editValue, setEditValue] = useState(topic.title.replace(/^话题: /, ''));
    const [dragOver, setDragOver] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus();
            inputRef.current?.select();
        }
    }, [isEditing]);
    
    useEffect(() => {
        setEditValue(topic.title.replace(/^话题: /, ''));
    }, [topic.title]);

    const handleSave = () => {
        const newTitle = editValue.trim();
        if (newTitle) {
            onTopicUpdate(topic.id, `话题: ${newTitle}`);
        } else {
             setEditValue(topic.title.replace(/^话题: /, '')); // Revert if empty
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSave();
        if (e.key === 'Escape') {
            setEditValue(topic.title.replace(/^话题: /, ''));
            setIsEditing(false);
        }
    };
    
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);
        const cardId = e.dataTransfer.getData('cardId');
        const fromTopicId = e.dataTransfer.getData('fromTopicId');
        onCardDrop(cardId, fromTopicId, topic.id);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = () => {
        setDragOver(false);
    };

    const handleAddNewCard = () => {
        onAddCard(topic.id);
    };

    const renderHeader = () => {
        if (isEditing) {
            return (
                <>
                    <TopicInput 
                        ref={inputRef}
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={handleSave}
                        onKeyDown={handleKeyDown}
                    />
                    <IconButton aria-label="保存话题名称" onClick={handleSave}>
                        <SaveIcon />
                    </IconButton>
                </>
            );
        }
        return (
            <>
                <h2>{topic.title}</h2>
                <TopicActions>
                    <IconButton aria-label="添加新卡片" onClick={handleAddNewCard}>
                        <AddIcon />
                    </IconButton>
                    <IconButton aria-label="编辑话题名称" onClick={() => setIsEditing(true)}>
                        <EditIcon />
                    </IconButton>
                </TopicActions>
            </>
        );
    }

    return (
        <CardBoxWrapper 
            id={topic.id} 
            isDragOver={dragOver}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >
            <CardBoxHeader>{renderHeader()}</CardBoxHeader>
            <CardBoxContent>
                {topic.cards.map(card => (
                    <CueCard 
                        key={card.id} 
                        card={card} 
                        fromTopicId={topic.id}
                        onCardClick={onCardClick} 
                    />
                ))}
            </CardBoxContent>
        </CardBoxWrapper>
    );
};

const CardBoxWrapper = styled.div<{ isDragOver?: boolean }>`
    background-color: ${({ theme }) => theme.colors.boxBg};
    border-radius: 24px;
    padding: 1rem 1.5rem;
    display: flex;
    flex-direction: column;
    min-height: 300px;
    border: 2px dashed transparent;
    transition: border-color 0.2s ease-in-out, opacity 0.2s ease, background-color 0.2s ease;

    ${({ isDragOver, theme }) => isDragOver && `
        border-color: ${theme.colors.dragOverBorder};
    `}
    
    &.dragging-box {
        opacity: 0.4;
        border-style: dashed;
        border-color: ${({ theme }) => theme.colors.dragOverBorder};
        background-color: ${({ theme }) => theme.colors.cardBg};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 1rem;
    }
`;

const CardBoxHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
    gap: 0.5rem;

    h2 {
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0;
        color: ${({ theme }) => theme.colors.header};
        flex-grow: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

const TopicActions = styled.div`
    display: flex;
    align-items: center;
    gap: 0.25rem;
`;

const IconButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.label};
    transition: background-color 0.2s ease, color 0.2s ease;

    &:hover {
        background-color: rgba(0, 0, 0, 0.08);
        color: ${({ theme }) => theme.colors.header};
    }

    svg {
        width: 18px;
        height: 18px;
    }
`;

const TopicInput = styled.input`
    font-family: inherit;
    font-size: 1.25rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.header};
    background-color: ${({ theme }) => theme.colors.cardBg};
    border: 1px solid ${({ theme }) => theme.colors.dragOverBorder};
    border-radius: 6px;
    padding: 0.25rem 0.5rem;
    margin: 0;
    flex-grow: 1;
    min-width: 0;

    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
    }
`;

const CardBoxContent = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export default CardBox;
