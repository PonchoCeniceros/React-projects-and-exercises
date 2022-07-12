import React from 'react';
import { createRoot } from 'react-dom/client';
import { SeasonApp } from './pages/SeasonDisplay';

const container = document.querySelector('#root');
const root = createRoot(container);
root.render(<SeasonApp />);
