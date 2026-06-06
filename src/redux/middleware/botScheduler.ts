import { Middleware } from '@reduxjs/toolkit';
import { botAction } from '../actions/botAction';
import { orderAction } from '../actions/orderAction';
import { BOT_STATUS } from '../constants/botConstant';
import { ORDER_STATUS, PROCESS_DURATION_MS } from '../constants/orderConstant';
import type { RootState } from '../reducers/reducer';

const timers = new Map<number, ReturnType<typeof setTimeout>>();
let isReconciling = false;

export const botScheduler: Middleware<{}, RootState> = (store) => (next) => (action: any) => {
    if (botAction.removeBot.match(action)) {
        const prevState = store.getState();
        const bots = prevState.bot.bots;
        const newestBot = bots.length > 0 ? bots[bots.length - 1] : null;
        if (newestBot) {
            const timer = timers.get(newestBot.id);
            if (timer) {
                clearTimeout(timer);
                timers.delete(newestBot.id);
            }
            if (newestBot.orderId !== null) {
                store.dispatch(
                    orderAction.returnOrderToPending({ orderId: newestBot.orderId }),
                );
            }
        }
    }

    const result = next(action);

    if (isReconciling) return result;
    isReconciling = true; // basically a lock
    try {
        const state = store.getState();
        const idleBots = state.bot.bots.filter((b) => b.status === BOT_STATUS.IDLE);
        const pendingOrders = state.order.orders.filter(
            (o) => o.status === ORDER_STATUS.PENDING,
        );
        const matches = Math.min(idleBots.length, pendingOrders.length);
        for (let i = 0; i < matches; i++) {
            const bot = idleBots[i];
            const order = pendingOrders[i];
            store.dispatch(botAction.setBotBusy({ botId: bot.id, orderId: order.id }));
            store.dispatch(orderAction.assignOrder({ orderId: order.id, botId: bot.id }));
            const timer = setTimeout(() => {
                store.dispatch(orderAction.completeOrder({ orderId: order.id }));
                store.dispatch(botAction.setBotIdle({ botId: bot.id }));
                timers.delete(bot.id);
            }, PROCESS_DURATION_MS);
            timers.set(bot.id, timer);
        }
    } finally {
        isReconciling = false;
    }

    return result;
};
