import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import PackageList from "./PackageList";

import "../styles/App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Route p="/">
          <PackageList />
        </Route>
      </BrowserRouter>
    </div>
  );
};

export default App;
