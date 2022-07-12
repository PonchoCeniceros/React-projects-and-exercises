import React from 'react';
import {SongList} from './SongList';

const App = () => {

  return (
    <div>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"
        />
        <SongList />
    </div>
  );
};

export default App;
