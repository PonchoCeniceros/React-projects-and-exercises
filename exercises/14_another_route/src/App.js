import React from 'react';
import { BrowserRouter, Route } from './utils/react-router-dom';
import { Header } from './components/Header';
import { StreamList } from './components/StreamList';
import { StreamDetails } from './components/StreamDetails';

const App = () => {
    return (
        <div className="ui container">
            <BrowserRouter>
                <div>
                    <Header />
                    <Route path="/" exact component={StreamList} />
                    <Route path="/streams/details" exact component={StreamDetails} />
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;