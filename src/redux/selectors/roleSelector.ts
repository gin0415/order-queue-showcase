import { createSelector } from "@reduxjs/toolkit";
import { ROLE_CONSTANTS } from "../constants/roleConstant";
import { RootState } from "../store";

const roleStateSelector = (state: RootState) => state.role;

export const isManagerSelector = createSelector(
    roleStateSelector,
    (roleState) => roleState.role === ROLE_CONSTANTS.MANAGER,
);

export const isUserSelector = createSelector(
    roleStateSelector,
    (roleState) => roleState.role === ROLE_CONSTANTS.USER,
);

export const isVipSelector = createSelector(
    roleStateSelector,
    (roleState) => roleState.role === ROLE_CONSTANTS.VIP,
);

export const roleSelector = createSelector(
    roleStateSelector,
    (roleState) => roleState.role,
);