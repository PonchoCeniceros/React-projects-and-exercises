import React from 'react';
import { ThemeContext } from './ThemeContext';

export class Placeholder extends React.Component {
    render() {
        const theme = this.context;
        return (
            <div className={`ui active placeholder ${theme === 'light' ? '' : 'inverted'}`}>
                <div className="image header">
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
                <div className="paragraph">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
            </div>
        );
    }
}

Placeholder.contextType = ThemeContext;

