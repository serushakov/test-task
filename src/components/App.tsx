import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import PackageList from "./PackageList";
import PackageDetails from "./PackageDetails";

import "normalize.css";
import "../styles/App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact component={PackageList} />
        <Route path="/package/:packageName" component={PackageDetails} />
      </BrowserRouter>
    </div>
  );
};

export default App;
