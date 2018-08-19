import React from 'react';
import { render } from "react-dom";
import ReactTimePicki from "../lib";

const App = () => (
  <div style={{ width: 640, margin: "15px auto" }}>
    <h1>Hello ReactTimePicki</h1>
    <ReactTimePicki timeFormat="12" />
  </div>
);

export default App;
