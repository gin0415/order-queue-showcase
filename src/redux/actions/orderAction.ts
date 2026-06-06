import { createAction } from '@reduxjs/toolkit';
import { OrderType } from '../constants/orderConstant';

export const orderAction = {
    createOrder: createAction<{ type: OrderType }>('order/createOrder'),
    assignOrder: createAction<{ orderId: number; botId: number }>('order/assignOrder'),
    completeOrder: createAction<{ orderId: number }>('order/completeOrder'),
    returnOrderToPending: createAction<{ orderId: number }>('order/returnOrderToPending'),
};
