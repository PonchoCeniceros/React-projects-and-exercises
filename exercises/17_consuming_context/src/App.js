import React from 'react';
import {Content} from './Content';
import {ThemeContext} from './ThemeContext';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.toggleTheme = this.toggleTheme.bind(this);

    this.state = {theme: 'light'};
  }

  toggleTheme() {
    if (this.state.theme === 'light') {
      this.setState({theme: 'dark'});
    } else {
      this.setState({theme: 'light'});
    }
  }

  render() {
    return (
      <ThemeContext.Provider  value={this.state.theme}>
        <div>
          <button onClick={this.toggleTheme}>Toggle Theme</button>
          <Content />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"
          />
        </div>
      </ThemeContext.Provider>
    );
  }
}
