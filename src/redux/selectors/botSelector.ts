import { createSelector } from '@reduxjs/toolkit';
import { BOT_STATUS } from '../constants/botConstant';
import { ORDER_TYPE } from '../constants/orderConstant';
import { RootState } from '../store';

const botStateSelector = (state: RootState) => state.bot;
const orderStateSelector = (state: RootState) => state.order;

export const botsSelector = createSelector(
    botStateSelector,
    (botState) => botState.bots,
);

export const idleBotsSelector = createSelector(
    botsSelector,
    (bots) => bots.filter((b) => b.status === BOT_STATUS.IDLE),
);

export const newestBotSelector = createSelector(
    botsSelector,
    (bots) => (bots.length > 0 ? bots[bots.length - 1] : null),
);

export const botToRemoveSelector = createSelector(
    botsSelector,
    orderStateSelector,
    (bots, orderState) => {
        if (bots.length === 0) return null;

        const orderById = new Map(orderState.orders.map((o) => [o.id, o]));

        let normalBot = null;
        let vipBot = null;

        for (let i = bots.length - 1; i >= 0; i--) {
            const bot = bots[i];
            if (bot.status === BOT_STATUS.IDLE) {
                return bot;
            }
            const order = bot.orderId !== null ? orderById.get(bot.orderId) : undefined;
            if (order?.type === ORDER_TYPE.NORMAL && !normalBot) {
                normalBot = bot;
            } else if (order?.type === ORDER_TYPE.VIP && !vipBot) {
                vipBot = bot;
            }
        }

        return normalBot ?? vipBot ?? bots[bots.length - 1];
    },
);
