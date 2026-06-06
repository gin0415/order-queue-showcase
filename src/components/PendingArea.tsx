import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ORDER_STATUS, ORDER_TYPE } from '../redux/constants/orderConstant';
import { pendingOrdersSelector } from '../redux/selectors/orderSelector';

const AreaContainer = styled.section`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    background-color: var(--color-surface);
    min-height: 16rem;
`;

const AreaTitle = styled.h3`
    margin: 0 0 0.75rem 0;
    color: var(--color-text);
`;

const OrderList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const OrderCard = styled.li<{ isVip: boolean; isProcessing: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.6rem 0.8rem;
    border-radius: 0.4rem;
    border: 1px solid ${({ isVip }) => (isVip ? 'var(--color-accent)' : 'var(--color-border)')};
    background-color: ${({ isProcessing }) =>
        isProcessing ? 'rgba(41, 121, 255, 0.08)' : 'var(--color-surface)'};
`;

const Badge = styled.span<{ isVip: boolean }>`
    font-size: 0.75rem;
    padding: 0.15rem 0.5rem;
    border-radius: 999px;
    color: var(--color-surface);
    background-color: ${({ isVip }) => (isVip ? 'var(--color-accent)' : 'var(--color-muted)')};
    margin-left: 0.5rem;
`;

const ProcessingTag = styled.span`
    font-size: 0.8rem;
    color: var(--color-primary-dark);
    font-weight: 600;
`;

const EmptyState = styled.p`
    color: var(--color-muted);
    font-style: italic;
    margin: 0;
`;

function PendingArea() {
    const orders = useSelector(pendingOrdersSelector);

    return (
        <AreaContainer aria-label="pending-area">
            <AreaTitle>PENDING ({orders.length})</AreaTitle>
            {orders.length === 0 ? (
                <EmptyState>No pending orders</EmptyState>
            ) : (
                <OrderList>
                    {orders.map((order) => {
                        const isVip = order.type === ORDER_TYPE.VIP;
                        const isProcessing = order.status === ORDER_STATUS.PROCESSING;
                        return (
                            <OrderCard
                                key={order.id}
                                isVip={isVip}
                                isProcessing={isProcessing}
                            >
                                <span>
                                    Order #{order.id}
                                    <Badge isVip={isVip}>{order.type}</Badge>
                                </span>
                                {isProcessing && (
                                    <ProcessingTag>
                                        Processing by Bot #{order.assignedBotId}
                                    </ProcessingTag>
                                )}
                            </OrderCard>
                        );
                    })}
                </OrderList>
            )}
        </AreaContainer>
    );
}

export default React.memo(PendingArea);
