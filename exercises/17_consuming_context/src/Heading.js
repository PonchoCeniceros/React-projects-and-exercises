import React from 'react';
import { ThemeContext } from './ThemeContext';

export class Heading extends React.Component {
    render() {
        const theme = this.context;
        return (
            <h4 className={`ui header ${theme === 'light' ? '' : 'inverted'}`}>
                {this.props.children}
            </h4>
        );
    }
}

Heading.contextType = ThemeContext;

