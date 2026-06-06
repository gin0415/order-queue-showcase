
import { BOT_STATUS } from '../constants/botConstant';
import {
    botsSelector,
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
        }
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