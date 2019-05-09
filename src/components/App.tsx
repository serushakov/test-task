import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import "../styles/App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Route p="/">
          <div />
        </Route>
      </BrowserRouter>
    </div>
  );
};

export default App;
