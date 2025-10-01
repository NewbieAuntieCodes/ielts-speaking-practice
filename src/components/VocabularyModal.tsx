import React, { useState } from 'react';
import { styled, keyframes } from 'styled-components';

interface VocabularyModalProps {
    words: string[];
    onClose: () => void;
    onDelete: (word: string) => void;
    onClear: () => void;
}

const VocabularyModal: React.FC<VocabularyModalProps> = ({ words, onClose, onDelete, onClear }) => {
    const [copyStatus, setCopyStatus] = useState('');

    const handleCopy = (format: 'comma' | 'newline') => {
        if (words.length === 0) return;
        const textToCopy = format === 'comma' ? words.join(', ') : words.join('\n');
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopyStatus('已复制！');
            setTimeout(() => setCopyStatus(''), 2000);
        }, () => {
            setCopyStatus('复制失败');
            setTimeout(() => setCopyStatus(''), 2000);
        });
    };

    const handleContentClick = (e: React.MouseEvent) => e.stopPropagation();

    return (
        <ModalOverlay onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="vocab-modal-title">
            <ModalContainer onClick={handleContentClick}>
                <ModalHeader>
                    <h3 id="vocab-modal-title">我的单词本</h3>
                    <CloseButton onClick={onClose} aria-label="关闭">&times;</CloseButton>
                </ModalHeader>
                <ModalContent>
                    {words.length > 0 ? (
                        <TagContainer>
                            {words.map(word => (
                                <Tag key={word}>
                                    {word}
                                    <DeleteTagButton onClick={() => onDelete(word)} aria-label={`删除单词 ${word}`}>&times;</DeleteTagButton>
                                </Tag>
                            ))}
                        </TagContainer>
                    ) : (
                        <EmptyState>
                            <p>单词本是空的。</p>
                            <p>双击页面上的任意英文单词即可添加。</p>
                        </EmptyState>
                    )}
                </ModalContent>
                {words.length > 0 && (
                    <ModalFooter>
                        <CopyActions>
                            <CopyButton onClick={() => handleCopy('comma')}>复制 (逗号)</CopyButton>
                            <CopyButton onClick={() => handleCopy('newline')}>复制 (换行)</CopyButton>
                            {copyStatus && <CopyStatus>{copyStatus}</CopyStatus>}
                        </CopyActions>
                        <ClearButton onClick={onClear}>清空单词本</ClearButton>
                    </ModalFooter>
                )}
            </ModalContainer>
        </ModalOverlay>
    );
};

const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

const slideIn = keyframes`
    from { transform: translateY(30px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1002;
    animation: ${fadeIn} 0.3s ease;
`;

const ModalContainer = styled.div`
    background: ${({ theme }) => theme.colors.cardBg};
    border-radius: 16px;
    width: 90%;
    max-width: 500px;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    animation: ${slideIn} 0.3s ease-out;
`;

const ModalHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    flex-shrink: 0;

    h3 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.header};
    }
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 2rem;
    font-weight: 300;
    color: ${({ theme }) => theme.colors.label};
    cursor: pointer;
    line-height: 1;
    padding: 0;
    &:hover {
        color: ${({ theme }) => theme.colors.header};
    }
`;

const ModalContent = styled.div`
    padding: 1.5rem;
    overflow-y: auto;
    flex-grow: 1;
`;

const TagContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
`;

const Tag = styled.div`
    background-color: ${({ theme }) => theme.colors.highlightBg};
    color: ${({ theme }) => theme.colors.primaryBlue};
    border: 1px solid ${({ theme }) => theme.colors.highlightBorder};
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    animation: ${fadeIn} 0.2s ease;
`;

const DeleteTagButton = styled.button`
    background: ${({ theme }) => theme.colors.primaryBlue};
    color: white;
    border: none;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 0.9rem;
    line-height: 1;
    padding: 0 0 1px 0;
    transition: background-color 0.2s;
    flex-shrink: 0;

    &:hover {
        background-color: #3a7ac2;
    }
`;

const EmptyState = styled.div`
    text-align: center;
    color: ${({ theme }) => theme.colors.label};
    padding: 2rem 0;
    
    p {
        margin: 0.25rem 0;
    }
`;

const ModalFooter = styled.footer`
    padding: 1rem 1.5rem;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.bg};
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    flex-wrap: wrap;
    gap: 1rem;
    flex-shrink: 0;
`;

const CopyActions = styled.div`
    display: flex;
    gap: 0.75rem;
    align-items: center;
    flex-wrap: wrap;
`;

const CopyButton = styled.button`
    background: ${({ theme }) => theme.colors.boxBg};
    border: 1px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.header};
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: ${({ theme }) => theme.colors.border};
    }
`;

const CopyStatus = styled.span`
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.placeText};
    font-weight: 500;
`;

const ClearButton = styled.button`
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.newTag};
    font-weight: 500;
    cursor: pointer;
    font-size: 0.9rem;
    padding: 0.5rem;
    margin: -0.5rem;

    &:hover {
        text-decoration: underline;
    }
`;

export default VocabularyModal;