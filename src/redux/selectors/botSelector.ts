import { createSelector } from '@reduxjs/toolkit';
import { BOT_STATUS } from '../constants/botConstant';
import { RootState } from '../store';

const botStateSelector = (state: RootState) => state.bot;

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
