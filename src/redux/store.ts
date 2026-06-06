import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/reducer';
import { botScheduler } from './middleware/botScheduler';

export { type RootState } from './reducers/reducer';

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(botScheduler),
});

export type AppDispatch = typeof store.dispatch;
