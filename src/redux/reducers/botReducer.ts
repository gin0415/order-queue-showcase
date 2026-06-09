import { createReducer } from '@reduxjs/toolkit';
import { botAction } from '../actions/botAction';
import { BOT_STATUS, BotStatus } from '../constants/botConstant';

export interface Bot {
    id: number;
    status: BotStatus;
    orderId: number | null;
}

export interface BotState {
    bots: Bot[];
    nextId: number;
}

const initialState: BotState = {
    bots: [],
    nextId: 1,
};

const botReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(botAction.addBot, (state) => {
            state.bots.push({
                id: state.nextId,
                status: BOT_STATUS.IDLE,
                orderId: null,
            });
            state.nextId += 1;
        })
        .addCase(botAction.removeBot, (state, action) => {
            const index = state.bots.findIndex((b) => b.id === action.payload.botId);
            if (index === -1) return;
            state.bots.splice(index, 1);
        })
        .addCase(botAction.setBotBusy, (state, action) => {
            const bot = state.bots.find((b) => b.id === action.payload.botId);
            if (!bot) return;
            bot.status = BOT_STATUS.BUSY;
            bot.orderId = action.payload.orderId;
        })
        .addCase(botAction.setBotIdle, (state, action) => {
            const bot = state.bots.find((b) => b.id === action.payload.botId);
            if (!bot) return;
            bot.status = BOT_STATUS.IDLE;
            bot.orderId = null;
        });
});

export default botReducer;
