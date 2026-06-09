
import { BOT_STATUS } from '../constants/botConstant';
import { ORDER_STATUS, ORDER_TYPE } from '../constants/orderConstant';
import {
    botsSelector,
    botToRemoveSelector,
    idleBotsSelector,
    newestBotSelector
} from '../selectors/botSelector';

describe('botSelector', () => {
    const baseState = {
        bot: {
            bots: [
                { id: 1, status: BOT_STATUS.IDLE, orderId: null },
                { id: 2, status: BOT_STATUS.BUSY, orderId: 100 },
                { id: 3, status: BOT_STATUS.IDLE, orderId: null }
            ]
        },
        order: { orders: [], nextId: 1 }
    };

    it('should select all bots', () => {
        const bots = botsSelector(baseState as any);
        expect(bots).toHaveLength(3);
        expect(bots[0].id).toBe(1);
        expect(bots[1].id).toBe(2);
        expect(bots[2].id).toBe(3);
    });

    it('should select only idle bots', () => {
        const idleBots = idleBotsSelector(baseState as any);
        expect(idleBots).toHaveLength(2);
        expect(idleBots.every(bot => bot.status === BOT_STATUS.IDLE)).toBe(true);
    });

    it('should select the newest bot (last in the list)', () => {
        const newestBot = newestBotSelector(baseState as any);
        expect(newestBot).not.toBeNull();
        expect(newestBot?.id).toBe(3);
    });

    it('should return null if there are no bots (newestBotSelector)', () => {
        const state = { bot: { bots: [] } };
        const newestBot = newestBotSelector(state as any);
        expect(newestBot).toBeNull();
    });
});

describe('botToRemoveSelector', () => {
    const buildState = (bots: any[], orders: any[] = []) => ({
        bot: { bots, nextId: bots.length + 1 },
        order: { orders, nextId: orders.length + 1 },
    });

    it('returns null when there are no bots', () => {
        expect(botToRemoveSelector(buildState([]) as any)).toBeNull();
    });

    it('prefers the newest idle bot over any busy bot', () => {
        const state = buildState(
            [
                { id: 1, status: BOT_STATUS.BUSY, orderId: 10 },
                { id: 2, status: BOT_STATUS.IDLE, orderId: null },
                { id: 3, status: BOT_STATUS.BUSY, orderId: 11 },
            ],
            [
                { id: 10, type: ORDER_TYPE.NORMAL, status: ORDER_STATUS.PROCESSING, assignedBotId: 1, startedAt: 0 },
                { id: 11, type: ORDER_TYPE.VIP, status: ORDER_STATUS.PROCESSING, assignedBotId: 3, startedAt: 0 },
            ],
        );
        expect(botToRemoveSelector(state as any)?.id).toBe(2);
    });

    it('removes a bot processing a normal order before one processing a VIP order', () => {
        const state = buildState(
            [
                { id: 1, status: BOT_STATUS.BUSY, orderId: 10 },
                { id: 2, status: BOT_STATUS.BUSY, orderId: 11 },
            ],
            [
                { id: 10, type: ORDER_TYPE.NORMAL, status: ORDER_STATUS.PROCESSING, assignedBotId: 1, startedAt: 0 },
                { id: 11, type: ORDER_TYPE.VIP, status: ORDER_STATUS.PROCESSING, assignedBotId: 2, startedAt: 0 },
            ],
        );
        expect(botToRemoveSelector(state as any)?.id).toBe(1);
    });

    it('picks the newest normal-order bot when several are processing normal orders', () => {
        const state = buildState(
            [
                { id: 1, status: BOT_STATUS.BUSY, orderId: 10 },
                { id: 2, status: BOT_STATUS.BUSY, orderId: 11 },
                { id: 3, status: BOT_STATUS.BUSY, orderId: 12 },
            ],
            [
                { id: 10, type: ORDER_TYPE.NORMAL, status: ORDER_STATUS.PROCESSING, assignedBotId: 1, startedAt: 0 },
                { id: 11, type: ORDER_TYPE.VIP, status: ORDER_STATUS.PROCESSING, assignedBotId: 2, startedAt: 0 },
                { id: 12, type: ORDER_TYPE.NORMAL, status: ORDER_STATUS.PROCESSING, assignedBotId: 3, startedAt: 0 },
            ],
        );
        expect(botToRemoveSelector(state as any)?.id).toBe(3);
    });

    it('falls back to the newest VIP-order bot when no idle or normal-order bots exist', () => {
        const state = buildState(
            [
                { id: 1, status: BOT_STATUS.BUSY, orderId: 10 },
                { id: 2, status: BOT_STATUS.BUSY, orderId: 11 },
            ],
            [
                { id: 10, type: ORDER_TYPE.VIP, status: ORDER_STATUS.PROCESSING, assignedBotId: 1, startedAt: 0 },
                { id: 11, type: ORDER_TYPE.VIP, status: ORDER_STATUS.PROCESSING, assignedBotId: 2, startedAt: 0 },
            ],
        );
        expect(botToRemoveSelector(state as any)?.id).toBe(2);
    });
});