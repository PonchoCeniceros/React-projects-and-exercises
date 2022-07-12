import React from 'react';

const SeasonDisplay = props => {
  const getSeason = (month, latitude) => {
    return month > 2 && month < 9
      ? latitude > 0
        ? 'summer'
        : 'winter'
      : latitude > 0
      ? 'winter'
      : 'summer';
  };

  const season = getSeason(new Date().getMonth(), props.latitude);
  const text =
    season === 'winter' ? 'burr, it is chilly' : 'lets hit the beach';
  const icon = season === 'winter' ? 'snowflake' : 'sun';
  return (
    <>
      <i className={ `${icon} icon`} />  
      <div>{text}</div>
      <i className={ `${icon} icon`} />  
    </>
  );
};

class SeasonApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      errorMessage: null,
    };
  }

  render() {
    return (
      <>
        {!this.state.errorMessage ? (
          <SeasonDisplay latitude={this.state.latitude} />
        ) : (
          <div>error: {this.state.errorMessage}</div>
        )}
      </>
    );
  }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => this.setState({latitude: position.coords.latitude}),
      error => this.setState({errorMessage: error.message}),
    );
    // console.log("my component was rended on the screen");
  }

  componentDidUpdate() {
    console.log('my component was just updated - it rerendered!');
  }

  componentWillUnmount() {}
}

export {SeasonDisplay, SeasonApp};

// export default SeasonDisplay;
