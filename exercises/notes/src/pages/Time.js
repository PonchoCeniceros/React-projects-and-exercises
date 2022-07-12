
const getTime = () => {
  return (new Date()).toLocaleTimeString()
};


const Time = () => {
  return (
    <div>
      <div>Current Time:</div>
      <h3>{getTime()}</h3>
    </div>
  );
};

export default Time;
