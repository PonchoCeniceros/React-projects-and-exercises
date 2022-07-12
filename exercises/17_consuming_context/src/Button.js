import React from 'react';
import { ThemeContext } from './ThemeContext';

export class Button extends React.Component {
    render() {
        const theme = this.context;
        return (
            <button className={`ui button ${theme === 'light' ? '' : 'inverted'}`}>
                {this.props.children}
            </button>
        );
    }
}

Button.contextType = ThemeContext;

