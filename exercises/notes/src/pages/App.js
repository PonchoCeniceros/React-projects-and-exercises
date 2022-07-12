
const App = () => {
  const buttonText = "Click me!"
  return (
      <div>
        <label htmlFor="name" className="label">Enter name</label>
        <input id="name" type="text"/>
        <button style={{ backgroundColor: "pink" }}>{buttonText}</button>
      </div>
  );
};

export default App;

