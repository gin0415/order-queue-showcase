import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { roleAction } from '../redux/actions/roleAction';
import { ROLE_CONSTANTS } from '../redux/constants/roleConstant';
import { isManagerSelector, isUserSelector, isVipSelector } from '../redux/selectors/roleSelector';

const RoleSectionContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 2rem;
`;

const RoleSectionTitle = styled.h2`
    font-size: 2rem;
    font-weight: 600;
    color: var(--color-text);
`;

const RoleSectionButtons = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 1rem;
`;

const RoleSectionButton = styled.button<{ isSelected: boolean }>`
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    border: 1px solid var(--color-border);
    background-color: var(--color-surface);
    color: var(--color-text);
    cursor: pointer;
    ${({ isSelected }) => isSelected && css`
        background-color: var(--color-primary);
        color: var(--color-surface);
    `}
`;

function RoleSection() {
    const dispatch = useDispatch();

    const isManager = useSelector(isManagerSelector);
    const isUser = useSelector(isUserSelector);
    const isVip = useSelector(isVipSelector);

    const handleRoleSelect = (role: string) => {
        dispatch(roleAction.setRole(role));
    }
    return (
        <RoleSectionContainer about='role-selection' >
            <RoleSectionTitle>Select your role</RoleSectionTitle>
            <RoleSectionButtons>
                <RoleSectionButton onClick={() => handleRoleSelect(ROLE_CONSTANTS.MANAGER)} isSelected={isManager}>Manager</RoleSectionButton>
                <RoleSectionButton onClick={() => handleRoleSelect(ROLE_CONSTANTS.USER)} isSelected={isUser}>User</RoleSectionButton>
                <RoleSectionButton onClick={() => handleRoleSelect(ROLE_CONSTANTS.VIP)} isSelected={isVip}>VIP</RoleSectionButton>
            </RoleSectionButtons>
        </RoleSectionContainer>
    )
}

export default React.memo(RoleSection)