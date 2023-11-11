import React from "react";
import NavComponent from "./components/Nav.jsx";
import EntriesComponent from "./components/Entries.jsx";
import DetailsComponent from "./components/Details.jsx";
import Chatbox from "./components/Chatbox.jsx";

function App() {
  return (
    <div id="main">
      <div id="nav">
        <NavComponent />
      </div>
      <div id="entries">
        <EntriesComponent />
      </div>
      <div id="details">
        <DetailsComponent />
      </div>
      <Chatbox />
    </div>
  );
}

export default App;
