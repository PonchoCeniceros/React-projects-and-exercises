import React from 'react';
import { ThemeContext } from './ThemeContext';

export class Segment extends React.Component {
    render() {
        const theme = this.context;
        return (
            <div className={`ui segment ${theme === 'light' ? '' : 'inverted'}`}>
                {this.props.children}
            </div>
        );
    }
}

Segment.contextType = ThemeContext;

