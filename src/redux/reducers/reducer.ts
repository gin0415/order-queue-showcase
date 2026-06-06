import { combineReducers } from '@reduxjs/toolkit';
import roleReducer from './roleReducer';
import orderReducer from './orderReducer';
import botReducer from './botReducer';

const rootReducer = combineReducers({
    role: roleReducer,
    order: orderReducer,
    bot: botReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
