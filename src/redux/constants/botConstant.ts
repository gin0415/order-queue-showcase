export const BOT_STATUS = {
    IDLE: 'IDLE',
    BUSY: 'BUSY',
} as const;

export type BotStatus = typeof BOT_STATUS[keyof typeof BOT_STATUS];
