import React from 'react';
import {StreamList} from './StreamList';

const streams = [
  {
    title: 'My Stream',
    description: 'This is a great stream.',
    id: 1,
    userId: 20,
  },
  {
    title: 'Other Stream',
    description: "Here's some stream",
    id: 2,
    userId: 5,
  },
  {
    title: 'Me Streaming Component Reuse!',
    description: 'This stream is about refactoring!!!',
    id: 4,
    userId: 5,
  },
  {
    title: 'An Interactive Stream',
    description: 'Lets stream together',
    id: 4,
    userId: 32,
  },
];

const App = () => {
  return (
    <div>
      <StreamList streams={streams} fetchStreams={() => {}} currentUserId={5} />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"
      />
    </div>
  );
};

export default App;
