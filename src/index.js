import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import { GigTax } from "./components/GigTax.js"
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <GigTax />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
