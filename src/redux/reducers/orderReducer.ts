import { createReducer } from '@reduxjs/toolkit';
import { orderAction } from '../actions/orderAction';
import { ORDER_STATUS, ORDER_TYPE, OrderStatus, OrderType } from '../constants/orderConstant';

export interface Order {
    id: number;
    type: OrderType;
    status: OrderStatus;
    assignedBotId: number | null;
    startedAt: number | null;
}

export interface OrderState {
    orders: Order[];
    nextId: number;
}

const initialState: OrderState = {
    orders: [],
    nextId: 1,
};

const orderReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(orderAction.createOrder, (state, action) => {
            const newOrder: Order = {
                id: state.nextId,
                type: action.payload.type,
                status: ORDER_STATUS.PENDING,
                assignedBotId: null,
                startedAt: null,
            };
            state.nextId += 1;

            if (newOrder.type === ORDER_TYPE.NORMAL) {
                state.orders.push(newOrder);
                return;
            }

            let lastReservedIndex = -1;
            for (let i = 0; i < state.orders.length; i++) {
                const existing = state.orders[i];
                const isProcessing = existing.status === ORDER_STATUS.PROCESSING;
                const isPendingVip =
                    existing.status === ORDER_STATUS.PENDING && existing.type === ORDER_TYPE.VIP;
                if (isProcessing || isPendingVip) {
                    lastReservedIndex = i;
                }
            }
            state.orders.splice(lastReservedIndex + 1, 0, newOrder);
        })
        .addCase(orderAction.assignOrder, (state, action) => {
            const order = state.orders.find((o) => o.id === action.payload.orderId);
            if (!order) return;
            order.status = ORDER_STATUS.PROCESSING;
            order.assignedBotId = action.payload.botId;
            order.startedAt = Date.now();
        })
        .addCase(orderAction.completeOrder, (state, action) => {
            const order = state.orders.find((o) => o.id === action.payload.orderId);
            if (!order) return;
            order.status = ORDER_STATUS.COMPLETE;
            order.assignedBotId = null;
        })
        .addCase(orderAction.returnOrderToPending, (state, action) => {
            const order = state.orders.find((o) => o.id === action.payload.orderId);
            if (!order) return;
            order.status = ORDER_STATUS.PENDING;
            order.assignedBotId = null;
            order.startedAt = null;
        });
});

export default orderReducer;
