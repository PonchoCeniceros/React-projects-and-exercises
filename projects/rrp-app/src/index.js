import React from 'react';
import { createRoot } from 'react-dom/client';
import Dashboard from 'pages/dashboard.page';

// localStorage.clear();
const container = document.querySelector('#root');
const root = createRoot(container);
root.render(<Dashboard />);

