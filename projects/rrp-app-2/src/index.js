import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './app/app';
import { IpcContextProvider } from 'contexts/ipc';

const container = document.querySelector('#root');
const root = createRoot(container);
root.render(
    <IpcContextProvider>
        <App />
    </IpcContextProvider>
);

