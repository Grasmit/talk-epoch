import "./App.css"
import React from "react";
import { Route } from 'react-router-dom'

import Chat from "./pages/Chat";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Route path="/" component={Home} exact />
      <Route path="/chat" component={Chat} />

    </div>
  );
}

export default App;
