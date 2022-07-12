import React from 'react';
import { Link } from '../utils/react-router-dom';

const StreamDetails = () => {
    return (
        <div className="stream-details">
            <h3>StreamDetails</h3>
            <Link to={'/'} activeClassName="active">go to lists</Link>
        </div>
    );
};

export { StreamDetails };
