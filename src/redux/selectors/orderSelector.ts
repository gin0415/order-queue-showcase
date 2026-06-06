import { createSelector } from '@reduxjs/toolkit';
import { ORDER_STATUS } from '../constants/orderConstant';
import { RootState } from '../store';

const orderStateSelector = (state: RootState) => state.order;

export const ordersSelector = createSelector(
    orderStateSelector,
    (orderState) => orderState.orders,
);

export const pendingOrdersSelector = createSelector(
    ordersSelector,
    (orders) => orders.filter(
        (o) => o.status === ORDER_STATUS.PENDING || o.status === ORDER_STATUS.PROCESSING,
    ),
);

export const completedOrdersSelector = createSelector(
    ordersSelector,
    (orders) => orders.filter((o) => o.status === ORDER_STATUS.COMPLETE),
);

export const firstPendingOrderSelector = createSelector(
    ordersSelector,
    (orders) => orders.find((o) => o.status === ORDER_STATUS.PENDING) ?? null,
);
