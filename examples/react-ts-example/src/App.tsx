import React from "react";
import "./App.css";
// Kütüphane import edilir.
import HelloLibrary from "react-ts-library";

function App() {
  return (
    <div className="App">
      <HelloLibrary
        text="Hello"
        rectColor="red"
        rectHeight={80}
        rectWidth={80}
      />
    </div>
  );
}

export default App;
