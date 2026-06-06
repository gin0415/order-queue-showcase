import { createReducer } from '@reduxjs/toolkit';
import { roleAction } from '../actions/roleAction';

export interface RoleState {
    role: string | null;
}

const initialState: RoleState = {
    role: null,
};

const roleReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(roleAction.setRole, (state, action) => {
            state.role = action.payload;
        });
});

export default roleReducer;
