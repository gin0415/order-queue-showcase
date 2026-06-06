import React from 'react';
import styled from 'styled-components';
import './App.css';
import RoleSection from './components/RoleSection';
import OrderControls from './components/OrderControls';
import PendingArea from './components/PendingArea';
import CompleteArea from './components/CompleteArea';
import BotPanel from './components/BotPanel';

const AppShell = styled.div`
    padding: 1rem 1.5rem 3rem;
    max-width: 72rem;
    margin: 0 auto;
    text-align: left;
`;

const AreasGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-top: 1.5rem;
    @media (max-width: 640px) {
        grid-template-columns: 1fr;
    }
`;

function App() {
    return (
        <AppShell className="App">
            <RoleSection />
            <OrderControls />
            <AreasGrid>
                <PendingArea />
                <CompleteArea />
            </AreasGrid>
            <BotPanel />
        </AppShell>
    );
}

export default App;
