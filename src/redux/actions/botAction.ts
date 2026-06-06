import { createAction } from '@reduxjs/toolkit';

export const botAction = {
    addBot: createAction('bot/addBot'),
    removeBot: createAction('bot/removeBot'),
    setBotBusy: createAction<{ botId: number; orderId: number }>('bot/setBotBusy'),
    setBotIdle: createAction<{ botId: number }>('bot/setBotIdle'),
};
