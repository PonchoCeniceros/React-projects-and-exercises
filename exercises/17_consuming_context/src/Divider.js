import React from 'react';
import { ThemeContext } from './ThemeContext';

export class Divider extends React.Component {
    render() {
        const theme = this.context;
        return (
            <div className={`ui divider ${theme === 'light' ? '' : 'inverted'}`}></div>
        );
    }
}

Divider.contextType = ThemeContext;

