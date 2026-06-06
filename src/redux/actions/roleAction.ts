import { createAction } from '@reduxjs/toolkit';

export const roleAction = {
    setRole: createAction<string>('role/setRole'),
}