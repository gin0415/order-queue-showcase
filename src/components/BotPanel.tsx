import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { BOT_STATUS } from '../redux/constants/botConstant';
import { botsSelector } from '../redux/selectors/botSelector';

const PanelContainer = styled.section`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    background-color: var(--color-surface);
    margin-top: 1.5rem;
`;

const PanelTitle = styled.h3`
    margin: 0 0 0.75rem 0;
    color: var(--color-text);
`;

const BotList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
`;

const BotCard = styled.li<{ busy: boolean }>`
    display: flex;
    flex-direction: column;
    padding: 0.5rem 0.8rem;
    border-radius: 0.4rem;
    border: 1px solid ${({ busy }) => (busy ? 'var(--color-primary)' : 'var(--color-border)')};
    background-color: ${({ busy }) =>
        busy ? 'rgba(41, 121, 255, 0.08)' : 'var(--color-surface)'};
    min-width: 9rem;
`;

const BotLabel = styled.span`
    font-weight: 600;
    color: var(--color-text);
`;

const BotStatusText = styled.span<{ busy: boolean }>`
    font-size: 0.8rem;
    color: ${({ busy }) => (busy ? 'var(--color-primary-dark)' : 'var(--color-muted)')};
`;

const EmptyState = styled.p`
    color: var(--color-muted);
    font-style: italic;
    margin: 0;
`;

function BotPanel() {
    const bots = useSelector(botsSelector);

    return (
        <PanelContainer aria-label="bot-panel">
            <PanelTitle>Bots ({bots.length})</PanelTitle>
            {bots.length === 0 ? (
                <EmptyState>No bots. Manager can add one with "+ Bot".</EmptyState>
            ) : (
                <BotList>
                    {bots.map((bot) => {
                        const busy = bot.status === BOT_STATUS.BUSY;
                        return (
                            <BotCard key={bot.id} busy={busy}>
                                <BotLabel>Bot #{bot.id}</BotLabel>
                                <BotStatusText busy={busy}>
                                    {busy ? `Processing Order #${bot.orderId}` : 'IDLE'}
                                </BotStatusText>
                            </BotCard>
                        );
                    })}
                </BotList>
            )}
        </PanelContainer>
    );
}

export default React.memo(BotPanel);
