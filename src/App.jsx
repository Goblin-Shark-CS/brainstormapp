import React from "react";
import NavComponent from "./components/Nav.jsx";
import EntriesComponent from "./components/Entries.jsx";
import DetailsComponent from "./components/Details.jsx";

function App() {
  return (
    <div id="app">
      <div id="nav">
        <NavComponent />
      </div>
      <div id="main">
        <div id="entries">
          <EntriesComponent />
        </div>
        <div id="details">
          <DetailsComponent />
        </div>
      </div>
    </div>
  );
}

export default App;
