import React from 'react';
import {createRoot} from 'react-dom/client';
import Dashboard from './pages/dashboard/dashboard.page';
import IpcContextProvider from 'contexts/ipc.context';
import './index.css';

const container = document.querySelector('#root');
const root = createRoot(container);
root.render(    
    <IpcContextProvider>
        <Dashboard />
    </IpcContextProvider>
);

