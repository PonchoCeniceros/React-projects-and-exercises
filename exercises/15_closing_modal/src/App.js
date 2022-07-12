import React from 'react';
import {useState} from 'react';
import {Modal} from './Modal';

const App = props => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(!open)}>Open Modal</button>
      {open && (
        <Modal
          open={open}
          onDismiss={() => setOpen(false)}
          title="Modal Title"
          content="Modal Body"
          actions={<div className="ui button">Button</div>}
        />
      )}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"
      />
      <div id="modal" />
    </div>
  );
};

document.body.append(document.createElement('section'));

export default App;
