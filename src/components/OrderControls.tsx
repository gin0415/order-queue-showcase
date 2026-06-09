import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { botAction } from '../redux/actions/botAction';
import { orderAction } from '../redux/actions/orderAction';
import { ORDER_TYPE } from '../redux/constants/orderConstant';
import { botsSelector, botToRemoveSelector } from '../redux/selectors/botSelector';
import { isManagerSelector, isUserSelector, isVipSelector } from '../redux/selectors/roleSelector';

const ControlsContainer = styled.section`
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 1.5rem;
`;

const ControlButton = styled.button`
    padding: 0.6rem 1.1rem;
    border-radius: 0.4rem;
    border: 1px solid var(--color-border);
    background-color: var(--color-primary);
    color: var(--color-surface);
    cursor: pointer;
    font-weight: 600;
    &:disabled {
        background-color: var(--color-muted);
        cursor: not-allowed;
    }
`;

function OrderControls() {
    const dispatch = useDispatch();
    const isUser = useSelector(isUserSelector);
    const isVip = useSelector(isVipSelector);
    const isManager = useSelector(isManagerSelector);
    const bots = useSelector(botsSelector);
    const botToRemove = useSelector(botToRemoveSelector);

    if (!isUser && !isVip && !isManager) return null;

    return (
        <ControlsContainer aria-label="order-controls">
            {isUser && (
                <ControlButton
                    onClick={() => dispatch(orderAction.createOrder({ type: ORDER_TYPE.NORMAL }))}
                >
                    New Normal Order
                </ControlButton>
            )}
            {isVip && (
                <ControlButton
                    onClick={() => dispatch(orderAction.createOrder({ type: ORDER_TYPE.VIP }))}
                >
                    New VIP Order
                </ControlButton>
            )}
            {isManager && (
                <>
                    <ControlButton onClick={() => dispatch(botAction.addBot())}>
                        + Bot
                    </ControlButton>
                    <ControlButton
                        onClick={() => {
                            if (botToRemove) {
                                dispatch(botAction.removeBot({ botId: botToRemove.id }));
                            }
                        }}
                        disabled={bots.length === 0}
                    >
                        - Bot
                    </ControlButton>
                </>
            )}
        </ControlsContainer>
    );
}

export default React.memo(OrderControls);
