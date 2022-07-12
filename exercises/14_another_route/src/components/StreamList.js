import React from 'react';
import { Link } from '../utils/react-router-dom';

const StreamList = () => {
    return (
        <div className="stream-list">
            <h3>StreamList</h3>
            <Link to={'/streams/details'} activeClassName="active">got to details</Link>
        </div>
    );
};

export { StreamList };
